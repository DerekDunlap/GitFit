import React,{useState,useEffect} from "react"
import {connect} from 'react-redux'
import StopWatch from "./StopWatch";

function AddWorkout(props){
    useEffect(()=>{
        getMyWorkoutPlan()
    },[])

    const [targetWeight,setTargetWeight]=useState()
    const [goalWeight,setGoalWeight]=useState(props.user.pounds)

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

    const handleOnChange=(e)=>{
        setTargetWeight(targetWeight=>e.target.value)
    }

    const handleOnSetGoal=()=>{
        setGoalWeight(goalWeight=>targetWeight)
    }

    return(
        <div id='workout-page'>
                <div id='dashTimer-container'>
                    <StopWatch/>
                </div>
                {/* <div id='userInfo'>
                    <div>
                        <h2>Current Weight</h2>
                        <h2>Height: {props.user.feet}' {props.user.inches}"</h2><h2>Weight: {props.user.pounds} lbs</h2>
                    </div>
                    <div>
                        <span id='goalWeightBoxBorder'>
                            <input id='goalWeightTextBox' onChange={handleOnChange} type='number' min='0' max='600' placeholder='Goal Weight Here' name='username' required/>
                            <span></span>
                        </span>
                        <button id='removeWorkoutBtn' onClick={handleOnSetGoal}>Set Goal</button>
                    </div>
                    <div>
                        <h2>Goal Weight</h2>
                        <h2>Height: {props.user.feet}' {props.user.inches}"</h2><h2>Weight: {goalWeight} lbs</h2>
                    </div>
                </div> */}
                <ul id='workoutUL'>
                    <h1 id='workoutUL-heading'>My Workouts:</h1>
                    {workoutPlanItem}
                </ul>
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