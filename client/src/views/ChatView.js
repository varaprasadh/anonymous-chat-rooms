import React from 'react';
import "../styles/chatview.css";
import {useState} from 'react'
import {FaInfoCircle,FaTelegramPlane} from 'react-icons/fa'
function Index(props) {
    console.log(props);
    const [message,setMessage] = useState("")
    return (
        <div className="chat-container-wrapper">
            <div className="chat-container">
                <div className="chat">
                    <div className="msg">hi</div>
                    <div className="msg">hi</div>
                    <div className="msg">hi</div>
                    <div className="msg">hi</div>
                </div>
                <div className="controls">
                    <button className="button help">
                        <FaInfoCircle color="rgb(15, 72, 146)" size={25}/>
                    </button>
                    <div className="input-element">
                        <input type="text" value={message} onChange={e=>setMessage(e.target.value)}/>
                    </div>
                    <button className="button send">
                        <FaTelegramPlane size={25}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Index;
