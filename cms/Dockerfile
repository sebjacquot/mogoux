FROM node:18.8-alpine as base

FROM base as builder

# Change this path to your own directory
WORKDIR /home/docker/goux-cms
COPY package*.json ./

COPY . .
RUN npm install
RUN npm run build

FROM base as runtime

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js


# Change this path  to your own directory
WORKDIR /home/docker/goux-cms
COPY package*.json  ./
COPY package-lock.json ./

RUN npm install --production
# Change this path  to your own directory
COPY --from=builder /home/docker/goux-cms/dist ./dist
COPY --from=builder /home/docker/goux-cms/build ./build

EXPOSE 3000

CMD ["node", "dist/server.js"]
