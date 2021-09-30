import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPause, faPlay, faStop} from "@fortawesome/free-solid-svg-icons";

function StopWatchBtns(props){
    const StartBtn=(
        <button id='firstBtn' onClick={props.onHandleStart}><FontAwesomeIcon id='stopwatch-icon' icon={faPlay}></FontAwesomeIcon></button>
    )
    const StatusBtns=(
        <button id='firstBtn' onClick={props.onHandlePauseStart}>{props.isPaused ? <FontAwesomeIcon id='stopwatch-icon' icon={faPlay}></FontAwesomeIcon> : <FontAwesomeIcon id='stopwatch-icon' icon={faPause}></FontAwesomeIcon>}</button>
    )

    const ActiveBtn=(
        <div id='ActiveBtn'>{props.isActive ? StatusBtns:StartBtn}
        <button id='secBtn' onClick={props.onHandleReset}><FontAwesomeIcon id='stopwatch-icon' icon={faStop}></FontAwesomeIcon></button>
        </div>
    )

    return(
        <div id='StopWatchBtns'>
            {ActiveBtn}
        </div>
    )
}

export default StopWatchBtns