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

    socket.on('edit-username', data => {
        const index = clientsStorage.findIndex(clientData => clientData.id === data.userId)
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
        const index = clientsStorage.findIndex(clientData => clientData.id === socket.id)
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