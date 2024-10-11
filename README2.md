# Dockerfile of Backend

Explanation:
FROM node:18-alpine:

This tells Docker to use the Alpine version of the official Node.js LTS (Long Term Support) image.
Alpine is a lightweight Linux distribution, which makes it ideal for smaller, faster images.
We use node:18-alpine to ensure compatibility with the latest Node.js features while keeping the image size small.
WORKDIR /app:

This command sets the working directory inside the container. All subsequent commands will be executed inside the /app directory.
It’s important to set a working directory to organize where files are placed inside the container.
COPY package*.json ./:

This copies package.json and package-lock.json (if it exists) into the container.
We copy these files first because Docker can cache this step if dependencies haven't changed, which makes builds faster when you're only changing code files.
RUN npm install:

This installs the project dependencies listed in package.json (like Express and Mongoose).
The npm install step is run after copying package.json to ensure dependencies are installed before copying the rest of the code.
COPY . .:

This command copies the rest of the application code (everything in the current directory, .) into the container's /app directory.
This allows Docker to include your server.js file and any other files you have in your backend directory.
EXPOSE 5000:

This tells Docker that the backend container will listen for connections on port 5000.
It's not mandatory for Docker to expose ports, but it's a good practice for documenting which port the application runs on.
CMD ["node", "server.js"]:

This specifies the command that will be run when the container starts.
Here, we start the Node.js application by running the server.js file.

# Dockerfile of Frontend

Explanation:
FROM node:18-alpine:

Just like the backend, we use the Alpine version of the official Node.js LTS image.
React is a Node.js-based app, so we use the same base image here.
WORKDIR /app:

This sets the working directory inside the container to /app, where the React app will reside.
COPY package*.json ./:

We copy the package.json and package-lock.json files into the container to install dependencies.
This helps Docker cache the npm install step, making builds faster.
RUN npm install:

This installs the project dependencies listed in package.json, which includes React, React DOM, and any other frontend libraries you're using.
COPY . .:

This copies the rest of the frontend source code (everything in the current directory) into the container.
EXPOSE 3000:

This tells Docker that the frontend container will listen for connections on port 3000, which is the default port used by Create React App.
CMD ["npm", "start"]:

This specifies the command that will be run when the container starts.
We use npm start to start the React development server.

# docker-compose

Explanation: 
version: '3':

This specifies the version of the Docker Compose file format. Version 3 is the most widely used version for production-grade deployments.
services:

The services section defines all the services (containers) that will be part of the Docker network. In this case, we have mongo, backend, and frontend.

<!-- MongoDB Service -->

image: mongo:5.0:
This tells Docker to pull and use the official MongoDB image, version 5.0.

container_name: mongodb:
This gives the MongoDB container a friendly name (mongodb). It also allows the backend to refer to the MongoDB service by this name.

ports: - "27017:27017":
This exposes MongoDB on port 27017 (the default MongoDB port). The left-hand side (27017) is the port on the host machine, and the right-hand side (27017) is the port inside the container.

volumes: - mongo-data:/data/db:
This creates a persistent volume (mongo-data) that stores MongoDB data outside of the container. This ensures that MongoDB data is not lost if the container is stopped or removed.


<!-- Backend Service -->

build: ./backend:
This tells Docker to build the backend service using the Dockerfile located in the ./backend directory.

container_name: backend:
This assigns the backend container a friendly name (backend).

ports: - "5000:5000":
This maps port 5000 on the container to port 5000 on the host. This allows you to access the backend API on http://localhost:5000.

depends_on: - mongo:
This ensures that the backend service will only start after the MongoDB service is up and running.

environment: MONGO_URL:
This sets the MONGO_URL environment variable inside the backend container. It allows the backend to connect to the MongoDB container using the URL mongodb://mongo:27017/usersdb, where mongo is the name of the MongoDB container (specified in container_name: mongodb).

<!-- Frontend Service -->

build: ./frontend:
This tells Docker to build the frontend service using the Dockerfile located in the ./frontend directory.

container_name: frontend:
This assigns the frontend container a friendly name (frontend).

ports: - "3000:3000":
This maps port 3000 on the container to port 3000 on the host. This allows you to access the frontend React app on http://localhost:3000.

depends_on: - backend:
This ensures that the frontend service will only start after the backend service is up and running.

<!-- Volumes -->

mongo-data:
This creates a named Docker volume (mongo-data) that persists MongoDB data, ensuring the database is not lost between container restarts.



[
    *Summary*
    
Backend Dockerfile: Builds a lightweight Node.js backend container using node:18-alpine, installs dependencies, and runs the Express server on port 5000.
Frontend Dockerfile: Builds a React frontend container, also using node:18-alpine, which serves the React app on port 3000.
Docker Compose: Orchestrates three services: MongoDB, backend, and frontend, ensuring they communicate with each other. It sets up networking, volume persistence, and inter-service dependencies.
Let me know if you'd like to dive deeper into any specific part of Docker or Docker Compose!

    ]