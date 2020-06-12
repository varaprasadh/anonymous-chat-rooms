import React, { useState } from 'react';
import NavBar from "./components/NavBar";
import ChatView from "./views/ChatView";
import "./app.css";
import socketio from 'socket.io-client';
import {useEffect} from 'react'
function App() {
  const [messages,setMessages]=useState([]);
  
  useEffect(() => {
    const socket=socketio("http://localhost:3001");
    // let room=prompt("roomanem");
    // let username=prompt("username");
    // socket.emit("JOIN_ROOM",{room,username});
    // socket.on('NEW_USER',data=>console.log(data));
    // socket.on('LEAVE_ROOM', data => console.log(data));
    // socket.on('welcome',data=>console.log(data));

    return () => {
      socket.close();
    }
  }, [])
  return (
    <div id="app">
      <NavBar/>
      <ChatView messages={messages}/>
    </div>
  );
}

export default App;
