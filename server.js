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
 * socket
 */
const wsServer = new WebSocket.Server({
    server: server
});

const clients = []
let data = {}
const sendAll = (data, clients) => {
    for (let client in clients) {
        clients[client].send(JSON.stringify(data));
    }    
}

wsServer.on('connection', (ws, req) => {
    ws.id = req.headers['sec-websocket-key'];
    clients.push(ws);
    data.type = 'user';  
    data.userId = ws.id;
    data.username = `user-${ws.id.substr(0, 6)}`;
    data.message = wsServer.clients.size;
    sendAll(data, clients);

    ws.on('message', data => {
        wsServer.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        })
    })

    ws.on('close', () => {
        data.type = 'user';  
        data.message = wsServer.clients.size;
        sendAll(data, clients);
    })
    data = {
        type: 'system',
        message: 'Welcome to NodeJS Chat'
    }
    ws.send(JSON.stringify(data));
})