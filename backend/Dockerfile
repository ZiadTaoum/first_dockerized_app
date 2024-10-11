FROM node:18-alpine

RUN npm install -g nodemon

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if it exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 5000

# Start the application using the local version of Nodemon
CMD ["npm", "run", "dev"]
