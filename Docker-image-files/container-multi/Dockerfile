FROM node:latest

ADD src/ /src
WORKDIR /src

RUN npm install

ENV PORT=80
ENV FAKE_ADMIN_PORT=8888

CMD ["node", "index.js"]