import React, { Component } from 'react'
import {BrowserRouter as Router,Switch,NavLink,Route} from "react-router-dom";
import Chat from "./Chat";
import Home from "./views/Home";

export class App extends Component {
   
    render() {
        return (
           <Router>
             <Switch>
                <Route path="/" component={Home} exact/>
                <Route path="/chat" component={Chat} exact/> 
             </Switch>
           </Router>
        )
    }
}

export default App;
