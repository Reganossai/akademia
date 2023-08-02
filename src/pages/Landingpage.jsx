import React from 'react';
import { Link } from 'react-router-dom';
import image from "../assets/image 1.png"

const Landingpage = () => {
  return (
    <div className='login-div'>
        <div className='bg'></div>
        <div className='bgg'>
            <img src={image} className="aka" alt='opp'/>
            <h1 className='aka-1'><Link to='/login'>Login</Link></h1>
            
            <h1 className='aka-2'><Link to='/signup'>Register</Link></h1>
            
            <h1 className='aka-3'><Link to='/dashboard'>Dashboard</Link></h1>
     
            <h1 className='aka-4'><Link to='/admission'>Admission</Link></h1>

            
        </div>

    </div>
  )
}

export default Landingpage