import React, { useEffect, useState } from "react";
import {connect} from 'react-redux'
import StopWatchBtns from "./StopWatchBtns";
import StopWatchTimer from "./StopWatchTimer";

function StopWatch(props){
   
    const [isActive,setIsActive]=useState(false)
    const [isPaused,setIsPaused]=useState(true)
    // const [time,setTime]=useState(0)

    useEffect(()=>{
        let timeInterval=null;

        if(isActive && isPaused===false){
            let startTime=Date.now()-props.timer
          timeInterval=setInterval(()=>{
              props.onStopWatchStart(Date.now()-startTime)
            },100)
            props.onStopWatchResume(timeInterval)           
        }else{
            clearInterval(timeInterval)
        }
        return ()=>{
            clearInterval(timeInterval)
        }
    },[isActive,isPaused])

    const onHandleStart=()=>{
        setIsActive(true)
        setIsPaused(false)
    }

    const onHandlePauseStart=()=>{
        setIsPaused(!isPaused)
    }

    const onHandleReset=()=>{
        setIsActive(false)
        props.onStopWatchReset(0)
    }
    

    return(
        <div id='stopwatch-circle'>
            <div id='controls-container'>
            <StopWatchTimer time={props.timer}/>
            <StopWatchBtns 
            isActive={isActive}
            isPaused={isPaused}
            onHandleStart={onHandleStart}
            onHandlePauseStart={onHandlePauseStart}
            onHandleReset={onHandleReset}
            />
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        timer: state.userReducer.timer
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        onStopWatchStart:(time)=>dispatch({type:'TIMER_UPDATE',payload:time}),
        onStopWatchResume:(timeInterval)=>dispatch({type:'TIMER_RESUME',payload:timeInterval}),
        onStopWatchReset:(time)=>dispatch({type:'TIMER_RESET',payload:time})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(StopWatch)