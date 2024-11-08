const express = require('express')
const app = express()
const socketio = require('socket.io')

app.use(express.static(__dirname + '/public'))

const expressServer = app.listen(8000)
const io = socketio(expressServer)

// socket here is the thing that just connected on out server
io.on('connection', (socket) => {
  console.log(socket.id + ' has connected')
  // in web socket we use send method but in socket.io, we use emit
  socket.emit('MessageFromServer', { data: 'Welcome to socket server' })
  socket.on('messageFromClient', (msg) => {
    console.log('Received message from client:', msg)
  })
})
