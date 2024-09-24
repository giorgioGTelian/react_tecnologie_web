# Stage 1: Build the client
FROM node:18 AS client-build

WORKDIR /app/client

COPY client/package*.json ./
RUN npm install

COPY client/ ./
RUN npm run build

# Stage 2: Build the server
FROM node:18 AS server-build

WORKDIR /app/server

COPY server/package*.json ./
RUN npm install

COPY server/ ./

# Stage 3: Final stage to serve both client and server
FROM node:18

# Copy server files
WORKDIR /app/server
COPY --from=server-build /app/server ./

# Copy client build files to server's public directory
COPY --from=client-build /app/client/build ./public

# Expose the port the server will run on
EXPOSE 3000

# Start the server
CMD ["npm", "start"]