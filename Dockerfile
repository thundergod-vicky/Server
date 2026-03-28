# Stage 1: Build the application
FROM node:20-alpine AS builder

# Install build dependencies for canvas, sharp, and prisma
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    cairo-dev \
    pango-dev \
    jpeg-dev \
    giflib-dev \
    librsvg-dev \
    build-base

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma/

# Install all dependencies including devDependencies for the build
RUN npm install --legacy-peer-deps

# Generate Prisma Client
RUN npx prisma generate

COPY . .

# Build the NestJS application
RUN npm run build

# Stage 2: Production runner
FROM node:20-alpine AS runner

# Install runtime dependencies for canvas and sharp
RUN apk add --no-cache \
    cairo \
    pango \
    jpeg \
    giflib \
    librsvg \
    libc6-compat

WORKDIR /app

ENV NODE_ENV=production

# Copy only the necessary files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs
USER nestjs

EXPOSE 3002

# The port should match your server's listening port
ENV PORT=3002

CMD ["npm", "run", "start:prod"]
