# Use the official Bun image
FROM oven/bun:1

# Set working directory
WORKDIR /usr/src/app

# Copy package files first (to optimize caching)
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy the rest of the application (includes prisma/schema.prisma)
COPY . .

# --- ADD THIS SECTION ---
# Generate Prisma Client inside the image
# (It uses the dummy URL from prisma.config.ts if DB isn't available yet)
RUN bunx prisma generate
# ------------------------

# Expose the API port
EXPOSE 3000

# Start the application
CMD ["bun", "run", "start:dev"]