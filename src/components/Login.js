import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = ()=>{
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();

   useEffect (()=>{
   const  auth = localStorage.getItem('user');
   if(auth){
    navigate('/');
   }
   })


 const handleLogin = async ()=>{

    let result = await fetch('http://localhost:5000/login', {
        method: 'post',
        body: JSON.stringify({  email, password }),
        headers: {
          'content-type': 'application/json',
        },
      });
  
     result = await result.json(); 
     if(result.auth){
      localStorage.setItem("user",  JSON.stringify(result.auth));
      localStorage.setItem("token",  JSON.stringify(result.user));

      navigate('/');
    }else{
        alert("please enter correct email")

     }
     console.warn(result)
    }

 return (
 <div  className="login">
 <input className="inputBox" type="text"   placeholder="Enter login"       value={email}   onChange={(e) => setEmail(e.target.value)}
/>

 <input className="inputBox" type="password"   placeholder="Enter password" value={password}  onChange={(e) => setPassword(e.target.value)}/>

 <button className="signup-btn" onClick={handleLogin} type="button">
        {" "}
        login 
      </button>

 </div>

 )


}
export default Login;