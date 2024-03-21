import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const SignUp = () => {
 


  const [name, setName] = useState("");
  const [password, setPassWord] = useState("");
   const [email, setEmail] = useState("");
  const navigate = useNavigate()
  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
    navigate('/');
    }
    })
  
  //collect the data from form
  const collectData = async () => {
    console.warn(name, email, password);
    let result = await fetch('http://localhost:5000/register', {
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'content-type': 'application/json',
      },
    });

   result = await result.json();
     localStorage.setItem('user',JSON.stringify(result.result)); // store data in local storage
     localStorage.setItem("token",  JSON.stringify(result.auth));
     navigate('/');
 

  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        type="text"
        className="inputBox"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      />
      <input
        type="text"
        className="inputBox"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      <input
        type="password"
        className="inputBox"
        value={password}
        onChange={(e) => setPassWord(e.target.value)}
        placeholder="Enter PassWord"
      />

      <button className="signup-btn" onClick={collectData} type="button">
        {" "}
        Sign up
      </button>
    </div>
  );
};
export default SignUp;
