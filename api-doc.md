### POST /login
```
Request body:
{
  username: Required | String (can be filled with username or email)
  password: Required | String
}
```


* Success Response
```
- Status: 200
- Response Body:
{
    "success": true,
    "data": {
        "id": 1,
        "username": "pepi",
        "email": "pepi@gmail.com",
        "name": "pepi",
        "roles": "user",
        "image": null,
        "createdAt": "2021-04-16T07:49:57.999Z",
        "updatedAt": "2021-04-16T07:49:57.999Z",
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJwZXBpIiwiZW1haWwiOiJwZXBpQGdtYWlsLmNvbSIsImlhdCI6MTYxODU1OTQ5Mn0.d3ea2lN_5jCu0gtxUSfrz_wi4d57HkzDiLEDHulMUXQ"
    }
}
```
* Error Response
```
- Status: 400
- Response Body:
{
  errors: [
    <errors>
  ]
}
```

### POST /register
```
Request body:
{
  email: Required | String,
  password: Required | String,
  username: Required | String,
  name: Required | String
}
```


* Success Response
```
- Status: 200
- Response Body:
{
    "success": true,
    "message": "user created",
    "data": {
        "id": 1,
        "username": "pepi",
        "email": "pepi@gmail.com",
        "name": "pepi",
        "roles": "user",
        "updatedAt": "2021-04-16T07:49:57.999Z",
        "createdAt": "2021-04-16T07:49:57.999Z",
        "image": null
    }
}
```
* Error Response
```
- Status: 400
- Response Body:
{
  errors: [
    <errors>
  ]
}
```

### GET /user/:id
```
Request Headers:
{
  access_token: Required | Token,
}
```


* Success Response
```
- Status: 200
- Response Body:
{
    "id": 1,
    "username": "pepi",
    "email": "pepi@gmail.com",
    "name": "pepi",
    "roles": "user",
    "image": null,
    "createdAt": "2021-04-16T07:49:57.999Z",
    "updatedAt": "2021-04-16T07:49:57.999Z"
}
```
* Error Response
```
- Status: 400
- Response Body:
{
  errors: [
    <errors>
  ]
}
```

### PUT /update-profile
```
Request Headers:
{
  access_token: Required | Token,
}
```

Request Body:
{
  username: Optional | String,
  email: Optional | String,
  name: Optional | String,
  image: Optional | String,
}
```


* Success Response
```
- Status: 200
- Response Body:
{
    "id": 1,
    "username": "pepi1",
    "email": "pepi@gmaill.com",
    "name": "pepi 2",
    "roles": "user",
    "image": null,
    "createdAt": "2021-04-16T07:49:57.999Z",
    "updatedAt": "2021-04-16T08:26:03.233Z"
}
```
* Error Response
```
- Status: 400
- Response Body:
{
  errors: [
    <errors>
  ]
}
```
```

### POST /favorites
```
Request Headers:
{
  access_token: Required | Token,
}
```

Request Body:
{
  garageId: Required | INT,
}
```


* Success Response
```
- Status: 200
- Response Body:
{
    "id": 2,
    "userId": 1,
    "garageId": 1,
    "updatedAt": "2021-04-16T10:30:59.486Z",
    "createdAt": "2021-04-16T10:30:59.486Z",
    "status": null
}
```
* Error Response
```
- Status: 400
- Response Body:
{
  errors: [
    <errors>
  ]
}

### GET /favorites
```
Request Headers:
{
  access_token: Required | Token,
}
```

* Success Response
```
- Status: 200
- Response Body:
[
    {
        "id": 2,
        "status": null,
        "createdAt": "2021-04-16T10:30:59.486Z",
        "updatedAt": "2021-04-16T10:30:59.486Z",
        "userId": 1,
        "garageId": 1,
        "Garage": {
            "id": 1,
            "name": "ASTRA",
            "image": null
        }
    }
]
```
* Error Response
```
- Status: 400
- Response Body:
{
  errors: [
    <errors>
  ]
}
```


### GET /favorites/:id
```
Request Headers:
{
  access_token: Required | Token,
}
```

* Success Response
```
- Status: 200
- Response Body:
{
    "id": 2,
    "status": null,
    "createdAt": "2021-04-16T10:30:59.486Z",
    "updatedAt": "2021-04-16T10:30:59.486Z",
    "userId": 1,
    "garageId": 1,
    "Garage": {
        "id": 1,
        "name": "ASTRA",
        "image": null
    }
}
```
* Error Response
```
- Status: 400
- Response Body:
{
  errors: [
    <errors>
  ]
}
```

