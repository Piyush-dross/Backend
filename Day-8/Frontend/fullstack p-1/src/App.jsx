import { useState,useEffect } from 'react'

import axios from 'axios'
import './index.css'

function App(){
     const [notes, setNotes] = useState([
       
     ])
     function fetchnotes(){
         axios.get('https://backend-zerw.onrender.com/api/notes')
      .then((res)=>{
      setNotes(res.data.notes)
     })
     
       }
      useEffect(()=>{
          fetchnotes()
      },[])
      function deletenotes(noteid){
        axios.delete(`https://backend-zerw.onrender.com/api/notes/${noteid}`)
        .then(res=>{
          console.log(res.data)
          fetchnotes()
          
        })
      }
      
    function updatenotes(noteid){
      const newdescription=prompt("Enter new description")
      axios.patch(`https://backend-zerw.onrender.com/api/notes/${noteid}`,{description:newdescription})
      .then(res=>{
        fetchnotes()
        
      })
      
     }
   
     function handleSubmit(e){
      e.preventDefault()
      const {tittle,description}=e.target.elements
      console.log(tittle.value,description.value)
      axios.post('https://backend-zerw.onrender.com/api/notes',{
      tittle:tittle.value,
      description:description.value
    })
    .then(res=>{
      console.log(res.data)
      fetchnotes()
    })
     }
    return (
    <>
    <form className="note-createform" onSubmit={handleSubmit}>
      <input name="tittle"type="text"placeholder='Enter Tittle' />
      <input name="description"type="text"placeholder='Enter Description' />
      <button>Create note</button>
    </form>
    <div className="notes">
    {
      notes.map(note=>{
        return <div className="note">
        <h1>{note.tittle}</h1>
        <p>{note.description}</p>
        <button onClick={()=>{deletenotes(note._id)}}>Delete Note</button>
        <button className='second'onClick={()=>{updatenotes(note._id)}}>Update Note</button>
      </div>
      })
    }
    </div>

    </>
  )
}

export default App
