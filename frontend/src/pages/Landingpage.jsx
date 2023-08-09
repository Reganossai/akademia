import React from 'react';
import { Link } from 'react-router-dom';
import image from "../assets/image 1.png"

const Landingpage = () => {
  return (
    <div className='login-div'>
        <div className='bg'></div>
        <div className='bgg'>
            <img src={image} className="aka" alt='opp'/>
            <div className='lolade'>
            <button id="aka-1" className='btn btn-primary'><Link to='/login'>Login</Link></button>
            <button id="aka-2" className='btn btn-danger'><Link to='/signup'>Register</Link></button>
            </div>
        </div>

    </div>
  )
}

export default Landingpage