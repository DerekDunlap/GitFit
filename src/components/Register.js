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
        console.log(e.target.value)
    }

    const onCreateAcc=()=>{
        console.log(user.username,user.password)
        fetch('https://frozen-caverns-60178.herokuapp.com/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username:user.username,
                password:user.password,
                feet:user.feet,
                inches:user.inches,
                pounds:user.pounds
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
                <div id='createTextDiv'>
                    <span id='textBoxBorder'>
                    <input id='usernameTextBox' onChange={handleOnChange} type='text' placeholder='Username' name='username' required/>
                    <span></span>
                    </span>
                    <span id='textBoxBorder'>
                    <input id='passwordTextBox'onChange={handleOnChange} type='password' placeholder='Password' name='password' required/>
                    <span></span>
                    </span>
                </div>
                <div id='bodyMass-div'>
                    <h3>Height</h3>
                    <div id='bodyMass-input'>
                        <h4>Feet: <input id='bodyMassTextBox' onChange={handleOnChange} type='number' min='0' max='10' name='feet'/>
                        Inches: <input id='bodyMassTextBox' onChange={handleOnChange} type='number' min='0' max='11' name='inches'/>
                        </h4>
                    </div>
                </div>
                <div id='bodyMass-div'>
                    <h3>Weight</h3>
                    <div>
                       <h4>Pounds (lbs):<input id='weightTextBox' onChange={handleOnChange} type='number' min='0' max='600' name='pounds'/></h4>
                    </div>
                </div>
                <div id='loginBtnDiv'>
                    <button id='loginBtn' onClick={onCreateAcc}>Create</button>
                    <button id='loginBtn' onClick={handleRouteChange} value='/'>Back</button>
                </div>
            </div>
        </div>
    )
}

export default Register