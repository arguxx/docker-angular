# ARG NODE_VERSION=14.15-alpine
# ARG NGINX_VERSION=latest

# FROM node:${NODE_VERSION} as npm_install

# WORKDIR /var/www

# COPY . .

# ## install dependencies & ng
# RUN npm install --prod --silent && \
# npm install @angular-devkit/build-angular --silent

# ## ng build production
# RUN ./node_modules/@angular/cli/bin/ng build \
# --aot \
# --build-optimizer \
# --common-chunk \
# --optimization \
# --source-map \
# --stats-json

# FROM nginx:${NGINX_VERSION}
# ARG APPLICATION_NAME=docker-angular
# ENV APPLICATION_PORT=80

# LABEL MAINTAINER="Argian"
# LABEL org.framework.name="angular.io" org.framework.version="12.1.1" dependency.node.version="^14.15"

# ## copy from ng build --prod
# COPY --from=npm_install /var/www/dist/$APPLICATION_NAME /var/www/html

# RUN sed -i 's|/usr/share/nginx/html|/var/www/html|g' /etc/nginx/conf.d/default.conf

# EXPOSE ${APPLICATION_PORT}/tcp

# # Health check every 5 minutes and set timeout 3 seconds using curl
# HEALTHCHECK --interval=2m --timeout=3s \
#     CMD curl -f http://localhost:${APPLICATION_PORT} || exit 1

# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/docker-angular /usr/share/nginx/html

# Expose port 80
EXPOSE 80