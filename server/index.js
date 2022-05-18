const express = require('express');
const WebSocket = require('ws');


const app = express();
const PORT = process.env.PORT || 4000;
const wss = new WebSocket.Server({ port: 4001 });
const CLIENTS = [];
let id;

app.listen(PORT, () => console.log(`listening to requests on port ${PORT}`));

wss.on('connection', function connection(ws) {
  id = Math.random();
  console.log('connection is established : ' + id);
  CLIENTS[id] = ws;
  CLIENTS.push(ws);


  ws.on('message', function incoming(message) {
    console.log('received:', JSON.parse(message));
    sendAll(message);
    // wss.send(message);
  });
});

const sendAll = message => {
  CLIENTS.forEach(client => client.send(message));
}


app.use(express.static('App.js'));


