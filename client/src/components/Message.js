import React from 'react';
import "../styles/message.css";

function Message({message}) {
    let {type,id,username,content,time,isSelf}=message;
    return (
        <div className={`message-wrapper ${isSelf?"self":""}`}>
           <div className="message-container">
               <div className="message">
                   <div className="message-main">
                       <div className="avatar">{username[0]}</div>
                        <div className="message-content">
                            <div className="username">{username}</div>
                            <div className="content">{content}</div>
                        </div>
                   </div>
                   <div className="time">{time}</div>
               </div>
           </div>
        </div>
    )
}

export default Message;
/*
 welcome
 warning 
 normal
 //command action
 //blob, feature

*/