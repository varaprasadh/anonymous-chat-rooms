import React from 'react'
import transparentLogo from "../assets/transparent.png";
import "../styles/nav.css";


const NavBar = () => {
    return (
       <nav className="nav">
          <div className="logo">
              <img src={transparentLogo} alt="logo"/>
          </div>
       </nav>
    )
}


export default NavBar;
