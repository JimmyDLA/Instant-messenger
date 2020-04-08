import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import './App.css';

function App() {
  const [user, setUser] = useState();
  const [message, setMessage] = useState();
  const [socket, setSocket] = useState({});

  useEffect(() => {
    setSocket(new WebSocket('ws://localhost:4001/'));
    console.log('socket mounted ');
  }, [])

    socket.onopen = function(e) {

    };
    
    socket.onmessage = function(event) {
      const data = JSON.parse(event.data);
      createMessageElement(data);
    };
    
    socket.onclose = function(event) {
      if (event.wasClean) {
        alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        alert('[close] Connection died');
      }
    };
    
    socket.onerror = function(error) {
      alert(`[error] ${error.message}`);
    };

  const createMessageElement = data => {
    const parent = document.getElementById('output');
    const messageView = `
      <div id="">
        <p><strong>${data.user}:</strong>
        ${data.message}</p>
      </div>
      `;
    parent.innerHTML += messageView;
  }

  const handleSend = () => {
    socket.send(JSON.stringify({ 'message': message , 'user': user }));
    setMessage('');
  }

  const handleUserChange = e => {
    setUser(e.target.value);
  }

  const handleMessageChange = e => {
    console.log(e.target.value)
    setMessage(e.target.value);
  }

  return (
    <div id="chatContainer">
      <div id="chatWindow">
        <div id="output">

        </div>
        <input id="user" type="text" placeholder="User Name" value={user} onChange={handleUserChange} />
        <input id="message" type="text" placeholder="Message" value={message} onChange={handleMessageChange} />
        <Button id="send" variant="contained" color="primary" onClick={handleSend}>
          Send
        </Button>      
      </div>
    </div>
  );
}

export default App;
