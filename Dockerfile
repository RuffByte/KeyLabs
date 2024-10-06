# Use the official Node.js image as the base image
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the Prisma schema and application code
COPY ./prisma ./prisma
COPY . .

# Generate Prisma client
RUN npx prisma generate && \
    npx prisma migrate deploy && \
    npx prisma migrate status
# Build the Next.js application
RUN pnpm build

# Use a minimal production image
FROM node:20-alpine AS runner

# Set the working directory
WORKDIR /app
ENV NODE_ENV production

# Copy necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/prisma ./prisma

# Install production dependencies only
RUN npm install -g pnpm && pnpm install --prod --frozen-lockfile

# Set environment variables for Next.js
ENV NODE_ENV production

# Expose the port
EXPOSE 3000

# Start the Next.js application
CMD ["pnpm", "start"]
