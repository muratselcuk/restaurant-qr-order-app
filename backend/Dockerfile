# 1. Aşama: bağımlılıkları derle
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN apk add --no-cache python3 make g++ \
    && npm ci \
    && apk del make g++ python3

# 2. Aşama: uygulamayı çalıştır
FROM node:22-alpine
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Ortam değişkeni ile DB bağlantı URL'si alınır
ENV DATABASE_URL="postgresql://devuser:devpass@postgres:5432/qrdb"

# Migration + seed + dev server çalıştır
ENTRYPOINT ["sh", "-c", "npx knex migrate:latest --knexfile knexfile.js && npx knex seed:run --knexfile knexfile.js && npm run dev"]
EXPOSE 3001