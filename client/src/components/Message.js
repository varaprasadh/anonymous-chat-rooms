import React from 'react';
import "../styles/message.css";
import {BigEmoji,Animatedtext,BlurText} from "./MessageUtils";
import {useEffect} from "react"
import {getFromcomponentMap} from "./Action";

function Message({message}) {
    let {type,id,username,content,time,isSelf}=message;
    
    let pattern = /^<(\w+)>(.+)<(\w+)>$/ /*need updation*/
    let matches = content.match(pattern);
    /*
    "<b>target name<b>".match(/^<(\w)>([\w+\s]*)<(\w)>$/) - > gives
    ["<b>target name<b>", "b", "target name", "b", index: 0, input: "<b>target name<b>", groups: undefined]
    */
    if(matches){
        let startTag=matches[1];
        let endTag=matches[3];
        let targetText=matches[2];
        if(startTag===endTag){
            if(startTag==="big"){
                content=<BigEmoji emoji={targetText}/>
            }else if(startTag==="a"){
                content=<Animatedtext text={targetText}/>
            }else if(startTag==="blur"){
                content=<BlurText text={targetText}/>
            }else if(startTag==="lt" && ['LIKE','DISLIKE','HEART','STAYHOME'].indexOf(targetText.toUpperCase())!==-1){
                content=getFromcomponentMap({data:message,type:targetText.toUpperCase(),width:150,height:150,hideMessage:true});
            }
        }
    }
      return (
        <div className={`message-wrapper ${isSelf?"self":""}`}>
           <div className="message-container">
               <div className="message">
                   <div className="message-main">
                        <div className="sender">
                            <div className="avatar">{username[0]}</div>
                            <div className="username">{username}</div>
                        </div>
                        <div className="message-content">
                            <div className="content">{content}</div>
                            <div className="time">{time}</div>
                        </div>
                   </div>
               </div>
           </div>
        </div>
    )
}

export default Message;
