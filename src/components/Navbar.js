import React from "react";
import { useHistory } from "react-router";

function Navbar(props){
    const history=useHistory()

    const handleRouteChange=(e)=>{
        history.push(e.target.value)
    }

    return(
        <nav id='dashboard-navbar'>
            <button id='dashboardBtn' onClick={handleRouteChange} value='/dashboard'>Home</button>
            <button id='dashboardBtn' onClick={handleRouteChange} value='/workouts'>My Workout</button>
            <button id='dashboardBtn' onClick={handleRouteChange} value='/stopwatch'>StopWatch</button>
            <button id='dashboardBtn' onClick={handleRouteChange} value='/'>Log Out</button>
        </nav>
    )
}

export default Navbar