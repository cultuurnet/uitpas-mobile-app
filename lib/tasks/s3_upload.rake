require 'aws-sdk-s3'

desc "Upload versions.json to S3"
task :s3_upload do |task|

  bucket            = ENV['BUCKET']
  access_key_id     = ENV['AWS_ACCESS_KEY_ID']
  secret_access_key = ENV['AWS_SECRET_ACCESS_KEY']
  region            = ENV['AWS_REGION'].nil? ? 'eu-west-1' : ENV['AWS_REGION']
  path              = ENV['VERSIONS_PATH'].nil? ? 'uitpas/mobile-app/versions' : ENV['VERSIONS_PATH']

  credentials = Aws::Credentials.new(access_key_id, secret_access_key)
  s3          = Aws::S3::Resource.new(credentials: credentials, region: region)
  object      = s3.bucket(bucket).object(path)

  object.upload_file('versions.json', acl: 'public-read', content_type: 'application/json')
end
