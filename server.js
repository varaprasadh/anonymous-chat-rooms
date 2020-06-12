const express=require('express');
const socketio=require('socket.io');
const app=express();
const path=require('path');
const cors=require('cors');


const PORT=process.env.PORT || 3001;


app.use(cors());

app.get("/", (req, res) => {
    res.end("connected")
});

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

//heavy tasks
io.on('connection', socket => {
   socket.on('JOIN_ROOM',({username,room})=>{
      let user=createUser(socket.id,username,room);
      console.log("user create",user);
      socket.join(user.room);
      socket.emit('welcome','bot welcomes you to the server');
      io.to(user.room).emit("NEW_USER",`${username} joined the chat`);
   });
   socket.on('disconnect',()=>{
      let user=removeUser(socket.id);
      if(user){
          socket.leave(user.room);
          io.to(user.room).emit('LEAVE_ROOM', `${user.username} just left the chat`);
      }
   })
});



//start the server
httpServer.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

