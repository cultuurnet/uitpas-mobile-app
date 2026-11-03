#!/bin/sh
# Relabel Google ML Kit's vendored arm64 static-framework slices for the iOS
# Simulator, and restore the pristine vendor binaries for device builds.
#
# ML Kit 9.0.0 stamps its arm64 slices as platform IOS and its podspecs set
# EXCLUDED_ARCHS[sdk=iphonesimulator*] = arm64. Xcode 26+ simulators are
# arm64-only, so the exclusion leaves no valid simulator destination. The
# post_install hook added by plugins/withMlkitSimulatorSupport.js removes the
# exclusion; this script changes the LC_BUILD_VERSION platform of the arm64
# object files to IOSSIMULATOR before the linker reads them.
#
# The script runs from an Xcode build phase with SRCROOT and PLATFORM_NAME set.
# It is POSIX sh (no bashisms) and safe to run on every build.

set -u

SRCROOT="${SRCROOT:-}"
PLATFORM_NAME="${PLATFORM_NAME:-}"

if [ -z "$SRCROOT" ]; then
  echo "error: [mlkit-arm64] SRCROOT is not set" >&2
  exit 1
fi

case "$PLATFORM_NAME" in
  iphonesimulator*)
    TARGET_PLATFORM=iossim
    ;;
  iphoneos*)
    TARGET_PLATFORM=ios
    ;;
  *)
    echo "note: [mlkit-arm64] unsupported PLATFORM_NAME='$PLATFORM_NAME'; nothing to do"
    exit 0
    ;;
esac

STATE_ROOT="$SRCROOT/.mlkit-arm64-state"
mkdir -p "$STATE_ROOT" || {
  echo "error: [mlkit-arm64] cannot create $STATE_ROOT" >&2
  exit 1
}

WORK=$(mktemp -d "${TMPDIR:-/tmp}/mlkit-arm64.XXXXXX") || {
  echo "error: [mlkit-arm64] cannot create a temporary directory" >&2
  exit 1
}
cleanup() {
  rm -rf "$WORK"
}
trap cleanup EXIT HUP INT TERM

PROCESSED="$WORK/processed"
: >"$PROCESSED" || exit 1

SDK_VERSION="${SDK_VERSION:-}"
if [ -z "$SDK_VERSION" ]; then
  SDK_VERSION=$(xcrun --sdk iphonesimulator --show-sdk-version 2>/dev/null || true)
fi
[ -n "$SDK_VERSION" ] || SDK_VERSION=16.4

MINOS="${IPHONEOS_DEPLOYMENT_TARGET:-}"
[ -n "$MINOS" ] || MINOS=15.5

sha256() {
  if command -v shasum >/dev/null 2>&1; then
    shasum -a 256 "$1" | awk '{print $1}'
  else
    openssl dgst -sha256 "$1" | awk '{print $NF}'
  fi
}

is_archive() {
  case "$(file -b "$1" 2>/dev/null)" in
    *"ar archive"*) return 0 ;;
    *) return 1 ;;
  esac
}

state_dir_for() {
  state_relative="${1#"$SRCROOT"/}"
  state_key=$(printf '%s' "$state_relative" | sed 's#[^A-Za-z0-9._-]#_#g')
  printf '%s/%s' "$STATE_ROOT" "$state_key"
}

