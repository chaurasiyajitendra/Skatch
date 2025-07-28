import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Register = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [erro, seterro] = useState('');
  const navigate = useNavigate();

  const submitHnadler = async(e)=>{
    e.preventDefault();
    seterro('');
    const newUser ={fullName: fullName,email: email,password: password,};
    try{
        const responce = await axios.post(`${import.meta.env.VITE_URL}/user/register`,newUser);
        if(responce.status === 201)
          {
          const data = responce.data
          setUser(data.user)
          localStorage.setItem('token',data.token)
          navigate('/login');
          }
    }catch(err)
    {
      if(err.response?.data?.error)
      {
        seterro(err.response?.data?.error);
      }else{
        seterro(err.response?.data?.message || "Network error try after some time ")
      }
    }

    setFullName('')
    setEmail('');
    setPassword('')
  }
  
  return (
    <>
      <div className='min-h-screen w-full bg-[#F5F0E6] flex flex-col items-center justify-center py-8'>
        <h1 className='text-[#3A2E2E] text-5xl font-bold mb-2'>Create Your Account</h1>
        <h2 className='text-[#BFA373] text-xl mb-6'>Join Skatch and step into elegance</h2>

        {/* Main Form Container with Shadow */}
        <div className='bg-white border border-gray-200 rounded-lg shadow-2xl shadow-zinc-600/20 p-8 w-full max-w-md mx-auto'>
          <form onSubmit={(e)=>{submitHnadler(e)}}>

            {erro&& (
              <div className="mb-6 text-center text-red-700 font-semibold bg-red-100 border border-red-300 rounded-lg px-4 py-3 shadow-sm animate-pulse">
                {erro}
              </div>
            )}
            {/* Full Name Input with Subtle Shadow */}
            <div className='mb-6'>
              <label htmlFor='fullName' className='block text-gray-700 text-sm font-medium mb-2'>
                Full Name
              </label>
              <input
                value={fullName}
                onChange={(e)=>{setFullName(e.target.value)}}
                type='text' // Changed type to 'text'
                id='fullName'
                name='fullName'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BFA373] focus:border-transparent transition duration-200 ease-in-out'
                placeholder='John Doe (Full name must be have 3 latters)' // Updated placeholder
                required
              />
            </div>

            {/* Email Input with Subtle Shadow */}
            <div className='mb-6'>
              <label htmlFor='email' className='block text-gray-700 text-sm font-medium mb-2'>
                Email Address
              </label>
              <input
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                type='email'
                id='email'
                name='email'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BFA373] focus:border-transparent transition duration-200 ease-in-out'
                placeholder='your@example.com'
                required
              />
            </div>

            {/* Password Input with Subtle Shadow */}
            <div className='mb-8'> {/* Adjusted margin-bottom for last input before button */}
              <label htmlFor='password' className='block text-gray-700 text-sm font-medium mb-2'>
                Password
              </label>
              <input
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                type='password'
                id='password'
                name='password'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BFA373] focus:border-transparent transition duration-200 ease-in-out'
                placeholder='Enter your password'
                required
              />
            </div>

            {/* Submit Button with Hover and Focus Shadow */}
            <button
              type='submit'
              className='w-full bg-[#BFA373] text-white py-3 rounded-lg font-semibold shadow-md hover:bg-[#A68F63] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#BFA373] focus:ring-opacity-50 transition duration-200 ease-in-out'
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className='text-center text-gray-600 text-sm mt-6'>
            Already have an account?{' '}
            <Link to={'/login'} className='text-[#BFA373] hover:underline font-medium'>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;