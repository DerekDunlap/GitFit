import React from "react";
import StopWatch from "./StopWatch";

function StopWatchPage(){
    return(
        <div id='stopwatch-page'>
            <div id='stopwatch-circle'>
                <StopWatch/>
            </div>
        </div>
    )
}

export default StopWatchPage