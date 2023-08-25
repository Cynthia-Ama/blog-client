import React from 'react'
import { Link } from 'react-router-dom'
import MenuIcon from "@mui/icons-material/Menu"
import {useGlobalContext} from './Context'

export default function Navbar() {
  const {opensideBar, username, LogOut} = useGlobalContext()
  return (
   <nav>
    <div className='nav-center'>
      <div className='nav-button'>
        <button onClick={opensideBar}><MenuIcon style={{fontSize: "2.5rem", cursor: "pointer"}}/></button>
      </div>
      <div className='nav-header'>
        <h1><Link to={"/"}>CA</Link></h1>
      </div>
      <div className='nav-links'>
        <Link to={"/?cat=art"}>Art</Link>
        <Link to={"/?cat=food"}>Food</Link>
        <Link to={"/?cat=style"}>Style</Link>
      </div>
      <div className='nav-info'>
        {username && <span>Hi, {username}</span>}
        {username && <Link to={"/write"}>Write</Link>}
        {username ? <span style={{cursor: "pointer"}} onClick={LogOut}>Logout</span> : <Link to={"/register"}>Login / Register</Link>}
      </div>
    </div>
   </nav>
  )
}
