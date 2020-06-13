import React from 'react';
import {useState} from 'react';
import transparentLogo from "../assets/transparent.png";
import "../styles/home.css";

function Home() {
    const [username,setUsername]=useState("");
    const [room,setRoom]=useState("");
    function connect(e){
     alert("glksn")
    }

    return (
        <div className="container">
            <div className="form">
                <div className="img">
                    <img src={transparentLogo} alt="logo"/>
                </div>
                <div className="input-wrapper">
                    <input type="text" value={username} onChange={e=>setUsername(e.target.value)} placeholder="choose a username"  id="username"/>
                </div>
                <div className="input-wrapper">
                    <input type="text" value={room} onChange={e=>setRoom(e.target.value)} placeholder="enter room id" id="username"/>
                </div>
                <div className="form-actions">
                    <button className="join" onClick={connect} disabled={room.trim()==="" || username.trim()===""}>join</button>
                </div>
            </div>
        </div>
    )
}

export default Home;
