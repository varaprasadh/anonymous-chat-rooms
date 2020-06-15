import React from 'react';
import {useState,useEffect} from 'react';
import transparentLogo from "../assets/transparent.png";
import "../styles/home.css";
import {useHistory,useLocation} from "react-router-dom"

function Home() {
    const [username,setUsername]=useState("");
    const [room,setRoom]=useState("");
    const [unameError, setUnameError] = useState(false);
    const [roomError, setRoomError] = useState(false);
    const history=useHistory();
    const location=useLocation();
    function connect(){
      if(username.trim()===""){
          setUnameError(true);
          setTimeout(()=>{setUnameError(false)},1000)
      }
      if (room.trim() === "") {
          setRoomError(true);
          setTimeout(()=>{setRoomError(false)},1000)
      }
      if (username.trim() !== "" && room.trim() !== ""){
          let params=new URLSearchParams();
          params.append("username",username);
          params.append("room",room);
          history.push(`/chat?${params.toString()}`);
      }
    }
   useEffect(()=>{
       let params=new URLSearchParams(location.search);
       setUsername(params.get("username") || "");
       setRoom(params.get("room") || "");
   },[])
    return (
        <div className="container">
            <div className="form">
                <div className="img">
                    <img src={transparentLogo} alt="logo"/>
                </div>
                <div className={`input-wrapper ${unameError?"error":""}`}>
                    <input type="text" value={username} onChange={e=>setUsername(e.target.value.trim())} placeholder="choose a username"  id="username"/>
                </div>
                <div className={`input-wrapper ${roomError?"error":""}`}>
                    <input type="text" value={room} onChange={e=>setRoom(e.target.value.trim())} placeholder="enter room id" id="username"/>
                </div>
                <div className="form-actions">
                    <button className="join" onClick={connect} >join</button>
                </div>
            </div>
        </div>
    )
}

export default Home;
