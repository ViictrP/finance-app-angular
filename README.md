# FinanceAppAngular
Application built with Angular 17 to control expenses (based on my necessities)

## Run Docker build to create the docker image
```
docker build \
--build-arg apiKey="AIzaSyBmvMmpS_VgSh0g6Sja4-2sTVzfDb50t4Q" \
--build-arg authDomain="finance-app-382403.firebaseapp.com" \
--build-arg projectId="finance-app-382403" \
--build-arg storageBucket="finance-app-382403.appspot.com" \
--build-arg messagingSenderId="13736117814" \
--build-arg appId="1:13736117814:web:3973b603e11fab03faba97" \
--build-arg measurementId="G-F2CSX9FKNR" \
--tag finance-app-angular:v1.0.0 -f ./Dockerfile .
```

## Run the docker image
``` 
  docker run -d -p <port:container-port> -e PORT=<port> <tagname:tagversion>
```
