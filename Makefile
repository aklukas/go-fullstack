help: ## Help documentation
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_0-9-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build-local: ## Builds a local executable of the project via "go build"
	@(cd server && go build)

start-local: build-local ## Builds and starts a local version of the program
	@(cd server && go run main.go)

deploy-frontend:
	@(cd client && yarn build && yarn deploy)

build-dev-images: ## Builds the docker development images based on docker-compose.yml
	@(docker-compose build)

deploy-namespace: ## Creates Kubernetes workspace
	@(kubectl apply -f ./kubernetes/namespace.yaml && kubectl config set-context --current --namespace=chris-devops-example)

deploy-dev-client: ## Creates the k8s dev client deployment and service
	@(kubectl apply -f ./kubernetes/client.yaml)

deploy-data: ## Creates the k8s database deployment and service
	@(kubectl apply -f ./kubernetes/data.yaml)

deploy-dev-server: ## Creates the k8s dev server deployment and service
	@(kubectl apply -f ./kubernetes/server.yaml)

deploy-dev: build-dev-images deploy-namespace deploy-data deploy-dev-server deploy-dev-client
	@(echo "Server running on http://localhost:8080/api/v1/users")
	@(echo "Client running on http://localhost:4200/users")
## Creates development-specific deployments and services

deploy-server-release: ## Creates the k8s deployment and service for the release version of the server
	@(kubectl apply -f ./kubernetes/server-release.yaml)

build-client-release-image: ## Builds the release-ready docker image for the client
	@(. wait-for-endpoint.sh && docker-compose build --force-rm --build-arg ENDPOINT=http://$$ENDPOINT client-release)

destroy-all-k8s: ## Deletes the local Kubernetes architecture
	@(kubectl delete -f ./kubernetes)
