const setup = {
    ssl: false,
    port: 9000
}
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');
const definedServerProtocol = setup.ssl ? require('https') : require('http');
let server;

/**
 * Server implementation
 */

if (setup.ssl) {
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/tictactoe.savayer.me/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/tictactoe.savayer.me/fullchain.pem', 'utf8');
    const credentials = { key: privateKey, cert: certificate };
    server = definedServerProtocol.createServer(credentials, app);
} else {
    server = definedServerProtocol.createServer(app);
}

app.use('/', express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});


server.listen(setup.port, () => {
    console.log("server starting on port: %s", setup.port)
});


/**
 * WebSocket implementation
 */
const wsServer = new WebSocket.Server({
    server: server
});

const clientsStorage = []
let data = {}
const sendInfoToANewUserAboutOldUsers = () => {
    const client = clientsStorage[clientsStorage.length-1];
    for (let i = 0; i < clientsStorage.length-1; i++) {
        const clientsData = {
            userId: clientsStorage[i].userId,
            username: clientsStorage[i].username,
            type: 'user',
            amount: wsServer.clients.size
        }
        client.send(JSON.stringify(clientsData));
    }
}
const sendAll = (data) => {
    sendInfoToANewUserAboutOldUsers();
    for (let client of clientsStorage) {
        client.send(JSON.stringify(data))
    }
}

wsServer.on('connection', (ws, req) => {
    ws.userId = req.headers['sec-websocket-key'];
    ws.username = `user-${ws.userId.substr(0, 6)}`;
    clientsStorage.push(ws)
    data = {
        userId: ws.userId,
        username: ws.username,
        type: 'user',
        amount: wsServer.clients.size
    }
    sendAll(data);

    ws.on('message', data => {
        wsServer.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                const parsedData = JSON.parse(data);
                if (parsedData.type === 'edit-username') {                    
                    const index = clientsStorage.findIndex(clientData => clientData.userId === parsedData.userId)
                    if (index >= 0) {
                        clientsStorage[index].username = parsedData.username
                    }
                }
                client.send(data);
            }
        })
    })

    ws.on('close', () => {
        data = {
            type: 'remove-user',
            amount: wsServer.clients.size
        }
        sendAll(data)
    })
})