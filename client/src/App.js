import React, { Component } from 'react'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Chat from "./Chat";
import Home from "./views/Home";

export class App extends Component {
   
    render() {
        return (
          <div className="app-full-screen">
            <Router>
              <Switch>
                  <Route path="/" component={Home} exact/>
                  <Route path="/chat" component={Chat} exact/> 
                  <Route component={Home}/>
              </Switch>
            </Router>
           </div>
        )
    }
}

export default App;
