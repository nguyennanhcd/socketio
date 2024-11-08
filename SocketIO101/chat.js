const express = require('express')
const app = express()
const socketio = require('socket.io')
// this is how the docs do it
// import { Server } from 'socket.io'

app.use(express.static(__dirname + '/public'))

const expressServer = app.listen(8001)
// io = the server object in the docs
const io = socketio(expressServer, {
  path: '/bad-path',
  transports: ['polling', 'websocket'],
  allowUpgrade: true
  // cors: {
  //   origin: ['https://example.com', 'https://dev.example.com'],
  //   allowedHeaders: ['my-custom-header'],
  //   credentials: true
  // }
})

io.on('connection', (socket) => {
  console.log(socket.id + ' has connected')
  // in web socket we use send method but in socket.io, we use emit
  //   socket.emit('MessageFromServer', { data: 'Welcome to socket server' })
  socket.on('messageFromClient', (dataFromClient) => {
    console.log('Data: ', dataFromClient)
    io.emit('messageFromServer', {
      text: 'Received from client: ' + dataFromClient.text
    })
  })
})