### DELETE /favorites/:id
```
Request Headers:
{
  access_token: Required | Token,
}
```

* Success Response
```
- Status: 200
- Response Body:
{
    "message": "item successfully deleted"
}
```
* Error Response
```
- Status: 400
- Response Body:
{
  errors: [
    <errors>
  ]
}
```


### POST /transactions
```
Request Headers:
{
  access_token: Required | Token,
}
```

Request Body:
{
  garageId: Required | INT,
}
```


* Success Response
```
- Status: 200
- Response Body:
{
    "id": 2,
    "userId": 1,
    "garageId": 3,
    "date": "2021-04-16T16:12:11.547Z",
    "status": 0,
    "price": 0,
    "updatedAt": "2021-04-16T16:12:11.547Z",
    "createdAt": "2021-04-16T16:12:11.547Z"
}
```
* Error Response
```
- Status: 400
- Response Body:
{
  errors: [
    <errors>
  ]
}

### GET /transactions
```
Request Headers:
{
  access_token: Required | Token,
}
```

Request Body:
{
  garageId or userId : Required (choose one) | INT,
  status : Optional | INT
}
```

* Success Response
```
- Status: 200
- Response Body:
[
    {
        "id": 2,
        "date": "2021-04-16T16:12:11.547Z",
        "status": 0,
        "price": 0,
        "createdAt": "2021-04-16T16:12:11.547Z",
        "updatedAt": "2021-04-16T16:12:11.547Z",
        "garageId": 3,
        "userId": 1,
        "User": {
            "id": 1,
            "name": "pepi",
            "image": null
        },
        "Garage": {
            "id": 3,
            "name": "ASTRA",
            "image": null
        }
    }
]
```
* Error Response
```
- Status: 400
- Response Body:
{
  errors: [
    <errors>
  ]
}
```

```
### GET /transactions/:id
```
Request Headers:
{
  access_token: Required | Token,
}
```

* Success Response
```
- Status: 200
- Response Body:
{
    "id": 2,
    "date": "2021-04-16T16:12:11.547Z",
    "status": 0,
    "price": 0,
    "createdAt": "2021-04-16T16:12:11.547Z",
    "updatedAt": "2021-04-16T16:12:11.547Z",
    "garageId": 3,
    "userId": 1,
    "User": {
        "id": 1,
        "name": "pepi",
        "image": null
    },
    "Garage": {
        "id": 3,
        "name": "ASTRA",
        "image": null
    }
}
```
* Error Response
```
- Status: 400
- Response Body:
{
  errors: [
    <errors>
  ]
}
```

### PUT /transactions/:id
```
Request Headers:
{
  access_token: Required | Token,
}
```
```
Request Body:
{
  status : Required | INT
  price : Required | INT
  date : Optional | DATE
}
```

* Success Response
```
- Status: 200
- Response Body:
{
    "data": {
        "id": 2,
        "date": "2021-04-16T16:12:11.547Z",
        "status": 1,
        "price": 3000,
        "createdAt": "2021-04-16T16:12:11.547Z",
        "updatedAt": "2021-04-16T17:00:53.960Z",
        "garageId": 3,
        "userId": 1
    }
}
```
* Error Response
```
- Status: 400
- Response Body:
{
  errors: [
    <errors>
  ]
}
```

### POST /garage
```

Request Body:
{
  username: Required | STRING,
  password: Required | STRING,
  email: Required | STRING,
  name: Required | STRING,
  address: Required | STRING,
  description: Required | STRING,
}
```


* Success Response
```
- Status: 201
- Response Body:
{
    "success": true,
    "message": "Garage created",
    "data": {
        "id": 2,
        "name": "bengkel jaya",
        "status": 0,
        "address": "jakarta utara",
        "description": "Bengkel aman terpercaya",
        "image": "",
        "userId": 2,
        "updatedAt": "2021-04-17T03:54:06.505Z",
        "createdAt": "2021-04-17T03:54:06.505Z"
    }
}
```
* Error Response
```
- Status: 401
- Response Body:
{
  errors: [
    <errors>
  ]
}
```

