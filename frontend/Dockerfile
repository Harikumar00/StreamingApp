############################
# Stage 1: Build React App
############################
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build arguments (React requires REACT_APP_*)
ARG REACT_APP_AUTH_API_URL
ARG REACT_APP_STREAMING_API_URL
ARG REACT_APP_STREAMING_PUBLIC_URL
ARG REACT_APP_ADMIN_API_URL
ARG REACT_APP_CHAT_API_URL
ARG REACT_APP_CHAT_SOCKET_URL

# Set environment variables
ENV REACT_APP_AUTH_API_URL=${REACT_APP_AUTH_API_URL}
ENV REACT_APP_STREAMING_API_URL=${REACT_APP_STREAMING_API_URL}
ENV REACT_APP_STREAMING_PUBLIC_URL=${REACT_APP_STREAMING_PUBLIC_URL}
ENV REACT_APP_ADMIN_API_URL=${REACT_APP_ADMIN_API_URL}
ENV REACT_APP_CHAT_API_URL=${REACT_APP_CHAT_API_URL}
ENV REACT_APP_CHAT_SOCKET_URL=${REACT_APP_CHAT_SOCKET_URL}

# Build React app
RUN npm run build


############################
# Stage 2: Nginx Server
############################
FROM nginx:1.27-alpine AS production

# Copy build output to Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
