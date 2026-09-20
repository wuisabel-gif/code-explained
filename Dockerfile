FROM node:20-bookworm

RUN apt-get update \
  && apt-get install --yes --no-install-recommends clang \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV HOST=0.0.0.0

EXPOSE 10000

CMD ["npm", "start"]
