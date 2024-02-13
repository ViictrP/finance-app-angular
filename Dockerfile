FROM node:18
WORKDIR /angular

ARG apiKey
ARG authDomain
ARG projectId
ARG storageBucket
ARG messagingSenderId
ARG appId
ARG measurementId

ENV PORT=$PORT

EXPOSE $PORT
ENTRYPOINT ["node", "./dist/finance-app-angular/server/server.mjs"]

COPY package.json /angular
COPY package-lock.json /angular
COPY /scripts /angular/scripts
RUN npm ci --loglevel=verbose --no-audit

COPY . /angular

RUN npm run build
