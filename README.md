# MHP Server

### Development Quickstart

#### Set up Docker

Install Docker [for your operating system](https://docs.docker.com/engine/install/)

Pull and run the [s3-ninja](https://s3ninja.net/) AWS S3 Emulator docker container

```bash
docker pull scireum/s3-ninja:latest
docker run -p 9444:9000 scireum/s3-ninja:latest
```

Note: For your s3 objects to persist, you will need to bind a volume to `/home/sirius/data`

```bash
docker volume create s3data
docker run -p 9444:9000 scireum/s3-ninja:latest --mount source=s3data,target=/home/sirius/data
```

Navigate to the [S3 Ninja UI](http://localhost:9444/ui)

If the access key and/or secret key are different than those in [s3.ts](s3.ts), copy and past them to match

#### Set up Dev Environment

Clone the repo using git

```bash
git clone https://github.com/MasterHomebrewerProgram/mhp-server.git
cd mhp-server
```

Install dependencies with `npm`

```bash
npm install
```

Initialize and seed the database

```bash
npm run init:dev
```

Run the server

```bash
npm run dev
```

### Database Schema

![Database Schema](./docs/images/db_schema.PNG)
