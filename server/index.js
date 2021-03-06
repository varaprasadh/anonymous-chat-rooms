const express=require('express');
const socketio=require('socket.io');
const app=express();
const path=require('path');
const cors=require('cors');
const moment=require('moment');

const fs=require('fs');

const router=require("./routes/router");

app.use(cors());

app.use(express.static("build"));

app.use(router);


const httpServer = require('http').createServer(app);
const io = socketio(httpServer);


const users=[];

const createUser=(id,username,room)=>{
    let user={
        id, username, room
    }
    users.push(user);
    return user;
}
const removeUser=(id)=>{
    let index=users.find(user=>user.id===id);
    if(index!=-1){
        return users.splice(index,1)[0];
    }
}
const findUser=id=>{
    return users.find(user => user.id === id);
}
const getRoomInfo = (room) => {
     let onLineUsers=users.filter(user=>user.room===room);
    return {room:room,online:onLineUsers.length-1}
}
const validUNameAndRoom=(username,room)=>{
    if(username==null || room==null || username.trim()=="" || room.trim()==""){
        return false;
    }
    return true;
}
//message type
const types={ 
    NORMAL:"NORMAL", //normal message
    BLOB:"BLOB",    // blob dara
    RAW:"RAW",      //raw data from client
    COMMAND:"COMMAND", // command 
    WELCOME: "WELCOME", //welcome msg
    EXIT:"EXIT",      // exit message,
    ACTION:"ACTION"  //UI action
}

const parseMessage=(user,{data,timestamp},parseType)=>{

  let message={
      username:user.username,
      id:user.id,
      time:moment(timestamp).format("h:mm a"), 
      type:parseType,
      content:data,
      isSelf:false //default
  }
  return message;
}
 

//heavy tasks
io.on('connection', socket => {
   socket.on('JOIN_ROOM',({username,room})=>{
      if(!validUNameAndRoom(username,room)){
          socket.emit("ACCESS_DENIED", null);
          return;
      }
      let user=createUser(socket.id,username,room);
      //console.log("user create",user);
      socket.join(user.room);
      socket.emit('WELCOME','welcome to the ANONYMOUS CHAT ROOMS');
      socket.to(user.room).emit("NEW_USER",`${username} joined the chat`);
      let info = getRoomInfo(user.room);
      io.to(user.room).emit("ROOM_INFO", info);
   });
   socket.on('MESSAGE',data=>{
       let user=findUser(socket.id);
       if(!user){
           //create a new user
           user=createUser(socket.id,data.username,data.room);
       }
        let parsedMessage=parseMessage(user,data,types.RAW);
        socket.emit('MESSAGE',{...parsedMessage,isSelf:true});
        socket.to(user.room).emit('MESSAGE', parsedMessage);
   });
   socket.on('ACTION',({type,username,room})=>{
       let user=findUser(socket.id);
       if(!user){
          user=createUser(socket.id,username,room); 
       }
        let parsedMessage=parseMessage(user,{},type);
        socket.emit('ACTION',{...parsedMessage,isSelf:true});
        socket.to(user.room).emit('ACTION', parsedMessage);
   })
   socket.on('disconnect',()=>{
      let user=removeUser(socket.id);
      if(user){
          socket.leave(user.room);
          let leaveMessage=`${user.username} just left the chat`;
          io.to(user.room).emit('EXIT',leaveMessage);
          let info=getRoomInfo(user.room);
          io.to(user.room).emit("ROOM_INFO", info);
      }
   });

});


const PORT = process.env.PORT || 3001;


//start the server
httpServer.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

