FROM node:20-alpine AS deps
WORKDIR /app
# Copy lockfiles first for better layer caching
COPY package*.json ./
# ✅ Provide schema BEFORE npm ci so postinstall (prisma generate) can run
COPY prisma ./prisma
RUN npm ci --no-audit

FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
# Bring installed deps (already includes generated Prisma client)
COPY --from=deps /app/node_modules ./node_modules
# Bring full source (incl. prisma, src, etc.)
COPY . .
# Build Next.js
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=9000
# Runtime artifacts
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./
# Include deps with generated Prisma client/engines
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 9000
# Apply migrations at start, then serve
CMD sh -c "npx prisma migrate deploy && npm run start -- -p 9000 -H 0.0.0.0"
