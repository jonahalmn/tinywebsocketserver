const express = require('express')
const http = require('http')
const app = express()

//initialize a simple http server
const server = http.createServer(app);

const WebSocket = require('ws')

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

let CLIENTS = []

wss.on('connection', (ws) => {

    //connection is up, let's add a simple simple event
    CLIENTS.push(ws)

    ws.on('message', (message) => {

        CLIENTS.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(message);
              
            }
          });
    });

    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, I am a WebSocket server');
});

//start our server
server.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});