import React, {useEffect} from "react";
import {connect} from 'react-redux'
import StartWorkoutBtn from "./StartWorkoutBtn";

function Dashboard(props){
    useEffect(()=>{
        getAllWorkouts()
    },[])

    const getAllWorkouts=()=>{
        fetch('https://frozen-caverns-60178.herokuapp.com/workouts')
        .then(response=>{
            return response.json()
        }).then(results=>{
            props.onWorkoutLoaded(results)
        })
    }

    const handleAddWorkout=(e)=>{
        console.log(props.user.id)
        console.log(e.target.value)
        fetch('https://frozen-caverns-60178.herokuapp.com/add-workout',{
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
            console.log(result)
            //props.onWorkoutPlanLoaded(result)
        })
    }


    let workoutItem=props.workouts.map((workout)=>{
        return(
            <li key={workout.id}>
                <h2 name='name' value={workout.name}>Name: {workout.name}</h2>
                <h3 value={workout.description}>Description:<br/>{workout.description}</h3>
                <h3 value={workout.set}># of Sets: {workout.numOfSets}</h3>
                <h3 value={workout.reps}># of Reps: {workout.numOfReps}</h3>
                <button id='addWorkoutBtn' onClick={handleAddWorkout} value={workout.id}>Add</button>
            </li>
        )
    })

    return(
            <div id='dashboard-div'>
                <h1 id='dashboard-heading'>Ready to GitFit, {props.user.username}?</h1>
                <StartWorkoutBtn/>
                <ul id='workoutUL'>
                    <h1 id='workoutUL-heading'>Recommended Workouts:</h1>
                    {workoutItem}
                </ul>
            </div>
    )
}

const mapStateToProps=(state)=>{
    console.log(state.user)
    return{
        user:state.user,
        workouts:state.workouts
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        onWorkoutLoaded:(workouts)=>dispatch({type:'WORKOUTS_UPLOADED',payload:workouts}),
        onWorkoutPlanLoaded:(guestWorkoutPlan)=>dispatch({type:'WORKOUTPLAN_UPLOADED',payload:guestWorkoutPlan})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)