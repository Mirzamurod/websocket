const http = require('http');
const socketio = require('socket.io');

const server = http.createServer((req, res) => {
    res.end('Hello Client Site');
});

server.listen(3000, () => {
    console.log('Server ishga tushdi');
});

const io = socketio.listen(server);

io.on('connection', socket => {

    socket.join('room 1')
    socket.join('room 2')
    socket.join('room 3', () => {
        const rooms = Object.keys(socket.rooms)
        console.log(rooms);
    })

    socket.on('joinRoom', data => {
        socket.join(data.name, () => {
            io.to(data.name).emit('newJoin', { count: gOC(io, data) });
            socket.emit('join', { massage: 'Xonaga kirdingiz!!!' })
            const rooms = Object.keys(socket.rooms)
            console.log(rooms);
            console.log('Kimdir xonaga kirdi');
        });
    });

    socket.on('leaveRoom', data => {
        socket.leave(data.name, () => {
            io.to(data.name).emit('leavedRoom', { count: gOC(io, data) })
            socket.emit('leaved room', { massage: 'Xonadan chiqdingiz!!!' })
            const rooms = Object.keys(socket.rooms)
            console.log(rooms);
        })
    })
});

const gOC = (io, data) => {
    const room = io.sockets.adapter.rooms[data.name]
    return room ? room.length : 0
}
// const nsp = io.of('/chat')

// nsp.on('connection', (socket) => {
//     console.log("Kimdir Boglandi!!!");

//     // socket.on('ism yoz', () => {
//     //     nsp.emit('hammaga jonat', { name: 'Nmadr' })
//     // })
// })
// io.sockets.on('connection', socket => {
//     console.log("Foydalanuvchi boglandi!!!");

// socket.on('salom ber', (data) => {
//     console.log("Hello World");
//     console.log(data.name);
//     console.log(data.job);
// })

// socket.on('new-user', (data) => {
//     console.log(data.name);
// })

// setTimeout(() => {
//     socket.emit('yashil yolak')
// }, 1000);

// setTimeout(() => {
//     socket.emit('yashil yolak', {city: 'Toronto'})
// }, 1000);

// setInterval(() => {
//     socket.emit('sariq yolak')
// }, 15000);

// socket.on('disconnect', () => [
//     console.log("Foydalanuvchi tark etdi!!!")
// ])

// socket.on('new-user', (data) => {
//     socket.broadcast.emit('user',  { name: data.name })
// })
// })
