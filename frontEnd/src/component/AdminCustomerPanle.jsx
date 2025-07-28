import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AdminCustomerPanle = () => {
  const [users, setUsers] = useState([]);
  const [selectedID, setSelectedID] = useState('');
  const [deletPanle, setdeletPanle] = useState(false);

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await axios.get(`${import.meta.env.VITE_URL}/user/allUsers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.status === 200) {
        setUsers(res.data);
      } else {
        console.error('Failed to fetch users');
      }
    };
    getAllUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/user/delete/${userId}`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      if(res.status === 200)
      {
        setUsers(users.filter(user => user._id !== userId));
        toast.success('User deleted successfully!', {
          position: "top-right",
          duration: 4000,
          style: {
            background: "#23272f",         // Deep dark background
            color: "#fff",                 // White text
            border: "1.5px solid #e11d48", // Subtle red accent border
            padding: "18px 28px",
            fontSize: "16px",
            fontWeight: "500",
            borderRadius: "14px",
            textAlign: "center",
            boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
            letterSpacing: "0.02em",
          },
          iconTheme: {
            primary: "#e11d48",   // Rose-600 for icon
            secondary: "#23272f", // Match background
          },
        });
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting user');
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-[#F8FAFC] p-10 overflow-auto">
      {deletPanle && (
        <div className="bg-black bg-opacity-60 w-full h-full fixed top-0 left-0 z-50 flex items-center justify-center">
          <div className="bg-white flex flex-col items-center justify-center gap-6 py-8 px-8 rounded-xl w-96 shadow-2xl border border-red-200">
            <div className="flex flex-col items-center">
              <svg className="w-12 h-12 text-red-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
              </svg>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Delete Customer?</h2>
              <p className="text-gray-600 text-center text-base">Are you sure you want to delete this Customer? This action cannot be undone.</p>
            </div>
            <div className="flex gap-4 mt-4">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded font-medium transition"
                onClick={() => setdeletPanle(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded font-medium transition"
                onClick={()=>{setdeletPanle(false), handleDelete(selectedID)}}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <h2 className="text-3xl font-semibold text-[#1F1B16] mb-8">All Customers</h2>
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Created Date</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium">{user.fullName}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() =>{ setdeletPanle(true) , setSelectedID(user._id)}}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow transition duration-150"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCustomerPanle;
