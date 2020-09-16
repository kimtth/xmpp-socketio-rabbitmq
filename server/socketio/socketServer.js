const socketIo = require("socket.io");

const people = {};
const sockmap = {};
const messageque = {};

const socketServer = function (server) {
    const io = socketIo(server);
    const port = 8080;
    server.listen(port, () => {
        console.log(`Listening on (Socket.io) ${ port }`)
    })

    io.on('connection', (socket) => {
        socket.emit('health_check', 'socket.io--connected');

        socket.on("join", (nick, room) => {
            socket.join(room);
            //const id=stringHash(nick);
            if (!people.hasOwnProperty(room)) {
                people[room] = {};
            }

            people[room][socket.id] = {
                nick: nick,
                id: socket.id
            };
            sockmap[socket.id] = {
                nick: nick,
                room: room
            }
            if (messageque.hasOwnProperty(room)) {
                for (i = 0; i < messageque[room].length; i++) {
                    io.to(room).emit('message-que', messageque[room][i].nick, messageque[room][i].msg);
                }
            }
            if (room == '') {
                socket.emit("update", "You have connected to the default room.");
            } else {
                socket.emit("update", `You have connected to room ${room}.`);
                socket.emit("people-list", people[room]);
                socket.to(room).broadcast.emit("add-person", nick, socket.id);
                console.log(nick);
                socket.to(room).broadcast.emit("update", `${nick} has come online. `);
            }
        });

        socket.on('chat-message', (msg, room) => {
            io.to(room).emit('chat-message', people[room][socket.id].nick, msg);
            if (!messageque.hasOwnProperty(room)) {
                messageque[room] = []
            }
            messageque[room].push({
                nick: people[room][socket.id].nick,
                msg: msg
            })
            if (messageque[room].length > 50)
                messageque[room].shift()
        });

        socket.on('disconnect', () => {
            if (sockmap[socket.id]) {
                const room = sockmap[socket.id].room;
                socket.to(room).broadcast.emit("update", `${sockmap[socket.id].nick} has disconnected. `);
                io.emit("remove-person", socket.id);
                delete people[room][socket.id];
                delete sockmap[socket.id];
            }
        });
    });
}

module.exports = {
    socketServer
}