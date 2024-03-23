# HW11 Docker Rakamin - Todo App API

Pada homework kali ini teman-teman dapat menggunakan unit testing pada project API kemudian jalankan project tersebut menggunakan Dockerfile serta Docker Compose serta menerapkan CI/CD pada github actions

# First Run 

Pastikan Anda sudah menginstal dependencies terlebih dahulu dengan menjalankan perintah:

```
npm install
```

## Run Configurations

In addition this project has 4 environments defined for different purposes:
- **dev** - Development environment for local development. Launches `npm run dev`.
- **test** - Testing environment for running tests. Launches `npm test`.
- **docker** - Docker environment for running the project in Docker. Launches `npm run docker`.
- **docker-test** - Docker testing environment for running tests in Docker. Launches `npm run docker-test`.

