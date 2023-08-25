import React, {useState} from 'react'
import axios from "axios"
import { useLocation, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../components/Context'

export default function WritePost() {
  const {username} = useGlobalContext()
  const state = useLocation().state
  const navigate = useNavigate()

  const [title, settitle] = useState(state?.title ||  "")
  const [desc, setdesc] = useState(state?.desc || "")
  const [cat, setcat] = useState(state?.cat || "")
  const [file, setfile] = useState(null)


  async function uploadImage(){
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/upload`, formData)
      console.log(res.data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

   async function handleSubmit(e){
    e.preventDefault()
    const imgUrl = await uploadImage()
    const token = localStorage.getItem("token")
    try {
      state
        ? await axios.put(`${process.env.REACT_APP_BASE_URL}/api/posts/${state._id}`, {
            title,
            desc,
            username,
            cat,
            img: file ? imgUrl : "",
          }, {headers: {
              Authorization: `Bearer ${token}`,
            },})
        : await axios.post(`${process.env.REACT_APP_BASE_URL}/api/posts`, {
            title,
            desc,
            username,
            cat,
            img:file ? imgUrl : ""
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  
  return (
    <div className='write'>
      <div className='write-content'>
        <input type="text" placeholder='Title'  value={title} onChange={(e)=>settitle(e.target.value)} required />
        <textarea name="" id="" cols="30" rows="10" placeholder='Description...' value={desc} onChange={(e)=>setdesc(e.target.value)} required></textarea>
      </div>
      <div className='write-menu'>
       <div className='menu1'>
         <h3>Publish</h3>
         <div>
          <input type="file" name="file" id="file" onChange={(e)=>setfile(e.target.files[0])}/>
          <label htmlFor="file" onClick={uploadImage} style={{color: "red"}}>Upload Image</label>
         </div>
         <button onClick={handleSubmit}>Publish Post</button>
       </div>
       <div className='menu2'>
          <h3>Category</h3>
          <div className='form-group'>
            <input type="radio" name="cat" id="art" checked={cat === "art"} value="art" onChange={(e)=>setcat(e.target.value)}/>
            <label htmlFor="art">Art</label>
          </div>
          <div className='form-group'>
            <input type="radio" name="cat" id="food" checked={cat === "food"} value="food" onChange={(e)=>setcat(e.target.value)}/>
            <label htmlFor="food">Food</label>
          </div>
          <div className='form-group'>
            <input type="radio" name="cat" id="style" checked={cat === "style"} value="style" onChange={(e)=>setcat(e.target.value)}/>
            <label htmlFor="style">Style</label>
          </div>
        </div>
      </div>  
    </div>
  )
}
