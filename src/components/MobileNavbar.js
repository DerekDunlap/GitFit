import React from "react";
import { useHistory } from "react-router";

function MobileNavbar(){
    const history=useHistory()

    const handleRouteChange=(e)=>{
        history.push(e.target.value)
    }
    return (
        <nav id='mobile-navbar' role='navigation'>
            <div id='mobile-menu-toggle'>
                <input type='checkbox'/>
                <span></span>
                <span></span>
                <span></span>
            <ul id='mobile-menu'>
                <li><button id='mobile-menu-buttons' onClick={handleRouteChange} value="/dashboard">Home</button></li>
                <li><button id='mobile-menu-buttons' onClick={handleRouteChange} value="/workouts">My Workouts</button></li>
                <li><button id='mobile-menu-buttons' onClick={handleRouteChange} value="/stopwatch">Stopwatch</button></li>
                <li><button id='mobile-menu-buttons' onClick={handleRouteChange} value="/">Logout</button></li>
            </ul>
            </div>
        </nav>
    )
}

export default MobileNavbar