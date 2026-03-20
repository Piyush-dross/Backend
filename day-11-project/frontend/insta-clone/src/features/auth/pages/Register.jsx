import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useauth } from "../hooks/useauth"

const Register = () => {

  const { handleregister, loading } = useauth()

  const [username,setusername] = useState("")
  const [email,setemail] = useState("")
  const [password,setpassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()

    const success = await handleregister(username,email,password)

    if(success){
        navigate("/login")
    }
  }

  if(loading){
    return <h1>Loading...</h1>
  }

  return (
    <main>
      <div className="form-container">

        <h1>Register</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Enter username"
            onChange={(e)=>setusername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e)=>setemail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter password"
            onChange={(e)=>setpassword(e.target.value)}
          />

          <button class="primary-btn">Submit</button>

        </form>

        <p>
          Already have an account?
          <Link to="/login"> Login to account</Link>
        </p>

      </div>
    </main>
  )
}

export default Register