import React from 'react'
import '../nav.scss'
import { useNavigate } from 'react-router-dom'
import HomeFilled from './NavComponent/HomeFilled'
import HomeOutline from './NavComponent/HomeOutline'

const Nav = () => {
    const navigate=useNavigate()
    let clickhandler=()=>{
     navigate("/createpost")
    }
  return (

    <div className='nav-bar'>
      <p>
        Instagram
      </p>
      <span>{({isActive})=>{isactive?<HomeFilled/>:<HomeOutline/>}}</span>
      
      <button onClick={clickhandler}
       className='btn primary-btn'>new Post</button>
    </div>
  )
}

export default Nav
