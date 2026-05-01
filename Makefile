.PHONY: docker-build docker-up docker-down

## Build the Docker image
docker-build:
	docker compose build

## Build and start the container
docker-up:
	docker compose up --build -d

## Stop and remove the container
docker-down:
	docker compose down
