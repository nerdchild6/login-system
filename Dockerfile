# Use the official Bun image
FROM oven/bun:1

# Set working directory
WORKDIR /usr/src/app

# Copy package files first
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy the rest of the application
COPY . .

# Expose the API port
EXPOSE 3000

# --- FIX IS HERE ---
# Instead of just running start, we Generate THEN Start
CMD ["/bin/sh", "-c", "bunx prisma generate && bunx prisma db push && bun run start:dev"]