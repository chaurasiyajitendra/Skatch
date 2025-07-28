// AdminPanel_Design5_GraySkyBlue.jsx
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { PiBagBold } from "react-icons/pi";
import { FaUsers } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import AdminOdersPanle from "../component/AdminOdersPanle";
import { UserDataContex } from "../contex/UserContex";
import AdminCustomerPanle from "../component/AdminCustomerPanle";
import { FaHouseChimney } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import OderEdit from "../component/OderEdit";


const AdminPanel = () => {
  const { user } = useContext(UserDataContex);
  const navigate = useNavigate();
  const [odersPanle, setOdersPanle] = useState(false);
  const [customerPanle, setCustomerPanle] = useState(false);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productCategory, setProductCategory] = useState('');
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", productPrice);
    formData.append("description", productDescription);
    formData.append("category", productCategory);
    if (productImage) {
      formData.append("image", productImage);
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/product/add`,
        formData,
        {
          headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Optionally: form reset ya success message dikha sakte ho
    } catch (err) {
      console.error(err);
      // Optionally: error message dikha sakte ho
    }
    setProductName('');
    setProductPrice('');
    setProductDescription('');
    setProductImage('');
    setProductCategory('');
    toast.success("Product added successfully!", {
      position: "top-right",
      duration: 5000,
      style: {
        background: "#E8F5E9", // light soft green
        color: "#2E7D32", // deep elegant green text
        border: "2px solid #A5D6A7", // subtle green border
        padding: "18px 26px",
        fontSize: "16px",
        fontWeight: "600",
        borderRadius: "14px",
        textAlign: "center",
        boxShadow: "0 6px 14px rgba(46, 125, 50, 0.15)", // soft green shadow
        letterSpacing: "0.4px",
      },
      iconTheme: {
        primary: "#2E7D32", // dark green icon
        secondary: "#C8E6C9", // light green bg for icon
      },
    });

  };


  return (
    <div className="flex w-full h-screen font-[sans-serif]">

      <aside className="w-[25%] bg-gradient-to-b from-[#1E293B] to-[#0F172A] text-white p-6 rounded-tr-3xl">
        <h1 className="text-2xl  font-bold text-center mb-8 text-[#E2E8F0]">
          {user ? `Welcome, ${user.fullName}` : "Admin Panel"}
        </h1>
        <nav className="space-y-6 text-lg">
          <div
            onClick={() => {
              setOdersPanle(false);
              setCustomerPanle(false);
            }}
            className="flex items-center cursor-pointer gap-4 hover:bg-white/10 p-3 rounded-xl transition"
          >
            <AiOutlineProduct /> Add Product
          </div>
          <div
            onClick={() => {
              setOdersPanle(true);
              setCustomerPanle(false);
            }}
            className="flex items-center gap-4 cursor-pointer hover:bg-white/10 p-3 rounded-xl transition"
          >
            <PiBagBold /> Your Products
          </div>
          <div
            onClick={() => {
              setOdersPanle(false);
              setCustomerPanle(true);
            }}
            className="flex items-center gap-4 cursor-pointer hover:bg-white/10 p-3 rounded-xl transition"
          >
            <FaUsers /> Customers
          </div>
          <div
            onClick={() => {
              setOdersPanle(false);
              setCustomerPanle(false);
              navigate('/shop')
            }}
            className="flex items-center gap-4 cursor-pointer hover:bg-white/10 p-3 rounded-xl transition"
          >
            <FaHouseChimney />Shop
          </div>
          <div
            onClick={() => {
              handleLogout();
            }}
            className="flex items-center gap-4 cursor-pointer hover:bg-white/10 text-red-300 p-3 rounded-xl transition"
          >
            <RiLogoutCircleLine /> Logout
          </div>

        </nav>
      </aside>
      <main className="w-[75%] p-10 bg-[#F8FAFC] relative">
        {odersPanle && <AdminOdersPanle />}
        {customerPanle && <AdminCustomerPanle/>}
        <h1 className="text-3xl font-semibold text-[#1E293B] mb-6">
          Add Your Product
        </h1>
        <form onSubmit={(e)=>{submitHandler(e)}} method="post" autoComplete="off" encType="multipart/form-data" className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-lg mb-2 text-[#1E293B]">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e)=> setProductName(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg mb-2 text-[#1E293B]">Product Price</label>
            <input
              type="number"
              value={productPrice}
              onChange={(e)=> setProductPrice(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product price"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg mb-2 text-[#1E293B]">
              Product Description
            </label>
            <textarea
              value={productDescription}
              onChange={(e)=> setProductDescription(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
              rows="4"
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label className="text-lg mb-2 text-[#1E293B]">
              Product Image 
            </label>
            <input
              type="file"
              name="image"
              onChange={(e)=> setProductImage(e.target.files[0])}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product image URL"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg mb-2 text-[#1E293B]">
              Product Category
            </label>
            <select 
              value={productCategory}
              onChange={(e)=> setProductCategory(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select category</option>
              <option value="HandBags">Hand Bags</option>
              <option value="SideBags">Side Bags</option>
              <option value="BagPack">BagPack</option>
            </select>
          </div>
          <div></div>
          <div className="flex gap-4">
            <button className="bg-[#1D4ED8] text-white px-6 py-2 rounded-lg">
              Add Product
            </button>
            <button
              className="bg-red-500 text-white px-6 py-2 rounded-lg"
              type="reset"
            >
              Reset
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminPanel;
