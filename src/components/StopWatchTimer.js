import React from "react"

function StopWatchTimer(props){
    const timeDisplay=(`
            ${("0"+Math.floor((props.time/60000)%60)).slice(-2)}:${("0"+Math.floor((props.time/1000)%60)).slice(-2)}.${("0"+Math.floor((props.time/10)%100)).slice(-2)}`)
    return(
        <div id='StopWatchTimer'>
            <div id='time'>{timeDisplay}</div>
        </div>
    )
}

export default StopWatchTimer