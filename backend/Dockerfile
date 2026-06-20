# Builder Stage
FROM node:22 AS builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production Stage
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
COPY --from=builder /app/dist ./dist
RUN npm ci --only=production
EXPOSE 8001
CMD [ "npm","run","start" ]