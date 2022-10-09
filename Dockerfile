FROM node:16.17.1-alpine3.15 AS builder

WORKDIR /build

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:16.17.1-alpine3.15

WORKDIR /app

COPY --from=builder /build/dist ./dist
COPY --from=builder /build/package.json .
COPY --from=builder /build/node_modules ./node_modules

CMD ["npm", "run", "start:prod"]

