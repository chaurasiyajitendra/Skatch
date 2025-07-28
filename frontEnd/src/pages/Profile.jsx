import React, { useContext, useEffect, useState } from "react";
import {
  User,
  ShoppingBag,
  Settings,
  Mail,
  Phone,
  MapPin,
  Package,
  CreditCard,
  LogOut,
} from "lucide-react";
import { UserDataContex } from "../contex/UserContex";
import { ImCart } from "react-icons/im";
import axios from "axios";
import UpdateProfile from "../component/UpdateProfile";
import UpdateAddres from "../component/UpdateAddres";
import { useNavigate, Link } from "react-router-dom";
import PastOders from '../component/PastOders';

const ProfileSection = ({ title, children, icon: Icon }) => (
  <div className="bg-[#111111] p-6 rounded-xl shadow-md mb-6 border border-[#2e2e2e]">
    <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-100">
      {Icon && <Icon className="mr-2 h-6 w-6 text-[#b99b65]" />} {title}
    </h2>
    {children}
  </div>
);

const Profile = () => {
  const { user } = useContext(UserDataContex);
  const [userData, setUserData] = useState(null);
  const [profilePanle, setProfilePanle] = useState(false);
  const [addreshPanle, setAddreshPanle] = useState(false);
  const [pastOdersPanle, setPastOdersPanle] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${import.meta.env.VITE_URL}/user/logout`, {
      headers: {
        Authorization: `Beare ${token}`,
      },
    });
    if (res.status === 200) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_URL}/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserData(res.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const isAdmin = () => {
      if (user.email === 'admin@me.com') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    }
    isAdmin();
  }, [user, navigate]);

  if (!userData) {
    return <div className="text-white p-10">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#111111] p-6 border-b md:border-r border-[#2e2e2e] shadow-lg">
        <div className="mb-10 text-center">
          <h2 className="mt-4 font-semibold text-lg text-gray-50">
            {user?.fullName}
          </h2>
          <p className="text-center text-xs text-gray-400">
            Skatch Elite Member
          </p>
        </div>
        <nav className="space-y-4 text-sm">
          <button onClick={() => { setPastOdersPanle(false) }} className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-[#1a1a1a] px-3 py-2 rounded-lg w-full text-left">
            <User size={18} className="text-[#b99b65]" /> Profile Overview
          </button>
          <button onClick={() => { setPastOdersPanle(true) }} className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-[#1a1a1a] px-3 py-2 rounded-lg w-full text-left">
            <ShoppingBag size={18} className="text-[#b99b65]" /> Orders
          </button>
          <Link to="/cart" className="flex items-center gap-3  hover:text-gray-300 hover:bg-[#1a1a1a] px-3 py-2 rounded-lg w-full text-left">
            <ImCart size={18} className="text-[#b99b65]" /> Cart
          </Link>
          <Link to="/shop" className="flex items-center gap-3 text-green-400 hover:text-green-300 hover:bg-[#1a1a1a] px-3 py-2 rounded-lg w-full text-left">
            <Package size={18} /> Continue Shopping
          </Link>
          <button onClick={logout} className="flex items-center gap-3 text-red-400 hover:text-red-300 hover:bg-[#1a1a1a] px-3 py-2 rounded-lg w-full text-left mt-8">
            <LogOut size={18} /> Log Out
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-10 relative overflow-auto">
        {profilePanle && <UpdateProfile user={user} onClose={() => setProfilePanle(false)} />}
        {addreshPanle && <UpdateAddres user={user} onClose={() => setAddreshPanle(false)} />}
        {pastOdersPanle && <PastOders onClose={() => setPastOdersPanle(false)} />}

        <h1 className="text-3xl font-bold mb-8 text-gray-50">Profile Overview</h1>

        <ProfileSection title="Personal Information" icon={User}>
          <p className="text-gray-300 mb-2 flex items-center">
            <Mail size={16} className="mr-2 text-[#b99b65]" />
            <span className="text-gray-400 mr-2">Email:</span> {user?.email}
          </p>
          <p className="text-gray-300 mb-2 flex items-center">
            <Phone size={16} className="mr-2 text-[#b99b65]" />
            <span className="text-gray-400 mr-2">Phone:</span> {user?.phone}
          </p>
          <p className="text-gray-300 flex items-center">
            <User size={16} className="mr-2 text-[#b99b65]" />
            <span className="text-gray-400 mr-2">Member Since:</span>
            {new Date(user.createdAt).toLocaleDateString("en-us", {
              year: "numeric",
              month: "short",
            })}
          </p>
          <button className="mt-6 px-5 py-2 bg-[#b99b65] text-black rounded-lg font-medium hover:bg-[#cbb077] transition duration-200 shadow-md" onClick={() => setProfilePanle(true)}>
            Complete Your Profile
          </button>
        </ProfileSection>

        <ProfileSection title="My Addresses" icon={MapPin}>
          {user.address && Object.keys(user.address).length > 0 ? (
            <div className="mb-4 pb-4 border-b border-[#2e2e2e] last:border-b-0 last:pb-0">
              <p className="font-medium text-gray-100">Prime Address:</p>
              <p className="text-gray-300">{user.address.street}, {user.address.city}</p>
              <p className="text-gray-300">{user.address.state}, {user.address.zip}, {user.address.country}</p>
            </div>
          ) : (
            <p className="text-gray-400">No addresses added yet.</p>
          )}
          <button className="mt-6 px-5 py-2 bg-[#b99b65] text-black rounded-lg font-medium hover:bg-[#cbb077] transition duration-200 shadow-md" onClick={() => setAddreshPanle(true)}>
            Change Your Address
          </button>
        </ProfileSection>
      </main>
    </div>
  );
};

export default Profile;
