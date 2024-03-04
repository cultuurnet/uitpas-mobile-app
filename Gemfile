source 'https://rubygems.org'

# You may use http://rbenv.org/ or https://rvm.io/ to install and use this version
ruby ">= 2.6.10"

# Cocoapods 1.15 introduced a bug which break the build. We will remove the upper
# bound in the template on Cocoapods with next React Native release.
gem 'cocoapods', '>= 1.13', '< 1.15'
gem 'activesupport', '>= 6.1.7.5', '< 7.1.0'

gem 'rake', '~> 13.0'

group :syntax do
  gem 'jsonlint'
  gem 'oj', '<= 3.3.4'
end

group :package do
  gem 'fpm', '= 1.14.1'
end

group :aws do
  gem 'aws-sdk-s3'
  gem 'aws-sdk-cloudfront'
end

group :develop do
  gem 'fastlane'
end

plugins_path = File.join(File.dirname(__FILE__), 'fastlane', 'Pluginfile')
eval_gemfile(plugins_path) if File.exist?(plugins_path)
