module Fastlane
  module Actions
    class PrepareXcconfigAction < Action
      def self.run(params)
        # fastlane will take care of reading in the parameter and fetching the environment variable:
        UI.message "Update Xcconfig"
        scheme_name = params[:scheme_name]
        command = [
          'cp',
          "ios/Configuration/#{scheme_name}.xcconfig",
          'ios/Configuration/Release.xcconfig',
        ].join(' ')
         Actions.sh command
      end
       #####################################################
      # @!group Documentation
      #####################################################
       def self.description
        'Prepare Xconfig.'
      end
       def self.details
        'Prepare Xconfig.'
      end
       def self.available_options
        [
          FastlaneCore::ConfigItem.new(
            key: :scheme_name,
            env_name: 'FL_PREPARE_XCCONFIG_SCHEME_NAME',
            description: 'Define the scheme name',
            is_string: true,
            optional: true,
            default_value: 'Alpha'
          )
        ]
      end
       def self.output
        []
      end
       def self.return_value
      end
       def self.authors
        ["dgyesbreghs"]
      end
       def self.is_supported?(platform)
        platform == :ios
      end
    end
  end
end
