const express = require('express');
const WebSocket = require('ws');


const app = express();
const server = app.listen(4000, () => {
  console.log('listening to requests on port 4000');
})

const wss = new WebSocket.Server({ port: 4001 }); 

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});


app.use(express.static('App.js'));

// const io = socket(server);

// io.on('connection', () => {
//   console.log('made socket connection ', socket.id);
// })

