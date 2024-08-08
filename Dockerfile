# Use the latest Node.js image as a base
FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD [ "npm", "start" ]
