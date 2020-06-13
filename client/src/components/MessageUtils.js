import React from 'react';
import "../styles/infomessage.css";
function InfoMessage({message}) {
    return (
        <div className="info-message-wrapper">
            <div className="info-message-container">
                <div className="info-message-content">{message}</div>
            </div>
        </div>
    )
}
function WarnMessage({message}) {
    return (
        <div className="warn-message-wrapper">
            <div className="warn-message-container">
                <div className="warn-message-content">{message}</div>
            </div>
        </div>
    )
}

export {InfoMessage,WarnMessage};

