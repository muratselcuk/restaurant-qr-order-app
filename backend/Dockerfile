# 1. Aşama: dependencies
FROM node:22-slim AS deps
WORKDIR /app
COPY package.json ./
RUN npm install

# 2. Aşama: uygulama kodu
FROM node:22-slim AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Veritabanı dosyasının konteynerdeki yolu
ENV SQLITE_PATH=/data/restaurant.db

# Host'ta proje kökünde oluşturacağınız data/ klasörünü mount edin:
#   docker run -v $(pwd)/data:/data ...
VOLUME ["/data"]

# Önce migration ve seed, sonra dev server
ENTRYPOINT ["sh", "-c", "npx knex migrate:latest --knexfile knexfile.js && npx knex seed:run --knexfile knexfile.js && npm run dev"]

EXPOSE 3001