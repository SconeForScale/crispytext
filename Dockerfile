FROM node:22.2.0-alpine3.18

WORKDIR /app

COPY index.html /app/index.html
COPY index.js /app/index.js
COPY package.json /app/package.json
COPY vite.config.js /app/vite.config.js
COPY public /app/public
COPY src /app/src

RUN npm install
RUN npm run build

ENV NODE_ENV production

ENTRYPOINT ["npm", "run", "start"]
CMD []