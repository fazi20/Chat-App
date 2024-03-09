const io = require('socket.io')(3000, {

    cors:{
        origin: "*"
    }
})
// const express = require('express')
// const app = express()
const users = {};
// const cors = require ('cors')

// app.use(cors({

//     origin: "http://localhost:3000"
// }))

io.on('connection', socket => {
    socket.on('new-user-joined', user => {
       
        users[socket.id] = user;
        socket.broadcast.emit('user-joined', user);
    })
    socket.on('send', message => {

        socket.broadcast.emit('receive', {
            message: message,
            name: users[socket.id]
        })
    })
    socket.on('disconnect', message => {

        socket.broadcast.emit('left', users[socket.id] )
    })

})