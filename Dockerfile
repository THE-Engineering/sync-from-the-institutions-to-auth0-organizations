FROM node:18.15-alpine
ENV NODE_ENV=production
ENV HUSKY=0
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --quiet
COPY . .
ENTRYPOINT sh ./start.sh
