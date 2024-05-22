FROM node:22.2.0-alpine3.18

WORKDIR /app

COPY index.html /app/index.html
COPY index.js /app/index.js
COPY package.json /app/package.json
COPY public /app/public
COPY src /app/src
COPY dist /app/dist

RUN npm install

ENTRYPOINT ["npm", "run", "start"]
CMD []