const initialState={
    user:{},
    timer:0,
    timerInterval:null,
    workouts:[],
    workoutPlan:[],
    guestWorkoutPlan:[]
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case 'USER_LOGIN':
            return{
                ...state,
                user:action.payload
            }
        case 'WORKOUTS_UPLOADED':
            return{
                ...state,
                workouts:action.payload
            }
        case 'WORKOUTPLAN_UPLOADED':
            return{
                ...state,
                workoutPlan:action.payload
            }
        case 'WORKOUT_UPDATED':
            return{
                ...state,
                workoutUpdated:action.payload
            }
        case 'TIMER_UPDATE':
            return{
                ...state,
                timer:action.payload
            }
        case 'TIMER_RESUME':
            return{
                ...state,
                timerInterval:action.payload
            }
        case 'TIMER_RESET':
            return{
                ...state,
                timer:action.payload
            }
        default:
            return state
    }
}

export default reducer