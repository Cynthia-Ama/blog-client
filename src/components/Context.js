import react, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios"

export const AppContext = createContext()

export const AppProvider = ({children}) =>{
    
    const [loading, setloading] = useState(false)

    const [issidebarOpen, setissidebarOpen] = useState(false)

    function opensideBar(){
        setissidebarOpen(true)
    }

    function closesideBar(){
        setissidebarOpen(false)
    }

    const [username, setusername] = useState(JSON.parse(localStorage.getItem("user")) || null)

  
    async function Login(inputs){
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, inputs)
        localStorage.setItem("token", res.data.token)
        setusername(res.data.username) 
    }

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(username))
    },[username])
    

    async function LogOut(){
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/logout`)
        localStorage.removeItem('token')
        setusername(null)
    }

    return (
        <AppContext.Provider value={{loading, setloading, issidebarOpen, opensideBar, closesideBar, Login, username, LogOut}}>{children}</AppContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(AppContext)
}