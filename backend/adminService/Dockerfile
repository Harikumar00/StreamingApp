# Use lightweight Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy application source code
COPY . .

# Set environment to production
ENV NODE_ENV=production

# Expose application port
EXPOSE 3003

# Start the service
CMD ["npm", "run", "start"]
