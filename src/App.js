import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import './App.css';

function App() {
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState({});

  useEffect(() => {
    setSocket(new WebSocket('ws://localhost:4001/'));
    console.log('socket mounted ');
  }, [])

  // socket.onopen = function (e) {

  // };

  socket.onmessage = function (event) {
    const data = JSON.parse(event.data);
    createMessageElement(data);
  };

  socket.onclose = function (event) {
    if (event.wasClean) {
      alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
      alert('[close] Connection died');
    }
  };

  socket.onerror = function (error) {
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
    if (message.length) {
      socket.send(JSON.stringify({ 'message': message, 'user': user ? user : 'unknown' }));
      setMessage('');
    } else {
      alert('Please enter a message');
    }
  }

  const handleUserChange = e => {
    setUser(e.target.value);
  }

  const handleMessageChange = e => {
    setMessage(e.target.value);
  }

  const handleSendOnEnter = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  }

  return (
    <div id="chatContainer">
      <div id="chatWindow">
        <div id="output" />
        <input
          id="user"
          type="text"
          value={user}
          placeholder="User Name"
          onChange={handleUserChange}
        />
        <input
          id="message"
          type="text"
          value={message}
          placeholder="Message"
          onChange={handleMessageChange}
          onKeyUp={handleSendOnEnter}
        />
        <Button id="send" variant="contained" color="primary" onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
}


export default App;
