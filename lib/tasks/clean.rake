desc "Remove generated files."
task :clean do |task|
  FileUtils.rm_r("pkg", :force => true)
  FileUtils.rm_r("metadata.json", :force => true)
end

desc "Remove all non-repo files."
task :clobber => :clean do |task|
  FileUtils.rm_r("vendor", :force => true)
end
