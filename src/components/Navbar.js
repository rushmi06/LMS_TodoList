import React from 'react'
import logo from '../assets/logo.png'
function Navbar() {
  return (
    <div className='flex items-center p-2 border-b-2 shadow-lg'>
        <img src={logo} alt={logo} width="100px"/>
        <div className='font-bold text-2xl'>My Notes</div>
    </div>
  )
}

export default Navbar