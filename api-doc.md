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
  username: Required | String,
  email: Required | String,
  name: Required | String,
  name: Required | String,
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
