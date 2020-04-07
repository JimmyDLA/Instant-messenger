import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
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
      socket.send("My name is John");
    };
    
    socket.onmessage = function(event) {
      alert(`[message] Data received from server: ${event.data}`);
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


  const send = () => {
    socket.send({ message, user });
    setMessage('');
  }

  const handleUserChange = e => {
    console.log(e.target.value)
    setUser(e.target.value);
  }

  const handleMessageChange = e => {
    console.log(e.target.value)
    setMessage(e.target.value);
  }

  console.log('render');
  

  return (
    <div id="chatContainer">
      <div id="chatWindow">
        <div id="output">

        </div>
        <input id="user" type="text" placeholder="User Name" onChange={handleUserChange} />
        <input id="message" type="text" placeholder="Message" onChange={handleMessageChange} />
        <button id="send" onClick={(e) => send(e)} >Send</button>
      </div>
    </div>
  );
}

export default App;
