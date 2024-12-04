// const path = require('path')
// const http = require('http')
// const express = require('express')
// const socketio = require('socket.io')

// const app = express()
// const server = http.createServer(app)
// const io = socketio(server)

// app.use(express.static(path.join(__dirname, 'public')))


// io.on('connection', socket =>{
//     console.log('New WS Connection..')
// })


// const PORT = 3000 || process.env.PORT

// server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

const express = require('express')
const app = express()
const PORT = 3000
const {createServer} = require('node:http')
const {Server} = require('socket.io')

const server = createServer(app)
const io = new Server(server,{
    cors:{
        origin: "http://localhost:5173"
    }
})

app.get('/', (req,res)=>{
    res.send('Tes kalimat pertama')
})

io.on("connection", (socket)=>{
    console.log('a user connected', socket.id)
    socket.emit("welcome", "Hello" + socket.id)

    if(socket.handshake.auth){
        console.log('username: ' + socket.handshake.auth.username)
    }

    socket.on("message:new", (message)=>{
        io.emit("message:update", {
            from: socket.handshake.auth.username,
            message
        })
    })
})

server.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`)
})