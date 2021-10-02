import { faDumbbell, faHome, faSignOutAlt, faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useHistory } from "react-router";

function Navbar(){
    const history=useHistory()

    const handleRouteChange=(e)=>{
        history.push(e.target.value)
    }

    return(
        <nav id='dashboard-navbar'>
            <button id='dashboardBtn' onClick={handleRouteChange} value='/dashboard'><FontAwesomeIcon icon={faHome}></FontAwesomeIcon></button>
            <button id='dashboardBtn' onClick={handleRouteChange} value='/workouts'><FontAwesomeIcon icon={faDumbbell}></FontAwesomeIcon></button>
            <button id='dashboardBtn' onClick={handleRouteChange} value='/stopwatch'><FontAwesomeIcon icon={faStopwatch}></FontAwesomeIcon></button>
            <button id='dashboardBtn' onClick={handleRouteChange} value='/'><FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon></button>
        </nav>
    )
}

export default Navbar