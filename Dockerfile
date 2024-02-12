FROM node:20
COPY . ./angular
WORKDIR /angular

RUN npm ci
RUN npm run build

ENV FNC_APP_API_KEY=$apiUrl
ENV FNC_APP_API_URL=$apiKey
ENV FNC_APP_APP_ID=$authDomain
ENV FNC_APP_AUTH_DOMAIN=$projectId
ENV FNC_APP_MEASUREMENT_ID=$storageBucket
ENV FNC_APP_MESSAGING_SENDER_ID=$MESSAGING_SENDER_ID
ENV FNC_APP_PROJECT_ID=$appId
ENV FNC_APP_STORAGE_BUCKET=$measurementId

EXPOSE $PORT
ENTRYPOINT ["node", "./dist/finance-app-angular/server/server.mjs"]
