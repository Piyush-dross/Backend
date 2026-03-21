import React,{useState} from 'react'
import FormGroup from '../components/FormGroup'
import '../style/Register.scss'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate=useNavigate()
  const {loading,handleRegister}=useAuth()
  
  async function handleSubmit(e){
      e.preventDefault()
      await handleRegister({username,email,password})
      navigate("/")
  }

  return (
 <main>
      <div className="Register-page">
        <div className="form-container">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <FormGroup 
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
              label="Username"placeholder="Enter Username"/>
              <FormGroup 
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              label="Email"placeholder="Enter your Email"/>
              <FormGroup 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              label="Password"placeholder="Enter your Password"/>
            </div>
            <button className='button'type='submit'>Register</button>
          </form>
            <p>Already have an account ? <Link to='/login'>Login here</Link></p>

        </div>

      </div>



    </main>
  )
}

export default Register
