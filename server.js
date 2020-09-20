const http = require('http');
const socketio = require('socket.io')

const server = http.createServer((req, res) => {
    res.end("Hello Client Site")
})

server.listen(3000, () => {
    console.log("Server ishga tushdi");
})

const io = socketio.listen(server)

io.sockets.on('connection', socket => {
    console.log("Foydalanuvchi boglandi!!!");

    socket.on('salom ber', (data) => {
        console.log("Hello World");
        console.log(data.name);
        console.log(data.job);
    })

    socket.on('new-user', (data) => {
        console.log(data.name);
    })

    // setTimeout(() => {
    //     socket.emit('yashil yolak')
    // }, 1000);

    setTimeout(() => {
        socket.emit('yashil yolak', {city: 'Toronto'})
    }, 1000);

    // setInterval(() => {
    //     socket.emit('sariq yolak')
    // }, 15000);

    socket.on('disconnect', () => [
        console.log("Foydalanuvchi tark etdi!!!")
    ])
})