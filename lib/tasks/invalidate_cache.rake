require 'aws-sdk-cloudfront'

desc "Invalidate CloudFront cache for versions endpoint"
task :invalidate_cache do |task|

  distribution      = ENV['DISTRIBUTION_ID']
  access_key_id     = ENV['AWS_ACCESS_KEY_ID']
  secret_access_key = ENV['AWS_SECRET_ACCESS_KEY']
  region            = ENV['AWS_REGION'].nil? ? 'eu-west-1' : ENV['AWS_REGION']
  path              = ENV['VERSIONS_PATH'].nil? ? '/mobile-app/versions' : ENV['VERSIONS_PATH']

  if access_key_id && secret_access_key
    credentials = Aws::Credentials.new(access_key_id, secret_access_key)
    cloudfront  = Aws::CloudFront::Client.new(credentials: credentials, region: region)
  else
    cloudfront = Aws::CloudFront::Client.new(region: region)
  end

  waiter = Aws::CloudFront::Waiters::InvalidationCompleted.new(client: cloudfront, delay: 10, max_attempts: 30)

  invalidation = cloudfront.create_invalidation({
    distribution_id: distribution,
    invalidation_batch: {
      paths: {
        quantity: 1,
        items: [path],
      },
      caller_reference: "#{Time.now.to_i}"
    }
  })

  waiter.wait(distribution_id: distribution, id: invalidation.invalidation.id)
end
