pipeline {
    agent any

    stages {

        stage('Build Frontend') {
            steps {
                sh 'docker build -t frontend ./frontend'
            }
        }

        stage('Build Backend') {
            steps {
                sh 'docker build -t backend ./backend/adminService'
            }
        }

        stage('Push Images') {
            steps {
                sh '''
                ACCOUNT=975050024946
                REGION=us-west-1

                aws ecr get-login-password --region $REGION \
                | docker login --username AWS \
                --password-stdin $ACCOUNT.dkr.ecr.$REGION.amazonaws.com

                docker tag frontend $ACCOUNT.dkr.ecr.$REGION.amazonaws.com/hari-frontend-repo:latest
                docker tag backend $ACCOUNT.dkr.ecr.$REGION.amazonaws.com/hari-backend-repo:latest

                docker push $ACCOUNT.dkr.ecr.$REGION.amazonaws.com/hari-frontend-repo:latest
                docker push $ACCOUNT.dkr.ecr.$REGION.amazonaws.com/hari-backend-repo:latest
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                aws eks update-kubeconfig --region us-west-1 --name streamingapp-cluster-pp
                helm upgrade --install streaming ./streamingapp -n streaming --create-namespace
                '''
            }
        }

    }
}
