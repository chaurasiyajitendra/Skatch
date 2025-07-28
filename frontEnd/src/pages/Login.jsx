import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContex } from '../contex/UserContex';
import toast from 'react-hot-toast';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useContext(UserDataContex);
  const [erro, setErro] = useState('')

  const navigate = useNavigate();

  const submitHandler = async (e)=>{

    e.preventDefault();
    setErro('');
    const user = {email: email,password: password}
    try{
      const res = await axios.post(`${import.meta.env.VITE_URL}/user/login`,user);
      if(res.status === 200)
      {
        const data = res.data;
        setUser(data.user);

        toast.success(`✨ Welcome Back ${data.user.fullName} !`, {
        position: "top-center", // ✅ Center the toast horizontally
        duration: 5000,         // Optional: auto-close after 3s
        style: {
          background: "#000",           // Jet black
          color: "#FFD700",             // Gold text
          border: "2px solid #FFD700",  // Thicker gold border
          padding: "20px 30px",         // More space inside
          fontSize: "17px",             // Bigger text
          fontWeight: "700",            // Bold
          borderRadius: "12px",         // Softer rounded edge
          textAlign: "center",          // Center the text
        },
        iconTheme: {
          primary: "#FFD700",  // Gold icon
          secondary: "#000",   // Black background for icon
        },
      });


        localStorage.setItem('token',data.token);
        if(data.user.email === "admin@me.com")
        {
          navigate('/admin')
        }else{
          navigate('/profile')
        }
      }
    }catch(err){
      if(err.response?.data?.message)
      { 
        setErro(err.response.data.message)
      }else{
        setErro('Something gose Wrong !!')
      }
    }
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <div className='min-h-screen w-full bg-[#F5F0E6] flex flex-col items-center justify-center py-8'>
        <h1 className='text-[#3A2E2E] text-5xl font-bold mb-2'>Welcome Back!</h1>
        <h2 className='text-[#BFA373] text-xl mb-6'>Log in to your Skatch account</h2>

        {/* Main Login Form Container with Shadow */}
        <div className='bg-white border border-gray-200 rounded-lg shadow-2xl shadow-zinc-600/20 p-8 w-full max-w-md mx-auto'>
          <form onSubmit={(e)=>{submitHandler(e)}} method='post'>
            {/* error block  */}
            {erro&& (
              <div className="mb-6 text-center text-red-700 font-semibold bg-red-100 border border-red-300 rounded-lg px-4 py-3 shadow-sm animate-pulse">
                {erro}
              </div>
            )}
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
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className='text-center text-gray-600 text-sm mt-6'>
            Don't have an account?{' '}
            <Link to={'/register'} className='text-[#BFA373] hover:underline font-medium'>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;