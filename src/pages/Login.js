import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../components/Context'

export default function Login() {
  const {Login, username} = useGlobalContext()

  const navigate = useNavigate()

  const [err, seterr] = useState("")

  const [inputs, setinputs] = useState({
    username: "",
    password: "",
  })

  function handleChange(e){
    setinputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value 
    }))
  }
 
  async function submitValues(e){
    e.preventDefault()
    try {
      await Login(inputs)
      navigate("/")
    } catch (error) {
      seterr(error.response.data)
      localStorage.removeItem('token')
    }
  }

  return (
  <div className='auth'>
    <h1>Login</h1>
    <form>
      <input type="text" placeholder='Username' name='username' required onChange={handleChange}/>
      <input type="text" placeholder='Password' name='password' required onChange={handleChange}/>
      <button onClick={submitValues}>Login</button>
      <div>
        <p className='error-message'>{err}</p>
        <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
      </div>
    </form>
  </div>
  )
}
