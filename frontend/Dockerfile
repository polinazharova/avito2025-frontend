# Этап сборки фронтенда
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY index.html ./

RUN npm install

COPY src ./src
COPY public ./public

RUN npm run build

# Финальный образ
FROM node:18-alpine

WORKDIR /app/frontend

# Копируем собранный фронтенд
COPY --from=frontend-builder /app/frontend/dist ./dist

COPY server/package*.json ./server/
RUN cd ./server && npm install

COPY server ./server

EXPOSE 80
CMD ["node", "./server/server.js"]