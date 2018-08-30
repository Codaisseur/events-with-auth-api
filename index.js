const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const jwt = require('jsonwebtoken')
const jwtSecret = 'hjdiHUbxmmzif98udfgsihou8(&)^*#fgbli'
const bodyParser = require('body-parser')

server.use(middlewares)
server.use(bodyParser.json())

server.post('/logins', (req, res) => {
  if (req.body.email === 'admin@example.com' && req.body.password === 'secret') {
    res.send({
      jwt: jwt.sign({userId: 1}, jwtSecret, {expiresIn: '2h'})
    })
  }
  else {
    res.status(400).send({
      message: 'Invalid email/password credentials'
    })
  }
})

server.use((req, res, next) => {
  const header = req.headers.authorization
  if (header && header.startsWith('Bearer ')) {
    const [, token] = header.split(' ')
    const info = jwt.verify(token, jwtSecret)
    req.user = { id: info.userId }
    next()
  }
  else {
    res.status(401).send({
      message: 'You need to be authenticated to access this route'
    })
  }
})

server.use(router)
server.listen(4000, () => {
  console.log('Events API with authentication running on port 4000')
})
