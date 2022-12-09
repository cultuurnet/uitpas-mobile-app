require 'json'

desc "Create an artifact from the binaries."
task :build_artifact do |task|

  calver_version = ENV['PIPELINE_VERSION'].nil? ? Time.now.strftime("%Y.%m.%d.%H%M%S") : ENV['PIPELINE_VERSION']
  git_short_ref  = `git rev-parse --short HEAD`.strip
  version        = ENV['ARTIFACT_VERSION'].nil? ? "#{calver_version}+sha.#{git_short_ref}" : ENV['ARTIFACT_VERSION']
  artifact_name  = 'uitpas-mobile-application'
  vendor         = 'publiq VZW'
  maintainer     = 'Infra publiq <infra@publiq.be>'
  license        = 'Apache-2.0'
  description    = 'UiTPAS mobile application'
  source         = 'https://github.com/cultuurnet/uitpas-mobile-app'
  build_url      = ENV['JOB_DISPLAY_URL'].nil? ? "" : ENV['JOB_DISPLAY_URL']

  metadata = {
    'name'             => artifact_name,
    'version'          => version,
    'vendor'           => vendor,
    'maintainer'       => maintainer,
    'license'          => license,
    'description'      => description,
    'source'           => source,
    'pipeline-version' => calver_version,
    'git-ref'          => git_short_ref,
    'build-url'        => build_url
  }

  File.write('metadata.json', metadata.to_json)
  FileUtils.mkdir_p("pkg")

  system("fpm -t tar -n #{artifact_name}_#{version} -s dir -p pkg metadata.json versions.json Rakefile lib vendor Gemfile Gemfile.lock .bundle") or exit 1
  system("gzip pkg/#{artifact_name}_#{version}.tar") or exit 1
end
