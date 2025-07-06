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
EXPOSE 3001
CMD ["npm", "run", "dev"]
