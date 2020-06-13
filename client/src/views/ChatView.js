import React from 'react';
import "../styles/chatview.css";
import {useState,useEffect,useRef} from 'react'
import {
    FaInfoCircle,
    FaTelegramPlane,
    FaGreaterThanEqual,
    FaCamera
} from 'react-icons/fa';
import NavBar from "../components/NavBar";



//source : https://stackoverflow.com/questions/45719909/scroll-to-bottom-of-an-overflowing-div-in-react
const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};


//messagecomponets and handler for emiting a message
function Index({messages,emitMessage,roomInfo}) {
    const [message,setMessage] = useState("");
    function sendMessage(e) {
        if(message.trim()===""){
            return;
        }
        if((e.which && e.which===13) || !e.which){
             emitMessage(message);
             setMessage("");
        }
    }
    return (
        <>
        <NavBar roomInfo={roomInfo} />
        <div className="chat-container-wrapper">
            <div className="chat-container">

                <div className="chat">
                    {messages}
                    <AlwaysScrollToBottom/>
                </div>

                <div className="controls">
                    <button className="button help">
                        <FaGreaterThanEqual color="rgb(15, 72, 146)" size={25}/>
                    </button>
                    <button className="button help">
                        <FaCamera color="rgb(15, 72, 146)" size={25}/>
                    </button>
                    <div className="input-element">
                        <input onKeyUp={sendMessage} type="text" value={message} onChange={e=>setMessage(e.target.value)}/>
                    </div>
                    <button className="button send" onClick={sendMessage}>
                        <FaTelegramPlane size={25}/>
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Index;
