const express = require('express')
const http = require('http')
const socketio = require('socket.io')

PORT = 3000
const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static('public'))

io.on('connection', (socket) => {
    console.log('someone has connected to the websocket');
    (function() {
        var date = new Date()
        let message = {
                from: '',
                text: 'user has connected',
                createdAt: date.getHours() + ' : ' + date.getMinutes()
            }
            // broacdcast when user connects
        socket.broadcast.emit('message', message)
    })();


    // listening for chat msg

    socket.on('chatMessage', (message) => {
        console.log(message)
        var date = new Date()
        message.createdAt = date.getHours() + ' : ' + date.getMinutes()
        io.emit('message', message)
    })

    socket.on('disconnect', () => {
        var date = new Date()
        let message = {
                from: '',
                text: 'user has disconnected',
                createdAt: date.getHours() + ':' + date.getMinutes()
            }
            // broacdcast when user connects

        io.emit('message', message)
    })
})

server.listen(PORT, () => console.log(`listening to port ${PORT}`))