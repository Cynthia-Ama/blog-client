import React from 'react'
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalContext } from './Context';

export default function Sidebar() {
  const {issidebarOpen, closesideBar} = useGlobalContext()
  return (
    <div className={issidebarOpen ? "sidebar opensidebar" : "sidebar"}>
      <div className='sidebar-content'>
        <button onClick={closesideBar}><CloseIcon style={{fontSize: "2.5rem", cursor: "pointer"}}/></button>
        <div>
          <Link onClick={closesideBar} to={"/?cat=art"}>Art</Link>
          <Link onClick={closesideBar} to={"/?cat=food"}>Food</Link>
          <Link onClick={closesideBar} to={"/?cat=style"}>Style</Link>
        </div>
      </div>  
    </div>
  )
}