# Copies the Mach-O object $1 to $2 with the LC_BUILD_VERSION platform changed
# to $3. Exit codes: 0 = patched (or already correct), 2 = no LC_BUILD_VERSION
# command, 1 = failure.
#
# vtool -set-build-version cannot grow these ML Kit objects (it fails with
# "not enough space to hold load commands"), so patch the platform field of the
# existing LC_BUILD_VERSION command in place. That keeps the original minos/sdk
# and changes nothing else in the object.
relabel_macho() {
  macho_input="$1"
  macho_output="$2"
  macho_platform="$3"

  perl - "$macho_input" "$macho_output" "$macho_platform" <<'PERL'
use strict;
use warnings;
use File::Copy qw(copy);

my ($input, $output, $platform_name) = @ARGV;
my %platforms = (ios => 2, iossim => 7);
my $target = $platforms{$platform_name};
die "unknown platform $platform_name\n" unless defined $target;

copy($input, $output) or die "copy $input to $output: $!\n";
open(my $fh, '+<', $output) or die "open $output: $!\n";
binmode($fh);

read($fh, my $header, 32) == 32 or die "short Mach-O header: $output\n";
my $magic = unpack('V', substr($header, 0, 4));
my $is_64 = $magic == 0xfeedfacf;
my $is_32 = $magic == 0xfeedface;
die "not a Mach-O file: $output\n" unless $is_64 || $is_32;

my $header_size = $is_64 ? 32 : 28;
my $ncmds = unpack('V', substr($header, 16, 4));
my $offset = $header_size;
my $found = 0;

for (my $i = 0; $i < $ncmds; $i++) {
  seek($fh, $offset, 0) or die "seek $output: $!\n";
  read($fh, my $command, 8) == 8 or die "short load command: $output\n";
  my ($command_id, $command_size) = unpack('VV', $command);
  die "invalid load command size at $offset in $output\n" if $command_size < 8;

  if ($command_id == 0x32) { # LC_BUILD_VERSION
    seek($fh, $offset + 8, 0) or die "seek $output: $!\n";
    read($fh, my $current_platform, 4) == 4 or die "short platform command: $output\n";
    if (unpack('V', $current_platform) != $target) {
      seek($fh, $offset + 8, 0) or die "seek $output: $!\n";
      print $fh pack('V', $target) or die "write $output: $!\n";
    }
    $found = 1;
    last;
  }

  $offset += $command_size;
}

close($fh) or die "close $output: $!\n";
exit 2 unless $found;
exit 0;
PERL
  macho_rc=$?

  if [ "$macho_rc" -eq 0 ]; then
    return 0
  fi

  if [ "$macho_rc" -eq 2 ]; then
    # A Mach-O object without LC_BUILD_VERSION inherits the linker's target
    # platform. Add an explicit command when the linker can do so.
    if [ "$macho_platform" = iossim ]; then
      if ld -r -arch arm64 -platform_version ios-simulator "$MINOS" "$SDK_VERSION" \
        -o "$macho_output.relinked" "$macho_input" 2>"$WORK/relabel-ld.log"; then
        mv "$macho_output.relinked" "$macho_output" || return 1
        echo "  added iOS Simulator build version to $macho_input"
        return 0
      fi
      rm -f "$macho_output.relinked"
      echo "  note: $macho_input has no LC_BUILD_VERSION; leaving it to the linker"
      cat "$WORK/relabel-ld.log" >&2
      return 0
    fi

    echo "  note: $macho_input has no LC_BUILD_VERSION"
    return 0
  fi

  echo "error: [mlkit-arm64] could not relabel $macho_input" >&2
  return 1
}

relabel_archive() {
  archive_input="$1"
  archive_output="$2"
  archive_platform="$3"

  # Extract/re-archive with ar/libtool would lose duplicate member names:
  # MLKitCommon ships several members called escaping.o, globals.o, etc. Patch
  # the LC_BUILD_VERSION platform field inside each member instead, leaving the
  # archive layout and symbol table untouched.
  perl - "$archive_input" "$archive_output" "$archive_platform" <<'PERL'
use strict;
use warnings;

my ($input, $output, $platform_name) = @ARGV;
my %platforms = (ios => 2, iossim => 7);
my $target = $platforms{$platform_name};
die "unknown platform $platform_name\n" unless defined $target;

open(my $in, '<', $input) or die "open $input: $!\n";
binmode($in);
open(my $out, '>', $output) or die "open $output: $!\n";
binmode($out);

read($in, my $magic, 8) == 8 or die "short archive header: $input\n";
die "not an ar archive: $input\n" unless $magic eq "!<arch>\n";
print($out $magic) or die "write $output: $!\n";

my ($members, $patched, $without_build_version) = (0, 0, 0);

while (1) {
  my $header_read = read($in, my $header, 60);
  last if !defined($header_read) || $header_read == 0;
  die "truncated archive header: $input\n" if $header_read != 60;
  die "invalid archive header: $input\n" unless substr($header, 58, 2) eq "`\n";

  my $name = substr($header, 0, 16);
  $name =~ s/\s+$//;
  $name =~ s#/$##;

  my $size_field = substr($header, 48, 10);
  $size_field =~ s/\s+//g;
  die "invalid archive member size: $input\n" unless $size_field =~ /^\d+$/;
  my $size = int($size_field);

  my $data = '';
  while (length($data) < $size) {
    my $chunk;
    my $chunk_read = read($in, $chunk, $size - length($data));
    die "truncated archive member: $input\n" unless defined($chunk_read) && $chunk_read > 0;
    $data .= $chunk;
  }

  my $padding = '';
  read($in, $padding, 1) if $size % 2;

  if ($name !~ /^__\.SYMDEF/) {
    $members++;
    my $object_offset = 0;
    $object_offset = $1 if $name =~ /^#1\/(\d+)/;

    my $object = substr($data, $object_offset);
    my $object_magic = length($object) >= 4 ? unpack('V', substr($object, 0, 4)) : 0;
    if ($object_magic == 0xfeedfacf || $object_magic == 0xfeedface) {
      my $header_size = $object_magic == 0xfeedfacf ? 32 : 28;
      my $ncmds = unpack('V', substr($object, 16, 4));
      my $offset = $header_size;
      my $found = 0;

      for (my $i = 0; $i < $ncmds; $i++) {
        last if $offset + 8 > length($object);
        my ($command_id, $command_size) = unpack('VV', substr($object, $offset, 8));
        last if $command_size < 8 || $offset + $command_size > length($object);

        if ($command_id == 0x32) { # LC_BUILD_VERSION
          substr($object, $offset + 8, 4, pack('V', $target));
          $found = 1;
          last;
        }

        $offset += $command_size;
      }

      if ($found) {
        substr($data, $object_offset) = $object;
        $patched++;
      } else {
        $without_build_version++;
      }
    }
  }

  print($out $header, $data, $padding) or die "write $output: $!\n";
}

close($in) or die "close $input: $!\n";
close($out) or die "close $output: $!\n";

print STDERR "  relabelled $patched of $members Mach-O members in $input\n" if $patched;
print STDERR "  note: $without_build_version members in $input have no LC_BUILD_VERSION\n" if $without_build_version;
exit 0;
PERL
  return $?
}

