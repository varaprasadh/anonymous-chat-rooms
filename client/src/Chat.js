import React, { useState,useRef} from 'react';
import NavBar from "./components/NavBar";
import ChatView from "./views/ChatView";
import "./app.css";
import socketio from 'socket.io-client';
import {useEffect} from 'react';

import Message from "./components/Message"
import {InfoMessage,WarnMessage} from "./components/MessageUtils";


function Chat() {
  const dummyMessages=[{
    type:"NORMAL",
    username:"varaprasadh",
    time:"12:01 PM",
    id:"123",
    content:"that would be fun"
  }]
  /*
    username: user.username,
    id: user.id,
    time: moment().format("h:mm a"),
    type: parseType,
    content: data,
    isSelf: false
  */
  //array of jsx

  const [messages, setMessages] = useState([]);
  const [roomInfo,setRoomInfo]=useState({});
  const socket=useRef();
  const emitMessage=(data)=>{
    socket.current.emit('MESSAGE', {type:"RAW",data});
  }
  useEffect(() => {
    let urlparams=new URLSearchParams(window.location.search);
    let username=urlparams.get('username');
    let room=urlparams.get('room');
    //console.log(username,room,"yes");
    socket.current=socketio("http://localhost:3001");
    socket.current.on('connect',()=>{
        socket.current.emit('JOIN_ROOM',{username,room});
        socket.current.on('MESSAGE',(data)=>{
            setMessages(messages=>[...messages,<Message key={messages.length} message={data}/>])
        });
        socket.current.on('NEW_USER',msg=>{ 
            setMessages(messages=>[...messages,<InfoMessage key={messages.length} message={msg}/>])
        })
        socket.current.on('WELCOME',msg=>{ 
            setMessages(messages=>[...messages,<InfoMessage key={messages.length} message={msg}/>])
        })
        socket.current.on('EXIT',msg=>{
            setMessages(messages=>[...messages,<WarnMessage key={messages.length} message={msg}/>])
        });
        socket.current.on('ROOM_INFO',info=>{
          setRoomInfo(prev=>({...prev,...info}))
        });
        socket.current.on('ACCESS_DENIED', () => {
          //route to main screen
          // alert("you dont have access");
        })
    })
    return () => {
      socket.current.close();
    }
  }, []);
  // useEffect(()=>{
      
  // },{messages})
  return (
    <div id="app">
      <ChatView emitMessage={emitMessage} roomInfo={roomInfo} messages={messages}/>
    </div>
  );
}

export default Chat;
