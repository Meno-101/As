/**
 * Assignment #1
 */

const http = require('http')
const url = require('url')
const config = require('./config')

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true)

  const { query, pathname } = parsedUrl

  const absolutePath = pathname.replace(/^\/+|\/+$/g, '');

  const routeHolder = router[absolutePath] ? router[absolutePath] : router.notFound

  routeHolder({ accumulator: Number(query.accumulator) + 1 }, (statusCode, payload) => {

    const resStatusCode = typeof statusCode === 'number' ? statusCode : 200
    const resPayload = typeof payload === 'object' ? payload : {}

    const payloadStringified = JSON.stringify(resPayload)

    res.setHeader('Content-Type', 'application/json');
    res.writeHead(resStatusCode);
    res.end(payloadStringified);

  })
})

server.listen(config.httpPort, () => console.log('hello there!'))

const handlers = {}

handlers.ping = (data, callback) => {
  callback(200, { ok: true })
}

handlers.plusOne = (data, callback) => {
  callback(200, data)
}

handlers.notFound = (data, callback) => {
  callback(404, { ok: false })
}

const router = {
  ping: handlers.ping,
  plusOne: handlers.plusOne,
  notFound: handlers.notFound,
}
