# Dockerized Go API
Full CRUD GoLang server running in a docker container connected to a postgres database.

# Running the Server
To start the server in Kubernetes locally, run `make deploy-dev`. 
The docker portion is contained in `docker-compose.yml` and `server/Dockerfile`.
All of the Kubernetes files are located in `kubernetes/`

## Available Make Commands

```bash
build-local                    Builds a local executable of the project via "go build"
help                           Help documentation
start-local                    Builds and starts a local version of the program
deploy-dev                     Will deploy the server and the db with Kubernetes the running server will then be available at http://localhost:8080/api/v1/users
```
