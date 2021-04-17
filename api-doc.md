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
```
Request Body:
{
  username: Optional | String,
  email: Optional | String,
  name: Optional | String,
  image: Optional | String,
}
```
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

### PATCH /transactions/:id
```
Request Headers:
{
  access_token: Required | Token,
}
```
Request Body:
{
  status : Required | INT
}
```

* Success Response
```
- Status: 200
- Response Body:
{
    "msg": "Status Updated!"
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
