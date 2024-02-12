# FinanceAppAngular
Application built with Angular 17 to control expenses (based on my necessities)

## Run Docker build to create the docker image
`docker build --tag <tagname:tagversion> -f ./Dockerfile .`

## Run the docker image
``` 
  docker run -d -p <port:container-port> \
  -e apiUrl=<api_url> \ 
  -e apiKey=<api_key> \
  -e appId=<app_id> \
  -e authDomain=<auth_domain> \
  -e measurementId=<measurement_id> \
  -e messagingSenderId=<messaging_sender_id> \
  -e projectId=<project_id> \
  -e storageBucket=<storage_bucket> \
  -e nodeEnv=development \
  <tagname:tagversion>
```
