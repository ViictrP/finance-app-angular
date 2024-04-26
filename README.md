# FinanceAppAngular
Application built with Angular 17 to control expenses (based on my necessities)

[![Node.js CI](https://github.com/ViictrP/finance-app-angular/actions/workflows/build.yml/badge.svg)](https://github.com/ViictrP/finance-app-angular/actions/workflows/build.yml)

## Run Docker build to create the docker image
```
docker build \
--build-arg apiKey="<apiKey>" \
--build-arg authDomain="<authDomain>" \
--build-arg projectId="<projectId>" \
--build-arg storageBucket="<storageBucket>" \
--build-arg messagingSenderId="<messagingSenderId>" \
--build-arg appId="<appId>" \
--build-arg measurementId="<measurementId>" \
--tag finance-app-angular:v1.0.0 -f ./Dockerfile .
```

## Run the docker image
``` 
  docker run -d -p <port:container-port> -e PORT=<port> finance-app-angular:v1.0.0
```
