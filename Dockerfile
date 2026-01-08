# 使用 node 20 做為編譯環境
FROM node:20-slim AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# 執行環境
FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/.output ./.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]



# # build stage
# FROM node:20-alpine AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # runtime stage
# FROM node:20-alpine
# WORKDIR /app
# COPY --from=builder /app/.output ./.output
# ENV NODE_ENV=production
# EXPOSE 3000
# CMD ["node", ".output/server/index.mjs"]
