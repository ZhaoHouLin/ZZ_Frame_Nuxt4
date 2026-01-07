# build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
# 在安裝前先檢查網路與解析
RUN cat /etc/resolv.conf && \
    ping -c 1 registry.npmjs.org || echo "DNS Failed" && \
    npm config set registry https://registry.npmmirror.com && \
    npm install --network-timeout=100000
    
RUN echo "104.16.27.35 registry.npmjs.org" >> /etc/hosts && \
    npm install
COPY . .
RUN npm run build

# runtime stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.output ./.output
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
