import React, { useEffect, useState } from "react";
import axios from "axios";

const PastOrders = ({ onClose }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_URL}/user/myOrders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrders(res.data); // directly setting the array
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="absolute inset-0 bg-gray-950 text-gray-100 z-50 p-6 md:p-10 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-800 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-white">My Orders</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-sm border border-gray-700 px-3 py-1 rounded-lg hover:border-red-500 transition"
        >
          Close
        </button>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <p className="text-gray-400 text-sm">You have no orders yet.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-[#111111] border border-gray-800 p-6 rounded-xl shadow-sm hover:shadow-lg transition duration-200"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-indigo-400">
                  Order #{order._id.slice(-6)}
                </h3>
              </div>

              {/* Order Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {order.items?.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 bg-[#1a1a1a] p-4 rounded-lg border border-gray-800 hover:border-indigo-500 transition"
                  >
                    {item?.productId?.images?.[0]?.data ? (
                      <img
                        src={`data:${item.productId.images[0].contentType};base64,${btoa(
                          String.fromCharCode(...item.productId.images[0].data)
                        )}`}
                        alt={item.productId?.name}
                        className="w-16 h-16 object-cover rounded-md border border-gray-700"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-800 flex items-center justify-center text-gray-500 text-xs rounded-md border border-gray-700">
                       Your Oder No more longer avilable in store
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-100">
                        {item.productId?.name}
                      </h4>
                      <p className="text-gray-400 text-xs">
                        Qty: {item.quantity} × ₹{item.productId?.price}
                      </p>
                      <p className="text-indigo-400 font-medium text-sm mt-1">
                        ₹{item.quantity * (item.productId?.price || 0)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Date */}
              <div className="text-right mt-4 text-gray-300 text-sm">
                Ordered on{" "}
                <span className="text-gray-400 font-medium">
                  {new Date(order.orderDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PastOrders;
