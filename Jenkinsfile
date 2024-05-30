pipeline {
    agent none

    environment {
        PIPELINE_VERSION = build.pipelineVersion()
    }

    stages {
        stage('Pre build') {
            steps {
                setBuildDisplayName to: env.PIPELINE_VERSION
                sendBuildNotification()
            }
        }

        stage('Test and build') {
            agent { label 'ubuntu && 20.04' }
            environment {
                GIT_SHORT_COMMIT = build.shortCommitRef()
                ARTIFACT_VERSION = "${env.PIPELINE_VERSION}" + '+sha.' + "${env.GIT_SHORT_COMMIT}"
            }
            stages {
                stage('Setup') {
                    steps {
                        sh label: 'Install rubygems', script: 'bundle install --deployment'
                    }
                }
                stage('Run checks') {
                    steps {
                        sh label: 'Check JSON syntax', script: 'bundle exec rake jsonlint'
                    }
                }
                stage('Build artifact') {
                    steps {
                        sh label: 'Build artifact', script: "bundle exec rake build_artifact ARTIFACT_VERSION=${env.ARTIFACT_VERSION}"
                        archiveArtifacts artifacts: "pkg/*${env.ARTIFACT_VERSION}*.tar.gz", onlyIfSuccessful: true
                    }
                }
            }
            post {
                cleanup {
                    cleanWs()
                }
            }
        }

        stage('Deploy to Acceptance') {
            agent { label 'ubuntu && 20.04' }
            options { skipDefaultCheckout() }
            environment {
                APPLICATION_ENVIRONMENT = 'acceptance'
                BUCKET                  = 'assets-acc.uit.be'
                DISTRIBUTION_ID         = 'EGX9C66I8R065'
            }
            steps {
                copyArtifacts filter: 'pkg/*.tar.gz', projectName: env.JOB_NAME, flatten: true, selector: specific(env.BUILD_NUMBER)
                untar file: findFiles(glob: '*.tar.gz')[0].path, quiet: true
                withCredentials([aws(credentialsId: 'jenkins')]) {
                    sh label: 'Upload versions.json', script: "bundle exec rake s3_upload BUCKET=${env.BUCKET}"
                    sh label: 'Invalidate cache for /versions endpoint', script: "bundle exec rake invalidate_cache DISTRIBUTION_ID=${env.DISTRIBUTION_ID}"
                }
            }
            post {
                always {
                    sendBuildNotification to: '#ups-ops', message: "Pipeline <${env.RUN_DISPLAY_URL}|${env.JOB_NAME} [${currentBuild.displayName}]>: deployed to *${env.APPLICATION_ENVIRONMENT}*"
                }
                cleanup {
                    cleanWs()
                 }
            }
        }

        stage('Deploy to Testing') {
            input { message "Deploy to Testing?" }
            agent { label 'ubuntu && 20.04' }
            options { skipDefaultCheckout() }
            environment {
                APPLICATION_ENVIRONMENT = 'testing'
                BUCKET                  = 'assets-test.uit.be'
                DISTRIBUTION_ID         = 'E23GDOYWUCPRUE'
            }
            steps {
                copyArtifacts filter: 'pkg/*.tar.gz', projectName: env.JOB_NAME, flatten: true, selector: specific(env.BUILD_NUMBER)
                untar file: findFiles(glob: '*.tar.gz')[0].path, quiet: true
                withCredentials([aws(credentialsId: 'jenkins')]) {
                    sh label: 'Upload versions.json', script: "bundle exec rake s3_upload BUCKET=${env.BUCKET}"
                    sh label: 'Invalidate cache for /versions endpoint', script: "bundle exec rake invalidate_cache DISTRIBUTION_ID=${env.DISTRIBUTION_ID}"
                }
            }
            post {
                always {
                    sendBuildNotification to: '#ups-ops', message: "Pipeline <${env.RUN_DISPLAY_URL}|${env.JOB_NAME} [${currentBuild.displayName}]>: deployed to *${env.APPLICATION_ENVIRONMENT}*"
                }
                cleanup {
                    cleanWs()
                 }
            }
        }

        stage('Deploy to Production') {
            input { message "Deploy to Production?" }
            agent { label 'ubuntu && 20.04' }
            options { skipDefaultCheckout() }
            environment {
                APPLICATION_ENVIRONMENT = 'production'
                BUCKET                  = 'assets.uit.be'
                DISTRIBUTION_ID         = 'EEXNZ7UEW1WBC'
            }
            steps {
                copyArtifacts filter: 'pkg/*.tar.gz', projectName: env.JOB_NAME, flatten: true, selector: specific(env.BUILD_NUMBER)
                untar file: findFiles(glob: '*.tar.gz')[0].path, quiet: true
                withCredentials([aws(credentialsId: 'jenkins')]) {
                    sh label: 'Upload versions.json', script: "bundle exec rake s3_upload BUCKET=${env.BUCKET}"
                    sh label: 'Invalidate cache for /versions endpoint', script: "bundle exec rake invalidate_cache DISTRIBUTION_ID=${env.DISTRIBUTION_ID}"
                }
            }
            post {
                always {
                    sendBuildNotification to: '#ups-ops', message: "Pipeline <${env.RUN_DISPLAY_URL}|${env.JOB_NAME} [${currentBuild.displayName}]>: deployed to *${env.APPLICATION_ENVIRONMENT}*"
                }
                cleanup {
                    cleanWs()
                 }
            }
        }
        stage('Tag release') {
            agent { label 'ubuntu && 20.04' }
            steps {
                copyArtifacts filter: 'pkg/*.tar.gz', projectName: env.JOB_NAME, flatten: true, selector: specific(env.BUILD_NUMBER)
                tagRelease commitHash: artifact.metadata(artifactFilter: '*.tar.gz', field: 'git-ref')
            }
            post {
                cleanup {
                    cleanWs()
                }
            }
        }
    }

    post {
        always {
            sendBuildNotification()
        }
    }
}
