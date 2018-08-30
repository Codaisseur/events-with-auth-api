# Events API with login

This is a simple testing-API based on [JSON-server](https://github.com/typicode/json-server) with a hard-coded JWT authencation mechanism. 

You can authenticate using **admin@example.com** and **secret** as email, password:

```bash
$ http :4000/logins email=admin@example.com password=secret
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Content-Length: 151
Content-Type: application/json; charset=utf-8

{
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJJZCI6MX0sImlhdCI6MTUzNTYzMjYzM30.aEs2eS-5z-GlfXgA2UTkTYTsz-eulJG-bsMhAFUEDiM"
}
```

Any normal route is blocked:

```bash
$ http :4000/events
HTTP/1.1 401 Unauthorized
Access-Control-Allow-Credentials: true
Content-Length: 68
Content-Type: application/json; charset=utf-8

{
   "message": "You need to be authenticated to access this route"
}
```

And can be accessed using the JWT:

```js
$ http :4000/events/1 Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJJZCI6MX0sImlhdCI6MTUzNTYzMjYzM30.aEs2eS-5z-GlfXgA2UTkTYTsz-eulJG-bsMhAFUEDiM"
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Content-Length: 31
Content-Type: application/json; charset=utf-8

{
    "id": 1,
    "name": "test"
}
```

Make sure you put some data in **db.json** (this filename is hardcoded).

