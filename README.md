# spuxx-dev-mono

## Build an application

From the monorepo's root folder, run:

- `docker buildx build . -f ./apps/spuxx-api/Dockerfile` to build the [spuxx-api](./apps/spuxx-api) application

## Cargo

- Run an application with `cargo run -p <package> -- start`
- Install all workspace dependencies with `cargo fetch`
