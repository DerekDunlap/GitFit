import React from 'react'
import { useHistory } from "react-router";
import {connect} from 'react-redux'

function Footer(props){
    const history=useHistory()
    const handleRouteChange=(e)=>{
            fetch('https://frozen-caverns-60178.herokuapp.com/delete-user',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },body:JSON.stringify({
                    userID:props.user.id
                })
            }).then(response=>{
                return response.json()
            }).then(result=>{
                console.log(result)
                history.push(e.target.value)
            })
    }
    return(
        <div id='footer-div'>
            <button id='footerBtn' onClick={handleRouteChange} value='/'>Delete Account</button>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(Footer)