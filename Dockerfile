FROM node:18
WORKDIR /angular

ARG API_KEY
ARG AUTH_DOMAIN
ARG PROJECT_ID
ARG STORAGE_BUCKET
ARG MESSAGING_SENDER_ID
ARG APP_ID
ARG MEASUREMENT_ID

ENV PORT=$PORT

EXPOSE $PORT
ENTRYPOINT ["node", "./dist/finance-app-angular/server/server.mjs"]

COPY package.json /angular
COPY package-lock.json /angular
COPY /scripts /angular/scripts
RUN npm ci --loglevel=verbose --no-audit

COPY . /angular

RUN npm run build
