# Use Node.js LTS image
FROM node:18-alpine

# Install nodemon globally
RUN npm install -g nodemon

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code to the working directory
COPY public ./public
COPY src ./src

# Build the React app (creates the build folder)
RUN npm run build

# Expose port 3000 for the frontend service
EXPOSE 3000

# Start the React app in development mode with nodemon to auto-reload
CMD ["nodemon", "-L", "npm", "start"]

# Optional: Install Firebase CLI tools globally
# RUN npm install -g firebase-tools
