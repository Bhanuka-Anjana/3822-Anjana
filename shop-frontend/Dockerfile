# Stage 01
# Use the official Node.js runtime as the base image
FROM node:20-alpine as build
# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY package.json .

# Install all dependencies
RUN npm i

# Copy the content of the local src directory to the working directory
COPY . .

# Build the app
RUN npm run build

# Stage 02
# Use the official Nginx image as the base image
FROM nginx:1.21-alpine

# Copy the build output to replace the default Nginx contents.
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world for http traffic

EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
