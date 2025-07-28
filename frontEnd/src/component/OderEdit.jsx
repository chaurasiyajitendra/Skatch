import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const navigate = useNavigate();
  const product = JSON.parse(localStorage.getItem('product'))

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
  });

  const handleChange = (e) => {

    const { name, value, files } = e.target;
    if (name === 'image') {
      setProductData({ ...productData, image: files[0] });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();

  if (productData.name) formData.append("name", productData.name);
  if (productData.description) formData.append("description", productData.description);
  if (productData.price) formData.append("price", productData.price);
  if (productData.category) formData.append("category", productData.category);
  if (productData.image) formData.append("image", productData.image);
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_URL}/product/editProduct/${product._id}`,formData,
      {
        headers: {
          Authorization:`Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.status === 200) {
      toast.success(`${product.name} updated successfully`);
      navigate("/admin");
    }
  } catch (err) {
    console.error("Update Error:", err);
    toast.error("Update failed");
  }
};


  return (
    <form onSubmit={(e)=>{handleSubmit(e)}} className="p-10 bg-[#F8FAFC] min-h-screen">
      <h2 className="text-3xl font-semibold mb-10 text-gray-800">Edit Product</h2>

      <div className="grid grid-cols-2 gap-12 bg-white p-8 rounded-2xl shadow-xl">
        {/* 🔵 Left Side: Old Values */}
        <div className="space-y-8 pr-6 border-r">
          <h3 className="text-lg font-medium text-gray-500 mb-4">Current Values</h3>

          <div>
            <p className="text-sm text-gray-400 mb-1">Name</p>
            <div className="text-base font-medium text-gray-700 bg-gray-50 px-4 py-2 rounded-md">
              {product.name}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-1">Description</p>
            <div className="text-base text-gray-700 bg-gray-50 px-4 py-2 rounded-md whitespace-pre-wrap">
              {product.description}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-1">Price</p>
            <div className="text-base font-medium text-gray-700 bg-gray-50 px-4 py-2 rounded-md">
              ₹{product.price}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-1">Category</p>
            <div className="text-base text-gray-700 bg-gray-50 px-4 py-2 rounded-md">
              {product.category}
            </div>
          </div>
        </div>

        {/* 🟡 Right Side: Editable Inputs */}
        <div className="space-y-8">
          <h3 className="text-lg font-medium text-gray-700 mb-4">New Values</h3>

          <div>
            <label className="block text-sm text-gray-600 mb-1">New Name</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              placeholder="Enter new name"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">New Description</label>
            <textarea
              name="description"
              rows="4"
              value={productData.description}
              onChange={handleChange}
              placeholder="Enter new description"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">New Price</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              placeholder="₹ Enter price"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">New Category</label>
            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select category</option>
              <option value="HandBags">Hand Bags</option>
              <option value="SideBags">Side Bags</option>
              <option value="BagPack">BagPack</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Upload New Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full border border-gray-200 px-3 py-2 rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 flex gap-4">
        <button
          type="submit"
          className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-900 transition duration-200 text-sm font-medium"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={() => navigate('/admin')}
          className="bg-red-100 text-red-600 px-8 py-3 rounded-xl hover:bg-red-200 transition duration-200 text-sm font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProduct;
