const port = 9000;
const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

app.use('/', express.static(__dirname + '/dist'));

server.listen(port, () => {
    console.log('server started on port %s', port)
});

/**
 * WebSocket implementation
 */
const clientsStorage = [];
let data = [];

const sendInfoToANewUserAboutOldUsers = data => {
    const client = clientsStorage[clientsStorage.length - 1];
    for (let i = 0; i < clientsStorage.length - 1; i++) {
        const clientsData = {
            userId: clientsStorage[i].id,
            username: clientsStorage[i].username,
            amount: io.engine.clientsCount
        }
        if (data.type === 'remove-user') {
            client.emit(data.type, data)
        } else {
            client.emit(data.type, clientsData)
        }
    }
}

const broadcast = (data) => {
    sendInfoToANewUserAboutOldUsers(data);
    for (let client of clientsStorage) {
        client.emit(data.type, data)
    }
}

const findIndex = findingIndex => {
    return clientsStorage.findIndex(clientData => clientData.id === findingIndex)
}

io.on('connection', socket => {
    const userId = socket.id;
    socket.username = `user-${userId.substr(0, 6)}`;
    clientsStorage.push(socket)
    
    data = {
        type: 'add-new-user',
        userId,
        username: socket.username,
        amount: io.engine.clientsCount
    }
    broadcast(data);

    socket.on('invite-user', data => {
        io.to(data.invitedUserId).emit('getting-invite', data)
    })

    socket.on('user-declined-invite', data => {
        io.to(data.currentUserId).emit('info', `${data.invitedUsername} declined your invite`)
    })

    socket.on('game-prepare', data => {
        //socket.emit('info', 'мутим комнату для игры')
        const roomName = data.currentUserId + '___' + data.invitedUserId
        const invitedUser = clientsStorage[findIndex(data.invitedUserId)]
        const currentUser = clientsStorage[findIndex(data.currentUserId)]
        if (invitedUser && currentUser) {
            invitedUser.join(roomName)
            currentUser.join(roomName)
            //console.log(invitedUser.adapter.rooms)
            const startGame = {
                ...data,
                message: 'Well, let\'s start the game',
                your_turn: false,
                roomName
            }
            invitedUser.emit('game-start', startGame)
            currentUser.emit('game-start', {
                ...startGame,
                your_turn: true
            })
        }

    })

    socket.on('game-step', data => {
        io.to(data.userId).emit('game-step-client', data)
    })

    socket.on('game-finish', data => {
        io.to(data.userId).emit('game-finish-client', data)
    })

    socket.on('edit-username', data => {
        const index = findIndex(data.userId);
        if (index >= 0) {
            clientsStorage[index].username = data.username;
            broadcast({
                type: 'edit-username',
                userId: clientsStorage[index].id,
                username: data.username,
                amount: io.engine.clientsCount
            })
        }
    })

    socket.on('disconnect', () => {
        const index = findIndex(socket.id);
        if (index >= 0) {
            clientsStorage.splice(index, 1)
            broadcast({
                type: 'remove-user',
                amount: io.engine.clientsCount,
                userId: socket.id
            })
        }
    })
});