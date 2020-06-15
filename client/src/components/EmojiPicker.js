import React from 'react';
import emojidata from "./emoji.json";
import "../styles/emojipicker.css";

function EmojiPicker({onPick}) {
    return (
        <div className="picker-wrapper">
             <div className="picker-container">
                 <div className="searchbar"></div>
                 <div className="emoji-container">
                     <div className="emojis">
                         {emojidata.map((emojiItem)=>(
                             <span title={emojiItem.name} key={emojiItem.char} onClick={()=>onPick(emojiItem.char)} className="emoji" role="img" aria-labelledby="emoji">{emojiItem.char}</span>
                         ))}
                     </div>
                 </div>
             </div>
        </div>
    )
}

export default EmojiPicker;
