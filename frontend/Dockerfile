FROM node:22-bullseye
WORKDIR /app
COPY package.json ./
# Eğer package-lock.json varsa, onu da ekle:
COPY package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]