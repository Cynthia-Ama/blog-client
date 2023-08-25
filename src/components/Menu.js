import React, { useEffect, useState } from 'react'
import axios from "axios"

export default function Menu({cat}) {
 
  const [posts, setposts] = useState([])

  useEffect(()=>{
    async function fetchPosts(){
    
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/posts/?cat=${cat}`)
        setposts(res.data)
      }
      catch (error) {
        console.log(error)
      }
    }

    fetchPosts()
    
  },[cat])

    
  return (
    <div className='single-post-menu'>
        <h1>Posts like this</h1>
        <div className='menu-posts'>
            {
                posts?.map((post)=>{
                    const {_id, title, desc, img} = post
                    return (
                        <div className='menu-post' key={_id}>
                            <div className='menu-post-image'>
                                <img src={img} alt={title} />
                            </div>
                            <div className='menu-post-content'>
                                <h3>{title}</h3>
                                <p>{desc}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div> 
    </div>
  )
}
