import React from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '../components/Menu';
import {useLocation, useNavigate} from "react-router-dom"
import axios from "axios"
import { useGlobalContext } from '../components/Context'
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

export default function SinglePost() {
  const {username, loading, setloading} = useGlobalContext()
  const location = useLocation()
  const navigate = useNavigate()
  const postid = location.pathname.split("/")[2]
  const [post, setpost] = React.useState()

  React.useEffect(()=>{

    async function fetchPost(){
      try {
        setloading(true)
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/posts/${postid}`)
        setpost(res.data)
        setloading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPost()

  },[postid])


  async function deletePost(){
    const token = localStorage.getItem("token")
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/posts/${postid}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  if (loading){
    return (
      <Loading/>
    )
  }

  return (
    <div className='single-post'>
      <div className='single-post-content'>
        <div className='single-post-image'>
          <img src={post?.img} alt={post?.title} />
        </div>
        <div className='single-post-author'>
          <h3>{post?.username}</h3>
          <p>Posted at: <span>{post?.createdAt}</span></p>
        </div>
        <div className='single-post-buttons'>
          {username === post?.username && <Link to={`/write?edit=${postid}`} state={post}><button style={{color: "green"}}><ModeEditIcon/></button></Link>}
          {username === post?.username && <button onClick={deletePost}><DeleteIcon/></button>}
        </div>
        <div className='single-post-info'>
          <h3>{post?.title}</h3>
          <p>{post?.desc}</p>
        </div>
      </div>
      <Menu cat={post?.cat}/> 
    </div>
  )
}
