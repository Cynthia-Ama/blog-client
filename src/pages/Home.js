import React, { useEffect } from 'react'
import {Link, useLocation} from "react-router-dom"
import axios from "axios"
import { useGlobalContext } from '../components/Context'
import Loading from '../components/Loading'

export default function Home() {

  const {loading, setloading} = useGlobalContext()
  const cat = useLocation().search
  const [posts, setposts] = React.useState([])
  const [isreadMore, setisreadMore] = React.useState(true)

  useEffect(()=>{
    async function fetchPosts(){
      setloading(true)
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/posts/${cat}`)
        setposts(res.data)
        setloading(false)
      }
      catch (error) {
        console.log(error)
      }
    }

    fetchPosts()
    
  },[cat])

  function togglereadMore(){
    setisreadMore(!isreadMore)
  }

  if (loading){
    return (
      <Loading/>
    )
  }

  if (!posts){
    return (
      <div className='home'>
        <h1>Welcome to CA's blog</h1>
        <div>
          <h1>Sorry, there are no posts which match your criteria.</h1>
        </div>
      </div>
    )
  }

  return (
    <div className='home'>
      <h1>Welcome to CA's blog</h1>
      <div className='posts'>
        {
          posts.map((post)=>{
            const {_id, title, desc, img} = post
            return (
              <div className='post' key={_id}>
                <div className='post-image'>
                  <img src={img} alt={title} />
                </div>
                <div className='post-content'>
                  <h3>{title}</h3>
                  <p>{isreadMore ? desc.slice(0, 300) : desc}<span onClick={togglereadMore} style={{cursor: "pointer", color:"teal"}}>{isreadMore ? "...read more" : "..show less"}</span></p>
                  <Link to={`/post/${_id}`}>See more</Link>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
