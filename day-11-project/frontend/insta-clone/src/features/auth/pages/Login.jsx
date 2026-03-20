import {React, useState } from "react";
import "../style/form.scss";
import { Link } from "react-router-dom";
import { useauth } from "../hooks/useauth";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const {user,loading,handlelogin}=useauth()
  const [username,setusername]=useState("")
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")

  const navigate=useNavigate()

  const handleSubmit =async (e) => {
    e.preventDefault();
  const success = await handlelogin(username,email,password)
  if(success){
   navigate("/")
    }
    if(loading){
      return (<main>
        <h1>Loading......</h1>
      </main> )
    }
  };
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            onInput={(e) => {
              setusername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="Enter username"
          />
          <input
            onInput={(e) => {
              setemail(e.target.value);
            }}
            type="email"
            name="Email"
            placeholder="Enter Email"
          />
          <input
            onInput={(e) => {
              setpassword(e.target.value);
            }}
            type="text"
            name="password"
            placeholder="Enter password"
          />
          <button class="primary-btn">Submit</button>
        </form>
        <p>
          Don't have an account ? <Link to="/register">Create one.</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
