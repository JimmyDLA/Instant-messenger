const express = require('express');
const WebSocket = require('ws');


const app = express();
const PORT = process.env.PORT || 4000;
const wss = new WebSocket.Server({ port: 4001 }); 

app.listen(PORT, () => console.log(`listening to requests on port ${PORT}`));

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send('messaged confirmed');
  });
});


app.use(express.static('App.js'));


