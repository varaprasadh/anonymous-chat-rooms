import React from 'react'
import transparentLogo from "../assets/transparent.png";
import "../styles/nav.css";
import {FaGlobe,FaSignOutAlt,FaShareAlt} from "react-icons/fa/index.esm";
import {useState} from 'react'
const NavBar = ({roomInfo}) => {
    const params=new URLSearchParams(window.location.search);
    params.delete("username");
    const shareURL = `${window.location.origin}?${params.toString()}`;

    const [showdialogue, setShowdialogue]=useState(false);
    function invite(){
            if (navigator.share) {
                navigator.share({
                        title: 'anonymous chat rooms',
                        text: `join the chat and have some fun anonymously\n - love from 𝗮𝗻𝗼𝗻𝘆𝗺𝗼𝘂𝘀 𝗰𝗵𝗮𝘁 𝗿𝗼𝗼𝗺𝘀`,
                        url: shareURL,
                    })
                    .then(() => console.log('Successful share'))
                    .catch((error) => console.log(error));
            } else {
               navigator.clipboard.writeText(shareURL);
               setShowdialogue(true);
               setTimeout(()=>setShowdialogue(false),1000);
            }
        }
    return (
       <nav className="nav">
          <div className="logo">
              <img src={transparentLogo} alt="logo"/>
          </div>
          <div className="room-info">
              <div className="room-name">{roomInfo.room || "~404~"}</div>
              
              <div className="room-stats">
                  <FaGlobe color="green"/>
                  <span className="stats online">{roomInfo.online || 0} online</span>
              </div>
          </div>
          <div className="nav-actions">
             <div className="action invite" onClick={invite}>
                 <FaShareAlt size={25}/>
                 <div>invite</div>

             </div>
              <div className="action exit">
                  <FaSignOutAlt size={25}/>
                  <div>exit</div>
              </div>
          </div>
        {showdialogue && <div className="dialogue">
                <div className="content">Link copied to clipboard!</div>
        </div>}
       </nav>
    )
}


export default NavBar;
