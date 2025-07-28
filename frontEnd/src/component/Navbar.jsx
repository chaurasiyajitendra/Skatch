import React from 'react'
import { Link, Links, useNavigate } from 'react-router-dom'


const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='flex items-center justify-between' >
      <h1 onClick={()=>{navigate('/')}} className='font-medium cursor-pointer text-4xl font-[poppins] uppercase w-[60%]'>Skatch</h1>
      <div className='flex gap-4 text-lg '> 
        <Link className='hover:text-[#8B5E3C] transition' to={'/'}>Home</Link>
        <Link className='hover:text-[#8B5E3C] transition' to={'/shop'}>Shop</Link>
        <Link className='hover:text-[#8B5E3C] transition' to={'/about'}>About</Link>
        <Link className='hover:text-[#8B5E3C] transition' to={'/contact'}>Contact</Link>
      </div>
      <div className='flex gap-4 text-xl'>
        <Link className='hover:text-[#8B5E3C] transition' to={'/profile'}><i className="ri-user-line"></i></Link>
        <Link className='hover:text-[#8B5E3C] transition' to={'/cart'}> <i className="ri-shopping-bag-line"></i></Link>
      </div>
    </div>
  )
}

export default Navbar
