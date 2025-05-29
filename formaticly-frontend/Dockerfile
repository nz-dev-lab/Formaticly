# Stage 1: Build Angular app
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Stage 2: Serve app with nginx
FROM nginx:alpine

# Copy built Angular app from previous stage to nginx's html folder
COPY --from=build /app/dist/formaticly-frontend /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for nginx
EXPOSE 80

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
