import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between  bg-purple-950 py-1.5'>
        <div className="logo">
            <span className="font-bold text-xl text-gray-100 mx-8">UTask</span>
        </div>
        <ul className='flex text-gray-100 gap-10 mx-8'>
            <li className='cursor-pointer hover:font-bold'>Home</li>
            <li className='cursor-pointer hover:font-bold'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
