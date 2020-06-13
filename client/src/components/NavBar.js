import React from 'react'
import transparentLogo from "../assets/transparent.png";
import "../styles/nav.css";
import {FaGlobe,FaSignOutAlt,FaShareAlt} from "react-icons/fa/index.esm";


const NavBar = ({roomInfo}) => {
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
             <div className="action invite">
                 <FaShareAlt size={25}/>
                 <div>invite</div>
             </div>
              <div className="action exit">
                  <FaSignOutAlt size={25}/>
                  <div>exit</div>
              </div>
              
          </div>
       </nav>
    )
}


export default NavBar;
