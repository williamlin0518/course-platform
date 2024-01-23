docker build -t will518/course-platform:latest -t will518/course-platform:$SHA -f ./client/Dockerfile ./client
docker push will518/course-platform:latest

# push to docker hub based on the SHA
docker push will518/course-platform:$SHA


kubectl apply -f k8s
kubectl set image deployments/client-deployment client=will518/course-platform:$SHA
