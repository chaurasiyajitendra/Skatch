import React, { useContext, useEffect, useState } from 'react'
import { UserDataContex } from '../contex/UserContex';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const UpdateAddres = ({user,onClose}) => {

  const {setUser} = useContext(UserDataContex);
  const navigate = useNavigate()

  const [formeData, setFromData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    address:{
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      zip: user?.address?.zip || '',
      country: user?.address?.country || '',
    }
  });

  const handleChange = (e) =>{
    const {name, value} = e.target;
    if(name.startsWith('address.'))
    {
      const key = name.split('.')[1];
      setFromData(prev=>({
        ...prev,
        address:{...prev.address,[key]:value}
      }));
    }else{
      setFromData(prev => ({...prev,[name]: value}));
    }
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const token = localStorage.getItem('token')
    try{
      const res = await axios.put(`${import.meta.env.VITE_URL}/user/update`,formeData,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });

      setUser(res.data.user);
      toast.success('Address update successfully !')
      onClose();
      navigate('/profile');
    }catch(err){
      console.log("Update Error :" ,err);
    }
  }

  return (
    <div className="z-50 fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-2xl w-full max-w-xl border border-gray-700 shadow-xl relative text-white">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-400 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-[#BFA373]">
          Change Your Address
        </h2>

        <form onSubmit={(e)=>{handleSubmit(e)}} className="space-y-5">
          {/* Embedded Address Fields */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Street</label>
            <input
              type="text"
              name='address.street'
              value={formeData.address.street}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">City</label>
              <input
                type="text"
                name='address.city'
                value={formeData.address.city}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">State</label>
              <input
                type="text"
                name='address.state'
                value={formeData.address.state}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                name='address.zip'
                value={formeData.address.zip}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Country
              </label>
              <input
                type="text"
                name='address.country'
                value={formeData.address.country}
                onChange={handleSubmit}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 rounded-lg font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateAddres
