help: ## Help documentation
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_0-9-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build-local: ## Builds a local executable of the project via "go build"
	@(cd server && go build)

start-local: build-local ## Builds and starts a local version of the program
	@(cd server && go run main.go)

build-dev-images: ## Builds the docker development images based on docker-compose.yml
	@(cd server && docker-compose build)

deploy-namespace: ## Creates Kubernetes workspace
	@(kubectl apply -f ./kubernetes/namespace.yaml && kubectl config set-context --current --namespace=chris-devops-example)

deploy-data: ## Creates the k8s database deployment and service
	@(kubectl apply -f ./kubernetes/data.yaml)

deploy-dev-server: ## Creates the k8s dev server deployment and service
	@(kubectl apply -f ./kubernetes/server.yaml)

deploy-dev: build-dev-images deploy-namespace deploy-data deploy-dev-server
	@(echo "Server running on http://localhost:8080/api/v1/users")
## Creates development-specific deployments and services

destroy-all-k8s: ## Deletes the local Kubernetes architecture
	@(kubectl delete -f ./kubernetes)
