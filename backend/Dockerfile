# Этап сборки
FROM golang:1.24.1-alpine AS backend-builder

# Установка необходимых инструментов и зависимостей для SQLite
RUN apk add --no-cache git gcc musl-dev sqlite-dev

# Установка рабочей директории
WORKDIR /app/backend

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN CGO_ENABLED=1 GOOS=linux go build -o main ./cmd/service

FROM alpine:latest as backend-final

RUN apk add --no-cache sqlite

WORKDIR /app/backend

COPY --from=backend-builder /app/backend/main .

EXPOSE 8080

CMD ["./main"]