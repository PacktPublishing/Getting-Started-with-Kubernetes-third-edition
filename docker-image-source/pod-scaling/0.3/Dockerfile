FROM node:latest

ADD src/ /src
WORKDIR /src

RUN npm install

ENV PORT=80

CMD ["node", "index.js"]