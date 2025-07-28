import axios from 'axios';
import Navbar from '../component/Navbar';
import { UserDataContex } from '../contex/UserContex';
import {toast} from 'react-hot-toast';

const SingleProduct = () => {
  const product = JSON.parse(localStorage.getItem('product'));

  const imageBuffer = product?.images?.[0]?.data;
  const base64Image = imageBuffer
    ? `data:image/jpeg;base64,${btoa(
        String.fromCharCode(...new Uint8Array(imageBuffer))
      )}`
    : '';

    const handleAddToCart = async() => {
        const res = await axios.get(`${import.meta.env.VITE_URL}/user/addToCart/${product._id}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        } )
        if(res.status === 200)
        {
        toast.success(`${product.name} added to cart successfully`, {
          position: "top-right",
          duration: 3000,
          style: {
            background: "#121212",         // Deep luxury black
            color: "#e3c990",              // Soft golden-beige
            border: "1px solid #2a2a2a",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "500",
            padding: "12px 18px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
            whiteSpace: "nowrap",          // Keeps it in one line
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
          icon: "👜",  // Luxury bag emoji for subtle branding feel
        });
        }
        else {
            alert('Failed to add product to cart');
        }
    }

  return (
    <div className="bg-[#0e0e0e] min-h-screen text-[#f5f5f5] font-sans">
      <div className="bg-black shadow-md px-6 py-4">
        <Navbar />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-[#1a1a1a] rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row gap-10 items-center">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <img
              src={base64Image}
              alt={product.name}
              className="rounded-xl shadow-lg max-w-full max-h-[480px] object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-4xl font-bold">{product.name}</h2>
            <p className="text-2xl text-[#d4af7f] font-semibold">₹{product.price}</p>
            <p className="text-gray-300 leading-relaxed">{product.description}</p>

            <button onClick={()=>{handleAddToCart()}} className="mt-6 bg-[#d4af7f] text-black py-3 px-6 rounded-full text-lg hover:bg-[#b9965d] transition duration-300 w-full md:w-1/2">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
