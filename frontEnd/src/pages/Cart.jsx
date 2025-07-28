import React, { useEffect } from 'react';
import { ShoppingCart, X, CreditCard, ArrowLeft, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';



const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setcartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState('');


  
  useEffect(() => {
    const getCartItem = async () =>{
        try{
            const res = await axios.get(`${import.meta.env.VITE_URL}/user/getCart`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        if(res.status === 200)
        {
            setcartItems(res.data.cart);
        }

        }catch(error)
        {
            console.error("Error fetching cart items:", error);
        }
    }
    getCartItem();
  }, [])

  useEffect(()=>{
    const totalPrice = ()=>{
      let total = 0;
      cartItems.forEach((e)=>{
        total += e.productId.price
      })
      setTotalPrice(total)
    }
    totalPrice();
  },[cartItems])

  const handleRemoveProduct = async (productId) => {
    try{
      const res = await axios.get(`${import.meta.env.VITE_URL}/user/removeFromCart/${productId}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.status === 200){
        setcartItems(cartItems.filter(item => item._id !== productId));
        toast.success("Product removed from cart successfully", {
          position: "top-right",
          duration: 3000,
          style: {
            background: "#121212",
            color: "#e3c990",
            border: "1px solid #2a2a2a",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "500",
            padding: "12px 18px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
          },
          icon: "❌", // Custom icon for removal
        });
      }
    }catch(error){
      console.log("Error removing product from cart:", error); 
    }

  }
  


  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-100 font-sans p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Top Nav */}
        <div className="flex justify-between items-center mb-10">
          <button
            onClick={() => navigate('/shop')}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#d5b277] transition"
          >
            <ArrowLeft size={18} /> Back to Shopping
          </button>
          <h1 className="text-3xl font-semibold text-gray-100 tracking-wide flex items-center gap-3">
            <ShoppingCart size={26} className="text-[#d5b277]" /> Cart
          </h1>
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#d5b277] transition"
          >
            <User size={18} /> Your Profile
          </button>
        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => (             
                <div
                  key={item._id}
                  className="flex items-center bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-4 shadow-md hover:shadow-lg transition"
                >
                <img
                src={`data:image/jpeg;base64,${item.productId.images[0]}`} // Assuming buffer image
                alt={item.productId.name}
                className="w-24 h-24 object-cover rounded-xl mr-4 border border-[#2a2a2a]"
                />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white">
                      {item.productId.name}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">Qty: {item.quantity}</p>
                    <p className="text-[#d5b277] mt-2 font-medium">
                      ₹{item.productId.price}
                    </p>
                  </div>
                  <button onClick={()=>{handleRemoveProduct(item._id)}} className="text-red-400 hover:text-red-300 transition duration-200">
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Checkout */}
            <div className="mt-10 flex justify-between items-center bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-2xl shadow-md">
              <div>
                <h2 className="text-lg text-gray-300">Total</h2>
                <p className="text-2xl text-[#d5b277] font-semibold mt-1">
                  ₹{totalPrice}
                </p>
              </div>
              <button
                onClick={() => navigate('/checkout',{state:{cartItems,totalPrice}})}
                className="flex items-center gap-2 px-6 py-3 bg-[#d5b277] text-black font-semibold rounded-xl hover:bg-[#e0c391] transition"
              >
                <CreditCard size={18} /> Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
