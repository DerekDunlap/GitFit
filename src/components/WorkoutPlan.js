import React,{useEffect} from "react"
import {connect} from 'react-redux'
import StopWatch from "./StopWatch";
import StopWatchBtns from "./StopWatchBtns";
import StopWatchTimer from "./StopWatchTimer";

function AddWorkout(props){
    useEffect(()=>{
        getMyWorkoutPlan()
    },[])

    const getMyWorkoutPlan=()=>{
        fetch(`http://localhost:8080/my-workoutplan`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },body:JSON.stringify({
                userID:props.user.id
            })
        })
        .then(response=>{
            return response.json()
        }).then(results=>{
            console.log(results)
            props.onWorkoutPlanLoaded(results)
        })
    }

    const handleRemoveWorkout=(e)=>{
        fetch('http://localhost:8080/remove-workout',{
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
        })
    }

    const workoutPlanItem=props.workoutPlan.map((exercise)=>{
        return(
            <li key={exercise.id}>
                <h3 name='name' value={exercise.name}><input type='checkbox'/>Name: {exercise.name}<br/></h3>
                <h3 id='description-heading' value={exercise.description}>Description:<br/>{exercise.description}<br/></h3>
                <span id='setSpan' value={exercise.set}><strong>Number of Sets: {exercise.numOfSets}</strong><br/></span>
                <span id='repSpan' value={exercise.Reps}><strong>Number of Reps: {exercise.numOfReps}</strong><br/></span>
                <button id='removeWorkoutBtn' onClick={handleRemoveWorkout} value={exercise.workoutID}>Remove</button>
            </li>
        )
    })

    return(
        <div id='workout-page'>
            <div>
                <div id='dashTimer-container'>
                    <StopWatch/>
                </div>
                <ul id='workoutUL'>
                    <h1 id='workoutUL-heading'>My Workouts:</h1>
                    {workoutPlanItem}
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        user:state.userReducer.user,
        workoutPlan:state.userReducer.workoutPlan,
        workoutUpdated:state.userReducer.workoutUpdated,
        timer:state.userReducer.timer
    }
}

const mapDispatchToProps=(dispatch=>{
    return{
        onWorkoutPlanLoaded:(workoutPlan)=>dispatch({type:'WORKOUTPLAN_UPLOADED',payload:workoutPlan}),
        onWorkoutPlanUpdate:(workoutUpdated)=>dispatch({type:'WORKOUT_UPDATED',payload:workoutUpdated})
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(AddWorkout)