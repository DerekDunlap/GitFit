import React,{useState,useEffect} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import StopWatch from "./StopWatch";
import {connect} from 'react-redux'
import StartWorkoutBtn from "./StartWorkoutBtn";

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
            props.onWorkoutPlanLoaded(results)
        })
    }
    
    const [workout,setWorkout]=useState({})

    const handleOnChange=(e)=>{
        setWorkout({
            ...workout,
            [e.target.name]:e.target.value
        })
    }

    const handleAddWorkout=(e)=>{
        fetch('http://localhost:8080/login',{
           method: 'POST',
           headers:{
               'Content-Type':'application/json'
           },
           body:JSON.stringify({
               name:workout.name,
               set:workout.set,
               reps:workout.reps,
               description:workout.description
           })
       }).then(response=>{
           console.log(response)
            return response.json()
        }).then(user=>{
          console.log(user)
            if(user.success){
              props.onUserLogin(user.user)
              props.history.push(e.target.value)
            }
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
                <input type='checkbox'/>
                <h4 name='name' value={exercise.name}>Name: {exercise.name}</h4>
                <label value={exercise.description}><strong>Description:<br/>{exercise.description}</strong><br/></label>
                <span value={exercise.set}><strong>Number of Sets: {exercise.numOfSets}</strong><br/></span>
                <span value={exercise.reps}><strong>Number of Reps: {exercise.numOfReps}</strong><br/></span>
                Rating: <button><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/></button>
                <button onClick={handleRemoveWorkout} value={exercise.workoutID}>Remove</button>
            </li>
        )
    })

    return(
        <div id='workout-page'>
            {/* <div>
                <h3>Add a New Workout:</h3>
                Exercise: <input onClick={handleOnChange} type='text' name='name' placeholder='Exercise Name'/>
                Description: <input onClick={handleOnChange} type='text' name='description' placeholder='Description'/>
                <input onClick={handleOnChange} type='text' name='set' placeholder='# of Sets'/>
                <input onClick={handleOnChange} type='text' name='reps' placeholder='# of Reps'/>
                <input onClick={handleOnChange} type='text' name='muscles' placeholder='Target Muscle Group'/>
                <input onClick={handleOnChange} type='text' name='equipment' placeholder='Equipment Used'/>
                <button onClick={handleAddWorkout}>Add</button>
            </div> */}
            <div>

                <StopWatch/>
                <ul>
                    <h3>My Workouts:</h3>
                    {workoutPlanItem}
                </ul>
            </div>
        </div>
            
    )
}

const mapStateToProps=(state)=>{
    return{
        user:state.userReducer.user,
        workoutPlan:state.userReducer.workoutPlan
    }
}

const mapDispatchToProps=(dispatch=>{
    return{
        onWorkoutPlanLoaded:(workoutPlan)=>dispatch({type:'WORKOUTPLAN_UPLOADED',payload:workoutPlan})
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(AddWorkout)