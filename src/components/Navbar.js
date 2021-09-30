import React from "react";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome,faDumbbell,faSignOutAlt, faStopwatch} from "@fortawesome/free-solid-svg-icons";

function Navbar(){
    const history=useHistory()

    const handleRouteChange=(e)=>{
        console.log(e.target.value)
        history.push(e.target.value)
    }

    return(
        <nav id='dashboard-navbar'>
            <button id='dashboardBtn' onClick={handleRouteChange} value='/dashboard'><FontAwesomeIcon id='navbar-icon' icon={faHome}/></button>
            <button id='dashboardBtn' onClick={handleRouteChange} value='/workouts'><FontAwesomeIcon icon={faDumbbell}/></button>
            <button id='dashboardBtn' onClick={handleRouteChange} value='/stopwatch'><FontAwesomeIcon icon={faStopwatch}/></button>
            <button id='dashboardBtn' onClick={handleRouteChange} value='/'><FontAwesomeIcon icon={faSignOutAlt}/></button>
        </nav>
    )
}

export default Navbar