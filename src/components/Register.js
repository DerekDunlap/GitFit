import React, { useState } from 'react'
import { useHistory } from 'react-router'

function Register(props){
    const history=useHistory()
    const [user,setUser]=useState()

    const handleRouteChange=(e)=>{
        let path=`${e.target.value}`
        history.push(path)
    }

    const handleOnChange=(e)=>{
        setUser({
          ...user,
          [e.target.name]:e.target.value
        })
    }

    const onCreateAcc=()=>{
        console.log(user.username,user.password)
        fetch('http://localhost:8080/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username:user.username,
                password:user.password
            })
        }).then(response=>{
            return response.json()
        }).then(results=>{
            if(results.success){
                console.log(results.success)
                props.history.push('/')
            }else{
                props.history.push('/',{errorMessage:results.message})
            }
        })
    }

    return(
        <div id='register-container'>
            <div id='registerDiv'>
                <input onChange={handleOnChange} type='text' placeholder='Username' name='username' required/>
                <input onChange={handleOnChange} type='password' placeholder='Password' name='password' required/>
                <button onClick={onCreateAcc}>Create</button>
                <button onClick={handleRouteChange} value='/'>Back</button>
            </div>
        </div>
    )
}

export default Register