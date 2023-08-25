import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

export default function Register() {
  const navigate = useNavigate()

  const [inputs, setinputs] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [err, seterr] = useState(null)

  function handleChange(e){
    setinputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const regex = /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/

  async function submitValues(e){
    e.preventDefault()
    try {
      if(!inputs.email.toLowerCase().match(regex)){
        alert('Pls enter a valid email')
      }
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/register`, inputs)
      navigate("/login")
    }
    catch (error) {
      seterr(error.response.data)
    }
  }



  return (
    <div className='auth'>
      <h1>Register</h1>
      <form>
        <input type="text" placeholder='Username' name='username' required onChange={handleChange}/>
        <input type="text" placeholder='Email' name='email' required onChange={handleChange}/>
        <input type="text" placeholder='Password' name='password' required onChange={handleChange}/>
        <button onClick={submitValues}>Register</button>
        <div>
          <p className='error-message'>{err}</p>
          <p>Do you have an account? <Link to={"/login"}>Login</Link></p>
        </div>
      </form>
    </div>
  )
}
