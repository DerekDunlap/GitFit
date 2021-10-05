import React from "react";
import { useHistory } from "react-router";

function Navbar(){
    const history=useHistory()

    const handleRouteChange=(e)=>{
        history.push(e.target.value)
    }

    return(
        <nav className="desktop-menu">
            <ul className="menu__list r-list">
                <li className="menu__group"><button onClick={handleRouteChange} value='/dashboard' className="menu__link r-link text-underlined">Home</button></li>
                <li className="menu__group"><button onClick={handleRouteChange} value='/workouts' className="menu__link r-link text-underlined">My Workouts</button></li>
                <li className="menu__group"><button onClick={handleRouteChange} value='/stopwatch' className="menu__link r-link text-underlined">Stopwatch</button></li>
                <li className="menu__group"><button onClick={handleRouteChange} value='/' className="menu__link r-link text-underlined">Logout</button></li>
            </ul>
        </nav>
    )
}

export default Navbar