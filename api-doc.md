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
### PATCH /upload-avatar
```
Request Headers:
{
  access_token: Required | Token,
}
```
```
Request Body:
{
  image: Required | File
}
```


* Success Response
```
- Status: 200
- Response Body:
{
  avatar: <link avatar>,
  message: 'avatar successfully updated'
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

### POST /favorites
```
Request Headers:
{
  access_token: Required | Token,
}
```
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
```

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
    "description: "",
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
```

### GET /transactions
```
Request Headers:
{
  access_token: Required | Token,
}
```

Request Queries:
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
        "description: "",
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
    "description: "",
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
  description: Optional | STRING
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
        "description: "",
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


### GET /chats/:id_target
```
Request Headers:
{
  access_token: Required | Token,
}
```
```
NOTES :
id_target = if the account logged in as a garage, then fill id_target with the id of the user that chatted with the account, otherwise, fill it with garageId 
```

* Success Response
```
- Status: 200
- Response Body:
[
    {
        "id": 2,
        "message": "ada yang bisa saya bantu ?",
        "status": null,
        "createdAt": "2021-04-18T05:16:32.301Z",
        "updatedAt": "2021-04-18T05:16:32.301Z",
        "transactionId": 1,
        "userId": null,
        "garageId": 1,
        "User": null,
        "Garage": {
            "id": 1,
            "name": "astra",
            "image": null
        }
    },
    {
        "id": 1,
        "message": "halo",
        "status": null,
        "createdAt": "2021-04-18T05:14:18.570Z",
        "updatedAt": "2021-04-18T05:14:18.570Z",
        "transactionId": 1,
        "userId": 1,
        "garageId": null,
        "User": {
            "id": 1,
            "name": "pepi",
            "image": null
        },
        "Garage": null
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
### GET /chats/
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
        "id": 3,
        "status": 1,
        "createdAt": "2021-04-20T07:17:26.239Z",
        "updatedAt": "2021-04-20T07:17:26.239Z",
        "userId": 1,
        "garageId": 2,
        "Chats": [
            {
                "id": 16,
                "message": "bg",
                "sender": "user",
                "status": null,
                "createdAt": "2021-04-20T07:20:25.338Z",
                "updatedAt": "2021-04-20T07:20:25.338Z",
                "userId": 1,
                "garageId": 2,
                "userChatId": 3,
                "User": {
                    "id": 1,
                    "name": "pepi",
                    "image": "https://i.imgur.com/YDVsbQZ.jpg"
                },
                "Garage": {
                    "id": 2,
                    "name": "astra",
                    "status": 1,
                    "address": "rumah",
                    "image": null,
                    "description": null,
                    "createdAt": "2021-04-18T05:13:24.090Z",
                    "updatedAt": "2021-04-18T05:13:24.090Z",
                    "userId": 2
                }
            }
        ],
        "User": {
            "id": 1,
            "name": "pepi",
            "image": "https://i.imgur.com/YDVsbQZ.jpg"
        },
        "Garage": {
            "id": 2,
            "name": "astra",
            "status": 1,
            "address": "rumah",
            "image": null,
            "description": null,
            "createdAt": "2021-04-18T05:13:24.090Z",
            "updatedAt": "2021-04-18T05:13:24.090Z",
            "userId": 2
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

### POST /chats/:id_target
```
Request Headers:
{
  access_token: Required | Token,
}
```

NOTES :
id_target = if the account logged in as a garage, then fill id_target with the id of the user that chatted with the account, otherwise, fill it with garageId 
```

Request Body:
{
  message: Required | String
}
```

* Success Response
```
- Status: 200
- Response Body:
{
    "id": 2,
    "transactionId": 1,
    "message": "ada yang bisa saya bantu ?",
    "garageId": 1,
    "updatedAt": "2021-04-18T05:16:32.301Z",
    "createdAt": "2021-04-18T05:16:32.301Z",
    "status": null,
    "userId": null
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

### DELETE /chats/:id
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

### GET /reviews/
```
Request Headers:
{
  access_token: Required | Token,
}
```
```
Request Params:
{
  user: Optional | INT | User ID,
  garage: Optional | INT | Garage ID,
}
```

* Success Response
```
- Status: 200
- Response Body:
[
    {
        "id": 4,
        "message": "gajadi mantep bg",
        "score": 6,
        "createdAt": "2021-04-20T13:06:47.022Z",
        "updatedAt": "2021-04-20T13:08:35.077Z",
        "userId": 1,
        "transactionId": 1,
        "Transaction": {
            "id": 1,
            "date": "2021-04-18T05:13:54.003Z",
            "status": 0,
            "price": 0,
            "description": null,
            "isReviewed": 1,
            "createdAt": "2021-04-18T05:13:54.003Z",
            "updatedAt": "2021-04-20T13:06:47.011Z",
            "garageId": 2,
            "userId": 1
        },
        "User": {
            "id": 1,
            "username": "pepi",
            "password": "$2b$08$.swECkkO/UyXsyXaZ8Gswui7f30NmanebNbmS3QRNJJ74l/Sdm.Ea",
            "email": "pepi@gmail.com",
            "name": "pepi",
            "roles": "user",
            "image": "https://i.imgur.com/YDVsbQZ.jpg",
            "createdAt": "2021-04-18T05:11:57.787Z",
            "updatedAt": "2021-04-19T04:06:42.585Z"
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
### GET /reviews/:id
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
    "id": 4,
    "message": "gajadi mantep bg",
    "score": 6,
    "createdAt": "2021-04-20T13:06:47.022Z",
    "updatedAt": "2021-04-20T13:08:35.077Z",
    "userId": 1,
    "transactionId": 1,
    "Transaction": {
        "id": 1,
        "date": "2021-04-18T05:13:54.003Z",
        "status": 0,
        "price": 0,
        "description": null,
        "isReviewed": 1,
        "createdAt": "2021-04-18T05:13:54.003Z",
        "updatedAt": "2021-04-20T13:06:47.011Z",
        "garageId": 2,
        "userId": 1,
        "Garage": {
            "id": 2,
            "name": "astra",
            "status": 1,
            "address": "rumah",
            "image": null,
            "description": null,
            "createdAt": "2021-04-18T05:13:24.090Z",
            "updatedAt": "2021-04-18T05:13:24.090Z",
            "userId": 2
        }
    },
    "User": {
        "name": "pepi",
        "id": 1,
        "image": "https://i.imgur.com/YDVsbQZ.jpg",
        "email": "pepi@gmail.com"
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

### POST /reviews/:transaction_id
```
Request Headers:
{
  access_token: Required | Token,
}

Request Body:
{
  message: Required | String
  score: Required | INT
}
```

* Success Response
```
- Status: 200
- Response Body:
{
    "id": 2,
    "transactionId": 1,
    "message": "ada yang bisa saya bantu ?",
    "garageId": 1,
    "updatedAt": "2021-04-18T05:16:32.301Z",
    "createdAt": "2021-04-18T05:16:32.301Z",
    "status": null,
    "userId": null
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

### PATCH /garage/upload-avatar
```
Request Headers:
{
  access_token: Required | Token,
}
```
```
Request Body:
{
  image: Required | File
}
```


* Success Response
```
- Status: 200
- Response Body:
{
  avatar: <link avatar>,
  message: 'avatar successfully updated'
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