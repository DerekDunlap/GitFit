import React from "react"
import { useHistory } from "react-router"


function StartWorkoutBtn(){
    const history=useHistory()

    const handleRouteChange=(e)=>{
        console.log(e.target.value)
        history.push(e.target.value)
    }

    return(
        <button id='startWorkoutBtn' onClick={handleRouteChange} value='/stopwatch'>Begin Workout!</button>
    )
}

export default StartWorkoutBtn