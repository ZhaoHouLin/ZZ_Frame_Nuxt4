FROM node:20-slim
WORKDIR /app
# 直接把我們在外面編譯好的 .output 複製進去
COPY .output ./.output
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
