# ML Kit iOS simulator builds

Why this project carries a custom Expo config plugin and a 442-line shell
script to build the iOS app for the simulator, whether upgrading the barcode
scanner would remove them, and what a cleaner fix would look like.

- **Introduced by:** commit `8f27f05` — *"fix: support iOS simulator builds with ML Kit on Xcode 26+"*
- **Files added by that commit:**
  - `plugins/withMlkitSimulatorSupport.js`
  - `plugins/scripts/relabel-mlkit-arm64.sh`
  - registration in `app.config.ts`

> Note: this is **not** the most recent commit on `develop`. The tip at the time
> of writing (`31c0cd4`) is *"feat: hide region and welcome-gift UI for
> supra-local passholders"*, which is unrelated.

## Why the patch is needed

Three facts, two of which are outside this repository:

1. **The scanner depends on Google ML Kit.** `src/scan/camera/Camera.tsx` uses
   `react-native-vision-camera-barcode-scanner@5.2.3`, whose podspec
   (`VisionCameraBarcodeScanner.podspec`) declares:

   ```ruby
   s.dependency 'GoogleMLKit/BarcodeScanning', '9.0.0'
   ```

   That pulls in `MLKitCommon 14.0.0`, `MLKitVision 10.0.0`,
   `MLKitBarcodeScanning 8.0.0` and `MLImage 1.0.0-beta8` (see
   `ios/Podfile.lock`).

2. **Google's ML Kit pods exclude arm64 on the simulator.** The `GoogleMLKit`
   9.0.0 podspec sets, in both `pod_target_xcconfig` and
   `user_target_xcconfig`:

   ```
   "EXCLUDED_ARCHS[sdk=iphonesimulator*]": "arm64"
   ```

   Google does this because its precompiled frameworks do **not** ship an
   arm64-simulator slice. Historically this was harmless: on Apple Silicon you
   ran the simulator under Rosetta (x86_64), so dropping arm64 on the simulator
   still left a usable architecture.

3. **Xcode 26+ simulators are arm64-only.** Apple removed the x86_64/Rosetta
   simulator path for the current SDK. The arm64 exclusion now removes the only
   remaining architecture, so simulator builds fail ("unable to find a matching
   destination" / missing-symbol linker errors). This is stated in the comment
   in `app.config.ts`.

The patch therefore exists **only to make simulator builds link**. Device and
TestFlight builds were never affected.

## What the patch does

`plugins/withMlkitSimulatorSupport.js` and
`plugins/scripts/relabel-mlkit-arm64.sh` are two halves of one workaround:

- **The JS config plugin** (registered in `app.config.ts`) patches the Podfile
  (`post_install` and `post_integrate`) to:
  - strip `EXCLUDED_ARCHS[sdk=iphonesimulator*] = arm64` from the Pods project
    and from every generated `*.xcconfig`, and
  - add a build phase named *"Relabel ML Kit arm64 slices"*, then force it to
    the **front** of the phase list (CocoaPods otherwise prepends its
    manifest-check phase ahead of it).

- **The POSIX shell script** runs in that build phase. It takes the vendored
  arm64 **device** binaries inside `Pods/MLKit*/…` and rewrites the Mach-O
  `LC_BUILD_VERSION` platform field from `IOS` to `IOSSIMULATOR` in place (it
  cannot use `vtool`, which fails with "not enough space to hold load
  commands"). It keeps a pristine copy of each binary so the original slices can
  be restored for device builds.

This relabeling trick is the well-known **`arm64-to-sim`** approach. The script
is a bespoke reimplementation of it, extended with pristine/derived state
tracking so a single checkout can alternate between simulator and device builds.

## Would upgrading the package fix it?

**No.** Evidence:

- The project is on `5.2.3`; the latest published version is `5.2.4` — a single
  patch release. That is the entire upgrade available.
- The newest version **still** pins the same ML Kit:

  ```
  5.2.3:  s.dependency 'GoogleMLKit/BarcodeScanning', '9.0.0'
  5.2.4:  s.dependency 'GoogleMLKit/BarcodeScanning', '9.0.0'
  ```

  The only material difference between the two is the `s.source` git URL moving
  from `mrousavy/nitro` to `margelo/react-native-vision-camera`. The ML Kit
  dependency — the cause of the exclusion — is unchanged.
- There is no newer ML Kit to bump to anyway. `GoogleMLKit` `9.0.0` is the
  highest version published on CocoaPods trunk, and it is already the one in
  use. So even an override in the Podfile has nothing newer to point at.

In other words: newest scanner package → still ML Kit 9.0.0 → still no
arm64-simulator slice → still needs the exclusion stripped and the slices
relabeled. The plugin would survive the upgrade.

**When would upgrading work?** Only when two changes land together: Google
publishes an ML Kit release whose frameworks actually contain an
arm64-simulator slice, **and** the barcode-scanner package bumps its pinned
`GoogleMLKit` version to it. Neither exists today. Relevant upstream threads:

- `d-date/google-mlkit-swiftpm#112` — *Support arm64 iOS Simulator (Apple
  Silicon) slice in the published XCFrameworks*
- `googlesamples/mlkit#810` — *Support for Simulators on M1 Apple Silicon*

## A more proper fix (options)

The root cause is a Google packaging limitation that cannot be fixed cleanly
from the app side. Ranked from "most proper":

1. **Remove ML Kit from the iOS path.** VisionCamera's own code scanner used
   Apple's Vision framework (`VNDetectBarcodesRequest`) on iOS, which needs no
   ML Kit and builds on the simulator untouched. This repo is on the **v5 /
   Nitro** line, where the scanner was split into the separate ML-Kit-based
   package currently in use, so this is not a drop-in toggle. The proper move is
   to use a Vision-based scanner on iOS while keeping ML Kit on Android — the
   approach newer ecosystem forks of the face/OCR plugins have taken. This is
   the only route that actually deletes the problem. *Unverified:* whether a
   Vision-based barcode scanner compatible with vision-camera v5 exists.

2. **Use the maintained community tool instead of the homegrown script.**
   `bogo/arm64-to-sim` is the standard tool for this exact relabeling; Flutter's
   `google_mlkit_commons` wraps it plus the xcconfig stripping. The project
   script adds real state management (pristine vs. derived binaries) that the
   off-the-shelf tool does not, which is a reason for *a* custom script — but
   442 lines of hand-rolled Mach-O/ar parsing is a lot of surface to maintain
   across Xcode and ML Kit bumps.

3. **Don't build the simulator on iOS 26+** (use a device), or pin to an Xcode
   that still allows Rosetta simulators. Cheap, but hurts DX and CI.

4. **Wait for Google.** When arm64-simulator slices ship, delete the plugin.

## Maintenance notes

Signs this workaround is fighting the tooling, worth knowing before you touch it:

- The plugin has to **reorder build phases** in `post_integrate` to outmaneuver
  CocoaPods, which keeps prepending its manifest-check phase.
- It strips the simulator exclusion **twice** (in `post_install` and again in
  `post_integrate`), because CocoaPods writes aggregate-target xcconfigs after
  `post_install` runs.

Do not confuse this plugin with the iOS 27 SDK `UIScene` life cycle backport
that used to live in its sibling `plugins/withSceneLifecycle.js`. The Expo SDK
58 upgrade generates the scene life cycle itself, so that plugin is gone.
