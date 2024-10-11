# Use Node.js LTS image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Expose port 3000 for the frontend service
EXPOSE 3000

# Start the React app in development mode
CMD ["npm", "start"]
