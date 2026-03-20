import React,{useState,useRef} from 'react'
import "../style/createpost.scss"
import {useNavigate} from 'react-router-dom'
import { usePost } from '../hook/usepost'

const Createpost = () => {
  const [caption, setcaption] = useState("")
  const postImageInputFieldRef=useRef(null)
  const {loading,handleCreatePost}=usePost()
  const navigate=useNavigate()

  async function submithandler(e){
    e.preventDefault()
    const file=postImageInputFieldRef.current.files[0]
    const createdPost = await handleCreatePost(file,caption)

    if(createdPost){
      navigate("/")
    }
  }

  if(loading){
    return (
      <main>
       <h1>Create Post...</h1>
      </main>
    )
  }

  return (
    <main>
      <div className="createpostpage">
        <div className="form-container">
          <h1>
            Create Post
          </h1>
          <form onSubmit={submithandler}>
            <label className='postimagelabel'htmlFor="postimage">Select image</label>
            <input ref={postImageInputFieldRef} hidden type="file" name='postimage'id='postimage' />
            <input value={caption} 
              onChange={(e)=>{setcaption(e.target.value)}}
            type="text"name='caption'id='caption' placeholder='Enter caption' />
            <button className="primary-btn">Create post</button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Createpost
