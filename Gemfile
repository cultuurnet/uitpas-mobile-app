source 'https://rubygems.org'

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
