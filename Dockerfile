# syntax=docker/dockerfile:1.4
# Node.js version — update this manually to match .nvmrc when upgrading.
# Current: 24.15.0
# =============================================================================
# Stage 1: deps — install node_modules with Yarn
# =============================================================================
FROM node:24.15.0-alpine AS deps

# Install libc compatibility for native binaries
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package manifests first to leverage Docker layer caching
COPY package.json yarn.lock ./

# Install ALL dependencies (including dev) needed for the build.
# - Cache mount: reuses the yarn cache across builds (no re-downloads).
# - network-timeout: gives slow/corporate networks more time.
# - ignore-optional: skips platform-specific optional binaries (e.g. sharp, swc)
#   that are not needed for the Linux container and often cause DNS failures.
RUN yarn install --frozen-lockfile --network-timeout 300000

# =============================================================================
# Stage 2: builder — compile the Next.js application
# =============================================================================
FROM node:24.13.0-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Re-use the node_modules from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the full source tree
COPY . .

# Disable Next.js telemetry during the build
ENV NEXT_TELEMETRY_DISABLED=1

# Build arguments for public env vars (injected at build time)
# Private vars (e.g. NEXTAUTH_SECRET) are provided at runtime only.
ARG NEXT_PUBLIC_CLINICAL_TABLES
ARG NEXT_PUBLIC_FIREBASE_S3_STORAGE
ARG NEXT_PUBLIC_IMS_API_URL
ARG NEXT_PUBLIC_IMS_API_URL_BASE

ENV NEXT_PUBLIC_CLINICAL_TABLES=$NEXT_PUBLIC_CLINICAL_TABLES
ENV NEXT_PUBLIC_FIREBASE_S3_STORAGE=$NEXT_PUBLIC_FIREBASE_S3_STORAGE
ENV NEXT_PUBLIC_IMS_API_URL=$NEXT_PUBLIC_IMS_API_URL
ENV NEXT_PUBLIC_IMS_API_URL_BASE=$NEXT_PUBLIC_IMS_API_URL_BASE

# Build the application
RUN yarn build

# =============================================================================
# Stage 3: runner — lean production image
# =============================================================================
FROM node:24.13.0-alpine AS runner

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Run as a non-root user for security
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy only what Next.js needs to serve the app
COPY --from=builder /app/public ./public

# Leverage Next.js output file tracing to keep the image small
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static   ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Next.js standalone server entry point
ENTRYPOINT ["node", "server.js"]
