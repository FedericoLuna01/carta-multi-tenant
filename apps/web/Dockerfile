FROM node:19-alpine3.16 AS base

FROM base AS builder
RUN apk add --no-cache openssl libc6-compat 
RUN apk update

WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune web --docker

FROM base AS installer
RUN apk add --no-cache openssl libc6-compat 
RUN apk update
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install

# Copiar el schema de Prisma
COPY --from=builder /app/out/full/apps/web/prisma ./prisma

# Generar el cliente de Prisma
RUN npx prisma generate

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN npm run build -- --filter=web...

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/web/next.config.js .
COPY --from=installer /app/apps/web/package.json .

COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

CMD node apps/web/server.js 