import React, { useState } from 'react'
import {connect} from 'react-redux'

function Login(props) {

  const [user,setUser]=useState()

  const handleRouteChange=(e)=>{
    let path=`${e.target.value}`
    props.history.push(path)
  }

  const handleOnChange=(e)=>{
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })
  }

  const handleOnGuestLogin=(e)=>{
    fetch('http://localhost:8080/guest-login')
    .then(response=>{
      return response.json()
    }).then(results=>{
      props.onUserLogin(results.guest)
      props.history.push(e.target.value)
    })
  }

  const handleOnLogin=(e)=>{
    fetch('http://localhost:8080/login',{
       method: 'POST',
       headers:{
           'Content-Type':'application/json'
       },
       body:JSON.stringify({
           username:user.username,
           password:user.password
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

  return (
    <div id='login-container'>
      <div id='logoDiv'>
      </div>
      <div id='loginDiv'>
        <span id='textBoxBorder'>
        <input id='usernameTextBox' onChange={handleOnChange} type='text' placeholder='Username' name='username' required/>
        <span></span>
        </span>
        <span id='textBoxBorder'>
        <input id='passwordTextBox'onChange={handleOnChange} type='password' placeholder='Password' name='password' required/>
        <span></span>
        </span>
        <button id='loginBtn' onClick={handleOnLogin} value='/dashboard'>Login</button>
        <button id='loginBtn' onClick={handleOnGuestLogin} value='/dashboard'>Guest Login</button>
        <button id='loginBtn' onClick={handleRouteChange} value='/register'>No GitFit?</button>
      </div>
    </div>
  )
}

const mapDispatchToProps=(dispatch)=>{
  return{
    onUserLogin:(user)=>dispatch({type:'USER_LOGIN',payload:user})
  }
}

export default connect(null,mapDispatchToProps)(Login)