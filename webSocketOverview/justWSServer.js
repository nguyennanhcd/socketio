// http is core node module
const http = require('http')

// ws is a 3rd party library
const websocket = require('ws')

const server = http.createServer((req, res) => {
  res.end('WebSocket Server')
})

const wss = new websocket.WebSocketServer({ server: server })

// wss.on('headers', (headers, req) => {
//   console.log(headers)
// })

wss.on('connection', (ws, req) => {
  ws.send('Hello from WebSocket Server!')
  ws.on('message', (message) => {
    console.log('Received message:', message.toString())
  })
})
server.listen(8000)
