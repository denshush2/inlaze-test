# Stage 1: Build
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the app for production
RUN npm run build

# Stage 2: Serve the app
FROM nginx:stable-alpine

# Copy the built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom nginx configuration if needed (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port Nginx will run on
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
