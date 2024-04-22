pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'shop-frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the Git repository
                git 'http://gitlab.com/username/shop-frontend.git'}
        }

        stage('Build Docker Image') {
            steps {
                // Build the Docker image
                script {
                    docker.build(DOCKER_IMAGE_NAME)
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                // Run the Docker container
                script {
                    docker.image(DOCKER_IMAGE_NAME).withRun('-p 3000:80')
                }
            }
        }
    }
}
