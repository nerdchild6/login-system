# Use the official Bun image
FROM oven/bun:1

# Set working directory
WORKDIR /usr/src/app

# Copy package files first (better caching)
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy the rest of the application
COPY . .

# Generate Prisma Client (we will need this later)
# RUN bunx prisma generate

# Expose the API port
EXPOSE 3000

# Start the application
CMD ["bun", "run", "start:dev"]