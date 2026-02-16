# Use Node.js LTS image
FROM node:20-slim

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json and package-lock.json are copied.
COPY package*.json ./

# Install production dependencies.
RUN npm install --omit=dev

# Copy local code to the container image.
COPY . .

# Create an empty database file to ensure it exists
RUN touch database.sqlite

# Expose the port the app runs on
EXPOSE 5000

# Run the web service on container startup.
CMD [ "npm", "start" ]
