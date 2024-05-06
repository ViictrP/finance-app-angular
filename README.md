# Finance App Angular
Application built with Angular 17 to control expenses (based on my necessities)

[![Node.js CI](https://github.com/ViictrP/finance-app-angular/actions/workflows/build.yml/badge.svg)](https://github.com/ViictrP/finance-app-angular/actions/workflows/build.yml)

## Run Docker build to create the docker image
```
docker build \
--build-arg API_KEY="<apiKey>" \
--build-arg AUTH_DOMAIN="<authDomain>" \
--build-arg PROJECT_ID="<projectId>" \
--build-arg STORAGE_BUCKET="<storageBucket>" \
--build-arg MESSAGING_SENDER_ID="<messagingSenderId>" \
--build-arg APP_ID="<appId>" \
--build-arg MEASUREMENT_ID="<measurementId>" \
--tag finance-app-angular:v1.0.0 -f ./Dockerfile .
```

## Run the docker image
``` 
  docker run -d -p <port:container-port> -e PORT=<port> finance-app-angular:v1.0.0
```
