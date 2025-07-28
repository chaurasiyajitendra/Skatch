import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showPanle, setShowPanle] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      const Products = await axios.get(`${import.meta.env.VITE_URL}/product/all`);
      setProducts(Products.data);
    };
    getProducts();
  }, []);

  const handleProductClick = async (productId) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/product/single/${productId}`);
      if (res.status === 200) {
        localStorage.setItem("product", JSON.stringify(res.data));
        navigate(`/product/${productId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#0e0e0e] min-h-screen text-white font-sans">
      {/* Navbar */}
      <div className="bg-black px-6 py-4 shadow-lg z-50 relative">
        <Navbar />
      </div>

      {/* Banner */}
      <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          className="w-full h-full object-cover brightness-[.4]"
          src="https://media.gucci.com/content/HeroRegularStandard_3200x1350/1695364233/HeroRegularStandard_FW-Tier2-Embossing-Sept23-009_001_Default.jpg"
          alt="Luxury Banner"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black opacity-70" />
        <div className="absolute text-center z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-xl">
            Elevate Your Journey with Skatch
          </h1>
          <p className="text-lg md:text-xl text-[#d4af7f]">
            Luxury luggage that reflects your elegance.
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-8 py-16 bg-[#0e0e0e]">
        {products.map((item, index) => {
          const imageData = item.images?.[0]?.data;
          const base64Image = imageData
            ? `data:image/png;base64,${btoa(
                imageData.reduce((data, byte) => data + String.fromCharCode(byte), "")
              )}`
            : "https://via.placeholder.com/300";

          return (
            <div
              key={item._id || index}
              onClick={() => handleProductClick(item._id)}
              className="cursor-pointer bg-[#1a1a1a] border border-[#2c2c2c] rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300 group"
            >
              <div onMouseEnter={()=>setShowPanle(item._id)} onMouseLeave={()=>setShowPanle(false)} className="h-64 bg-[#111] flex items-center justify-center overflow-hidden">
                <img
                  src={base64Image}
                  alt={item.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className={`p-4 space-y-2 h-28 `}>
                <div className="h-14">
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                </div>
                <p className={`text-[#d4af7f] text-base font-medium ${showPanle === item._id? '': 'hidden' }`}>₹{item.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