relabel_binary() {
  binary_input="$1"
  binary_output="$2"

  if is_archive "$binary_input"; then
    relabel_archive "$binary_input" "$binary_output" iossim
  else
    relabel_macho "$binary_input" "$binary_output" iossim
  fi
}

process_binary() {
  target_binary="$1"

  if [ ! -f "$target_binary" ]; then
    echo "note: [mlkit-arm64] $target_binary not present; skipping"
    return 0
  fi

  if grep -Fxq "$target_binary" "$PROCESSED" 2>/dev/null; then
    return 0
  fi
  printf '%s\n' "$target_binary" >>"$PROCESSED" || return 1

  state=$(state_dir_for "$target_binary")
  pristine="$state.pristine"
  pristine_sha_file="$state.pristine.sha256"
  derived_sha_file="$state.derived.sha256"
  applied_platform_file="$state.platform"

  mkdir -p "$STATE_ROOT" || return 1

  pristine_sha=$(cat "$pristine_sha_file" 2>/dev/null || true)
  derived_sha=$(cat "$derived_sha_file" 2>/dev/null || true)
  applied_platform=$(cat "$applied_platform_file" 2>/dev/null || true)
  current_sha=$(sha256 "$target_binary") || return 1

  if [ ! -f "$pristine" ] || [ -z "$pristine_sha" ]; then
    cp "$target_binary" "$pristine" || return 1
    pristine_sha=$(sha256 "$pristine") || return 1
    derived_sha="$pristine_sha"
    applied_platform=ios
    printf '%s\n' "$pristine_sha" >"$pristine_sha_file" || return 1
    printf '%s\n' "$derived_sha" >"$derived_sha_file" || return 1
    printf '%s\n' "$applied_platform" >"$applied_platform_file" || return 1
    echo "note: [mlkit-arm64] stored pristine copy for $target_binary"
  elif [ "$current_sha" = "$pristine_sha" ]; then
    # CocoaPods re-extracted the vendor framework (or a device build already
    # restored it): the current file is pristine again.
    derived_sha="$pristine_sha"
    applied_platform=ios
    printf '%s\n' "$derived_sha" >"$derived_sha_file" || return 1
    printf '%s\n' "$applied_platform" >"$applied_platform_file" || return 1
  elif [ "$current_sha" != "$derived_sha" ]; then
    # The file matches neither the pristine nor the derived copy: a pod
    # install/update replaced it, so refresh the pristine copy.
    cp "$target_binary" "$pristine" || return 1
    pristine_sha=$(sha256 "$pristine") || return 1
    derived_sha="$pristine_sha"
    applied_platform=ios
    printf '%s\n' "$pristine_sha" >"$pristine_sha_file" || return 1
    printf '%s\n' "$derived_sha" >"$derived_sha_file" || return 1
    printf '%s\n' "$applied_platform" >"$applied_platform_file" || return 1
    echo "note: [mlkit-arm64] refreshed pristine copy for $target_binary"
  fi

  current_sha=$(sha256 "$target_binary") || return 1

  if [ "$TARGET_PLATFORM" = ios ]; then
    if [ "$current_sha" = "$pristine_sha" ]; then
      printf '%s\n' "$pristine_sha" >"$derived_sha_file" || return 1
      printf '%s\n' ios >"$applied_platform_file" || return 1
      echo "note: [mlkit-arm64] $target_binary is already pristine"
      return 0
    fi

    cp "$pristine" "$target_binary" || return 1
    printf '%s\n' "$pristine_sha" >"$derived_sha_file" || return 1
    printf '%s\n' ios >"$applied_platform_file" || return 1
    echo "restored pristine ML Kit binary for device build: $target_binary"
    return 0
  fi

  if [ "$applied_platform" = iossim ] && [ "$current_sha" = "$derived_sha" ]; then
    echo "note: [mlkit-arm64] $target_binary is already relabelled for the simulator"
    return 0
  fi

  pristine_archs=$(lipo -archs "$pristine" 2>/dev/null || true)
  case " $pristine_archs " in
    *" arm64 "*) ;;
    *)
      echo "note: [mlkit-arm64] $target_binary has no arm64 slice; skipping"
      return 0
      ;;
  esac

  if ! lipo -thin arm64 -output "$WORK/arm64" "$pristine" 2>"$WORK/relabel-lipo.log"; then
    echo "error: [mlkit-arm64] cannot extract the arm64 slice from $pristine" >&2
    cat "$WORK/relabel-lipo.log" >&2
    return 1
  fi

  if ! relabel_binary "$WORK/arm64" "$WORK/arm64.relabelled"; then
    return 1
  fi

  x86_64_slice=
  case " $(lipo -archs "$pristine" 2>/dev/null || true) " in
    *" x86_64 "*)
      if lipo -thin x86_64 -output "$WORK/x86_64" "$pristine" 2>/dev/null; then
        x86_64_slice="$WORK/x86_64"
      fi
      ;;
  esac

  if [ -n "$x86_64_slice" ]; then
    if ! lipo -create "$x86_64_slice" "$WORK/arm64.relabelled" -output "$WORK/final"; then
      echo "error: [mlkit-arm64] cannot create a fat binary for $target_binary" >&2
      return 1
    fi
  else
    cp "$WORK/arm64.relabelled" "$WORK/final" || return 1
  fi

  final_archs=$(lipo -archs "$WORK/final" 2>/dev/null || true)
  case " $final_archs " in
    *" arm64 "*) ;;
    *)
      echo "error: [mlkit-arm64] $WORK/final has no arm64 slice" >&2
      return 1
      ;;
  esac

  chmod 755 "$WORK/final" || return 1
  cp "$WORK/final" "$target_binary" || return 1

  new_sha=$(sha256 "$target_binary") || return 1
  printf '%s\n' "$new_sha" >"$derived_sha_file" || return 1
  printf '%s\n' iossim >"$applied_platform_file" || return 1
  echo "relabelled ML Kit arm64 slices for the simulator: $target_binary"
  return 0
}

for binary in \
  "$SRCROOT/Pods/MLImage/Frameworks/MLImage.framework/MLImage" \
  "$SRCROOT/Pods/MLKitCommon/Frameworks/MLKitCommon.framework/MLKitCommon" \
  "$SRCROOT/Pods/MLKitVision/Frameworks/MLKitVision.framework/MLKitVision" \
  "$SRCROOT/Pods/MLKitBarcodeScanning/Frameworks/MLKitBarcodeScanning.framework/MLKitBarcodeScanning"; do
  process_binary "$binary" || exit 1
done

for framework in "$SRCROOT"/Pods/MLKit*/Frameworks/*.framework; do
  [ -d "$framework" ] || continue
  name=${framework##*/}
  name=${name%.framework}
  process_binary "$framework/$name" || exit 1
done

echo "note: [mlkit-arm64] finished ($TARGET_PLATFORM)"
exit 0
