import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import OderEdit from "./OderEdit";
import { useNavigate } from "react-router-dom";

const AdminOdersPanle = () => {
  const [products, setProducts] = useState([])
  const [deletProductPanle, setDeletProductPanle] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();
  
  useEffect(()=>{
    const getProdact = async() =>{
    const Products = await axios.get(`${import.meta.env.VITE_URL}/product/all`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setProducts(Products.data);
  }
  getProdact();
  },[]);

  const deleteProduct = async (e) => {
    const id = e;
    const res = await axios.get(`${import.meta.env.VITE_URL}/product/delet/${id}`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if(res.status === 200){
      setProducts(products.filter((item) => item._id !== id));
      toast.success('Product deleted successfully!', {
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
  }

  const setToLocalStorage = (product)=>{
    const newProduct = JSON.stringify(product);
    localStorage.setItem('product',newProduct);
  }

  return (
    <div className=" p-10 absolute overflow-x-auto top-0 left-0 w-full h-full bg-[#F8FAFC] ">
      {/* {editPanle && <OderEdit />} */}
      <h1 className="text-4xl font-medium text-[#1F1B16] mb-6">Products</h1>
      {deletProductPanle && (
        <div className="bg-black bg-opacity-60 w-full h-full fixed top-0 left-0 z-50 flex items-center justify-center">
          <div className="bg-white flex flex-col items-center justify-center gap-6 py-8 px-8 rounded-xl w-96 shadow-2xl border border-red-200">
            <div className="flex flex-col items-center">
              <svg className="w-12 h-12 text-red-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
              </svg>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Delete Product?</h2>
              <p className="text-gray-600 text-center text-base">Are you sure you want to delete this product? This action cannot be undone.</p>
            </div>
            <div className="flex gap-4 mt-4">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded font-medium transition"
                onClick={() => setDeletProductPanle(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded font-medium transition"
                onClick={()=>{deleteProduct(selectedProductId), setDeletProductPanle(false)}}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example Product Card */}
        {products.map((product)=>{
          return (
            <div key={product._id} className="bg-white border border-gray-100 rounded-2xl shadow-lg p-6 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl">
              <img
                src={
                  product.images &&
                  product.images[0] &&
                  product.images[0].data
                    ? `data:image/png;base64,${btoa(
                        product.images[0].data.reduce((data, byte) => data + String.fromCharCode(byte), '')
                      )}`
                    : "https://via.placeholder.com/150"
                }
                alt={product.name}
                className="w-32 h-32 object-cover mb-4 rounded mx-auto"
              />
              <div className="w-full flex flex-col items-start">
                <h2 className="text-xl font-semibold text-[#1F1B16]">{product.name}</h2>
                <p className="text-gray-600 mt-2">Ad at : {new Date(product.createdAt).toLocaleDateString()}</p>
                <p className="text-lg font-bold text-[#1F1B16] mt-4"> ₹ {product.price}</p>
                <div className="flex mt-4 gap-4">
                  <button onClick={()=>{navigate( `/editProduct/${product._id}`),setToLocalStorage(product) }} className="mt-2 bg-[#1F1B16] text-white px-4 py-2 rounded hover:bg-[#3A2F24] transition">
                    Edit
                  </button>
                  <button onClick={()=>{setDeletProductPanle(true),setSelectedProductId(product._id)}} className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminOdersPanle;
