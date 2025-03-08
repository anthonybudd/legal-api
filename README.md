# Legal API



### Set-up
```sh
git clone git@github.com:anthonybudd/legal-api.git
cd legal-api

# Private RSA key for JWT signing
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -outform PEM -pubout -out public.pem

# Start app
cp .env.example .env
# edit .env
npm install
docker compose up
npm run exec:db:refresh
```



### Getting Started

> NOTE: There is live demo of this codebase deployed to AWS just change the url to `https://legal-api.anthonybudd.io`

First, get an access token
```sh
response=$(curl -X POST http://localhost:8888/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  --data-raw '{"email":"user@example.com","password":"Password@1234"}')

export ACCESS_TOKEN=$(echo $response | jq -r '.accessToken')
```

Then upload a PDF
```sh
curl -X POST http://localhost:8888/api/v1/upload \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -F "file=@example.pdf"
```

Uploading anything other than a PDF will result in 422 error
```sh
curl -X POST http://localhost:8888/api/v1/upload \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -F "file=@example.docx"
```

### SDK
To build an SDK for the React Front-end just run the below command. By default this will make a JS, PHP and Swift SDK for this API.

```sh
docker run --rm \
  -v ${PWD}:/app \
  -w /app \
  openapitools/openapi-generator-cli batch sdk/config/*.yaml
```

### Deployemnt
This has been deployed to AWS using this [CloudFormation.yml](./aws/cloudformation.yml) file.

Live URL [https://legal-api.anthonybudd.io/api/v1/_healthcheck](https://legal-api.anthonybudd.io/api/v1/_healthcheck)

### Routes
[OpenApiSpec.yml](./OpenApiSpec.yml)