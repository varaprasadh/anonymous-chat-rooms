import React from 'react';
import "../styles/chatview.css";
import {useState,useEffect,useRef} from 'react'
import {
    FaTelegramPlane,
    FaGreaterThanEqual,
    FaRegLaugh,
} from 'react-icons/fa';
import NavBar from "../components/NavBar";
import EmojiPicker from "../components/EmojiPicker";
import ActionBar from "../components/Actions";

//source : https://stackoverflow.com/questions/45719909/scroll-to-bottom-of-an-overflowing-div-in-react
const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};
 

//messagecomponets and handler for emiting a message
function ChatView({messages,emitMessage,roomInfo,emitAction}) {
    const [message,setMessage] = useState("");
    const [showPicker,setShowPicker] = useState(false);
    const [actionBar, setActionBar] = useState(true);

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
                <div className="chat" onClick={()=>setShowPicker(false)}>
                    {messages}
                    <AlwaysScrollToBottom/>
                </div>
                <div className="controls-wrapper">
                    {actionBar && <ActionBar onActionClick={type=>emitAction(type)}/>}
                    <div className="controls">
                        <button className="button terminal" onClick={()=>setActionBar(bool=>!bool)}>
                            <FaGreaterThanEqual color="rgb(15, 72, 146)" size={25}/>
                        </button>
                        <button className="button emoj" onClick={()=>setShowPicker(bool=>!bool)}>
                            <FaRegLaugh size={25} color="rgb(15, 72, 146)"/>
                        </button>
                        <div className="input-element">
                            <input onClick={()=>setShowPicker(false)} onKeyUp={sendMessage} type="text" value={message} onChange={e=>setMessage(e.target.value)}/>
                        </div>
                        <button className="button send" onClick={sendMessage}>
                            <FaTelegramPlane size={25}/>
                        </button>
                    </div>
                    <div> 
                        { showPicker && <EmojiPicker  onPick={(emoji)=>setMessage(message=>message+emoji)}/>}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ChatView;
