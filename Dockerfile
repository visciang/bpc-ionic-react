FROM node:22.14.0-slim

RUN mkdir /code
WORKDIR /code

COPY public ./public
COPY src ./src
COPY .browserslistrc ./.browserslistrc
COPY .prettierrc ./.prettierrc
COPY eslint.config.js ./eslint.config.js
COPY index.html ./index.html
COPY ionic.config.json ./ionic.config.json
COPY package-lock.json ./package-lock.json
COPY package.json ./package.json
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.node.json ./tsconfig.node.json
COPY vite.config.ts ./vite.config.ts

RUN npm install -g @ionic/cli@7.2.1
RUN npm ci
RUN npm run lint
RUN npm run build
