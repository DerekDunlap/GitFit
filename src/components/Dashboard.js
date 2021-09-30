import React, {useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar} from "@fortawesome/free-solid-svg-icons";
import {connect} from 'react-redux'
import StartWorkoutBtn from "./StartWorkoutBtn";

function Dashboard(props){
    useEffect(()=>{
        getAllWorkouts()
    },[])

    const getAllWorkouts=()=>{
        fetch('http://localhost:8080/workouts')
        .then(response=>{
            return response.json()
        }).then(results=>{
            props.onWorkoutLoaded(results)
        })
    }

    const handleAddWorkout=(e)=>{
        console.log(props.user.id)
        console.log(e.target.value)
        fetch('http://localhost:8080/add-workout',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },body:JSON.stringify({
                workoutID:e.target.value,
                userID:props.user.id
            })
        }).then(response=>{
            return response.json()
        }).then(result=>{
            props.onGuestWorkoutPlanLoaded(result)
        })
    }

    const workoutItem=props.workouts.map((workout)=>{
        return(
            <li key={workout.id}>
                <h4 name='name' value={workout.name}>Name: {workout.name}</h4>
                <label value={workout.description}>Description: {workout.description}</label>
                <span value={workout.set}># of Sets: {workout.numOfSets}</span>
                <span value={workout.reps}># of Reps{workout.numOfReps}</span>
                Rating: <button><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/></button>
                <button onClick={handleAddWorkout} value={workout.id}>Add</button>
            </li>
        )
    })

    return(
        <div id='content-container'>
            <div id='dashboard-div'>
                <h1>Ready to GitFit, {props.user.username}?!</h1>
                <StartWorkoutBtn/>
                <ul id='workoutUL'>
                    <h2>Recommend Workouts:</h2>
                    {workoutItem}
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        user:state.userReducer.user,
        workouts:state.userReducer.workouts
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        onWorkoutLoaded:(workouts)=>dispatch({type:'WORKOUTS_UPLOADED',payload:workouts}),
        onGuestWorkoutPlanLoaded:(guestWorkoutPlan)=>dispatch({type:'WORKOUTPLAN_UPLOADED',payload:guestWorkoutPlan})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)