### PUT /garage
```
Request Head:
{
  access_token: Required | Token,
}
```

Request Body:
{
  image: Required | STRING,
  name: Required | STRING,
  address: Required | STRING,
  description: Required | STRING,
}
```


* Success Response
```
- Status: 201
- Response Body:
{
    "id": 2,
    "name": "Bengkel jaya puol",
    "status": 0,
    "address": "surabaya",
    "image": null,
    "description": "Ini deskripsi baru",
    "createdAt": "2021-04-17T03:54:06.505Z",
    "updatedAt": "2021-04-17T03:55:58.961Z",
    "userId": 2
}
```
* Error Response
```
- Status: 401
- Response Body:
{
  errors: [
    <errors>
  ]
}
```
```

### GET /garage
```
Request Head:
{
  access_token: Required | Token,
}
```

* Success Response
```
- Status: 200
- Response Body:
{
    "id": 2,
    "name": "Bengkel jaya puol",
    "status": 0,
    "address": "surabaya",
    "image": null,
    "description": "Ini deskripsi baru",
    "createdAt": "2021-04-17T03:54:06.505Z",
    "updatedAt": "2021-04-17T03:55:58.961Z",
    "userId": 2
}
```
* Error Response
```
- Status: 400
- Response Body:
{
  errors: [
    <errors>
  ]
}
```
### POST /item
```

Request Body:
{
  name: Required | STRING,
  price: Required | INT,
}
```


* Success Response
```
- Status: 201
- Response Body:
{
    "success": true,
    "message": "Items created",
    "data": {
        "id": 5,
        "garageId": 2,
        "name": "sadel",
        "price": 2000,
        "status": 1,
        "updatedAt": "2021-04-17T03:59:59.064Z",
        "createdAt": "2021-04-17T03:59:59.064Z"
    }
}
```
* Error Response
```
- Status: 401
- Response Body:
{
  errors: [
    <errors>
  ]
}
```

### GET /item:id
```

Request Head:
{
  access_token: Required | Token,
}
```


* Success Response
```
- Status: 200
- Response Body:
{
    "id": 1,
    "name": "palu",
    "price": 2000,
    "status": 0,
    "createdAt": "2021-04-17T03:57:13.905Z",
    "updatedAt": "2021-04-17T03:57:13.905Z",
    "garageId": 2
}
```
* Error Response
```
- Status: 404
- Response Body:
{
  errors: [
    <errors>
  ]
}
```

### GET /item
```

Request Head:
{
  access_token: Required | Token,
}
```


* Success Response
```
- Status: 200
- Response Body:
[
    {
        "id": 4,
        "name": "ban",
        "price": 2000,
        "status": 1,
        "createdAt": "2021-04-17T03:59:53.523Z",
        "updatedAt": "2021-04-17T03:59:53.523Z",
        "garageId": 2
    },
    {
        "id": 5,
        "name": "sadel",
        "price": 2000,
        "status": 1,
        "createdAt": "2021-04-17T03:59:59.064Z",
        "updatedAt": "2021-04-17T03:59:59.064Z",
        "garageId": 2
    }
]
```
* Error Response
```
- Status: 404
- Response Body:
{
  errors: [
    <errors>
  ]
}
```

### PUT /item/:id
```
Request Head:
{
  access_token: Required | Token,
}
```

Request Body:
{
  name: Required | STRING,
  price: Required | INT,
}
```


* Success Response
```
- Status: 201
- Response Body:
{
    "id": 2,
    "name": "setrika",
    "price": 4000,
    "status": 1,
    "createdAt": "2021-04-17T03:59:20.157Z",
    "updatedAt": "2021-04-17T05:45:06.472Z",
    "garageId": 2
}
```
* Error Response
```
- Status: 401
- Response Body:
{
  errors: [
    <errors>
  ]
}
```
```

### PATCH /item/:id
```
Request Head:
{
  access_token: Required | Token,
}
```

* Success Response
```
- Status: 201
- Response Body:
{
    "id": 1,
    "name": "setrika",
    "price": 4000,
    "status": 0,
    "createdAt": "2021-04-17T03:57:13.905Z",
    "updatedAt": "2021-04-17T05:46:02.961Z",
    "garageId": 2
}
```
* Error Response
```
- Status: 401
- Response Body:
{
  errors: [
    <errors>
  ]
}
```
