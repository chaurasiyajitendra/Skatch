import React, { useContext, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserDataContex } from "../contex/UserContex";
import jsPDF from "jspdf"; // Optional, if you want PDF generation later
import toast from "react-hot-toast";
import axios from "axios";

const CheckoutPanel = () => {
  const { user } = useContext(UserDataContex);
  const navigate = useNavigate();
  const { state } = useLocation();
  const cartItems = state?.cartItems || [];
  

  const total = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postCode, setPostCode] = useState("");

  const invoice = () =>{
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Skatch - Invoice / Bill", 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${user.fullName}`, 20, 40);
    doc.text(`Phone: ${user.phone}`, 20, 50);
    doc.text(`Address: ${street}, ${city}, ${postCode}, ${country}`, 20, 60);
    doc.text(`Payment: Cash On Delivery`, 20, 70);

    doc.text(`\nOrder Summary:\n`, 20, 85);

    let currentY = 95;
    cartItems.forEach((item, index) => {
      const line = `${index + 1}. ${item.productId.name} - ₹${item.productId.price.toLocaleString()} x ${item.quantity}`;
      doc.text(line, 20, currentY);
      currentY += 10;
    });

    doc.text(`\nTotal: ₹${total.toLocaleString()}`, 20, currentY + 10);

    // Trigger download
    doc.save('Invoice.pdf');
  }

  const showOrderToast = () => {
  toast.success(
    <>
      <p className="text-base font-medium text-black">Order placed successfully!</p>
      <p className="text-sm text-gray-700 mt-1">Your invoice is downloading...</p>
    </>,
    {
      position: 'top-right',
      duration: 5000,
      style: {
        background: '#F4F3EF',
        border: '1px solid #E6E3DA',
        padding: '16px',
        borderRadius: '12px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
      },
      iconTheme: {
        primary: '#CBAF75',
        secondary: '#F4F3EF',
      },
    }
  );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // invoice();
    try{
      const res = await axios.post(`${import.meta.env.VITE_URL}/user/chekout`,{},{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      if(res.status === 200)
      {
      showOrderToast(); 
      invoice();
      navigate('/shop');
      }
    }catch(err)
    {
      console.log(err);
    }

  };


  return (
    <div className="bg-[#0D0D0D] text-white p-8 max-w-3xl mx-auto rounded-2xl shadow-2xl border border-[#1F1F1F] font-sans">
      {/* Back Button */}
      <div
        className="flex items-center gap-2 mb-8 cursor-pointer"
        onClick={() => navigate("/cart")}
      >
        <ArrowLeft className="text-gray-400 w-5 h-5" />
        <span className="text-sm text-gray-400 hover:text-white">
          Back to Cart
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold mb-10 text-white tracking-wide">
        Checkout
      </h1>

      {/* Form Start */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-3"
      >
        <input
          type="text"
          placeholder="Full Name"
          value={user.fullName}
          readOnly
          className="checkout-input"
        />
        <input
          type="number"
          placeholder="Phone"
          value={user.phone}
          readOnly
          className="checkout-input"
        />
        <input
          type="text"
          required
          placeholder="Street Address"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className="col-span-full checkout-input"
        />
        <input
          type="text"
          placeholder="City"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="checkout-input"
        />
        <input
          type="text"
          required
          placeholder="Postal Code"
          value={postCode}
          onChange={(e) => setPostCode(e.target.value)}
          className="checkout-input"
        />
        <input
          type="text"
          required
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="col-span-full checkout-input"
        />

        {/* Order Summary */}
        <div className="col-span-full bg-[#141414] p-5 rounded-xl border border-[#2A2A2A] mt-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-100">
            Order Summary
          </h2>
          <div className="space-y-2">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-sm text-gray-300"
              >
                <span>{item.productId.name}</span>
                <span>
                  ₹{item.productId.price.toLocaleString()} × {item.quantity}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-[#333] mt-4 pt-4 flex justify-between font-semibold text-white">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
          <div className="border-t border-[#333] mt-4 pt-4 flex justify-between font-semibold text-white">
            <span>Payment Type</span>
            <span>COD</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-full w-full mt-2 bg-gradient-to-r from-[#CBAF75] to-[#F3E7BE] text-black text-lg font-semibold py-3 rounded-xl hover:opacity-90 transition tracking-wide shadow-md"
        >
          PLACE ORDER
        </button>
      </form>
    </div>
  );
};

export default CheckoutPanel;
