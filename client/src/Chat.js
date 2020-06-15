import React, { useState,useRef} from 'react';
import ChatView from "./views/ChatView";
import socketio from 'socket.io-client';
import {useEffect} from 'react';

import Message from "./components/Message"
import {InfoMessage,WarnMessage} from "./components/MessageUtils";
import {useHistory,} from 'react-router-dom';

import Action from "./components/Action";


function Chat() {

  //array of jsx
  const history = useHistory();
  const [messages, setMessages] = useState([]);
  const [roomInfo,setRoomInfo]=useState({});
 
  const [action,setAction]=useState(false);
  const [actionType,setActionType]=useState(null);
  const [actionData, setActionData] = useState(null);

  const [connecting, setConnecting]=useState(true);
  const [connected, setConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(false);


  const socket=useRef();
  const emitMessage=(data)=>{
    socket.current.emit('MESSAGE', {type:"RAW",data});
  }
  const emitAction=(type)=>{
     socket.current.emit('ACTION',type);
  }

  useEffect(() => {
    let urlparams=new URLSearchParams(window.location.search);
    let username=urlparams.get('username');
    let room=urlparams.get('room');

    socket.current = socketio();  //production
    // socket.current = socketio("http://localhost:3001"); //development
    socket.current.on('connect',()=>{
        socket.current.emit('JOIN_ROOM',{username,room});
        socket.current.on('MESSAGE',(data)=>{
            setMessages(messages=>[...messages,<Message key={Date.now()+""} message={data}/>])
        });
        //commands for component content
        socket.current.on('COMMAND',CMD_data=>{
            //todo
        })
        //actions on ui screen
        socket.current.on('ACTION',data=>{
          console.log("actionslgk   ..",data)
              // if (data.type === ACTIONS.BLINK) {
                console.log("sgksjglkklslk")
                setActionData(data);
                setActionType(data.type);
                setAction(true);
              // }
        })
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
          setMessages(messages=>[...messages,<WarnMessage key={messages.length} message="something went wrong, redirecting you to the home!"/>])
          setTimeout(()=>{
             let params=new URLSearchParams(window.location.search);
             history.replace(`/?${params.toString()}`)
          },2000);
        });
       //show an alert on connection
        setConnecting(false);
        setConnected(true);
        setTimeout(() => setConnected(false), 2000);
    })
      socket.current.on('reconnecting', () => {
        setConnecting(true);
      })
      socket.current.on('error', () => {
        setConnectionError(true);
      })

    return () => {
      socket.current.close();
    }
  }, []);

  return (
    <div id="app">
       {connecting && <div className="snakebar overlay"><WarnMessage message="connecting..."/></div>}
       {connected && <div className="snakebar"><InfoMessage message="connected"/></div>}
       {connectionError && <div className="snakebar"><WarnMessage message="unable to connect"/></div>}
       <ChatView emitAction={emitAction} emitMessage={emitMessage} roomInfo={roomInfo} messages={messages}/>
      {action && <Action onDone={()=>setAction(false)} type={actionType} data={actionData}/>}
    </div>
  );
}
 
export default Chat;
