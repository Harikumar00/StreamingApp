#!/bin/bash

echo "🚀 Building backend image..."
docker build -t 975050024946.dkr.ecr.us-west-1.amazonaws.com/hari-backend-repo:latest .

echo "🔐 Logging into ECR..."
aws ecr get-login-password --region us-west-1 \
| docker login --username AWS \
--password-stdin 975050024946.dkr.ecr.us-west-1.amazonaws.com

echo "📤 Pushing image..."
docker push 975050024946.dkr.ecr.us-west-1.amazonaws.com/hari-backend-repo:latest

echo "♻️ Restarting Kubernetes backend..."
kubectl rollout restart deployment backend -n streaming

echo "👀 Watching pod status..."
kubectl get pods -n streaming -w
