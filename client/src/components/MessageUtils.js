import React, { useState } from 'react';
import "../styles/messageutils.css";
import {useEffect} from 'react'

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
const BigEmoji=({emoji})=><div style={{fontSize:"5em"}}>{emoji}</div>

const Animatedtext=({text})=>{
    return(
        <div className="animated-text">
            <div className="line-1 anim-typewriter">{text}</div>
        </div>
    )
}
const BlurText=({text})=>{
    return(
        <div className="filter">
            <span className="blur">{text}</span>
        </div>
    )
}


export {
    InfoMessage,
    WarnMessage,
    BigEmoji,
    Animatedtext,
    BlurText
};




