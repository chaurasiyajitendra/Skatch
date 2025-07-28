// src/pages/Contact.jsx
import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-gray-100 px-8 py-16">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-4xl font-semibold border-b border-gray-700 pb-4">
          Contact Us
        </h1>
        <div className="space-y-6">
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-medium text-white mb-2">Customer Support</h2>
            <p className="text-gray-400">Have a question or need help with an order? We’re here for you.</p>
            <p className="mt-2 text-gray-300">
              📧 Email: <span className="text-indigo-400">support@skatchluxury.com</span><br />
              📞 Phone: +91-9876543210
            </p>
          </div>

          <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-medium text-white mb-2">Visit Us</h2>
            <p className="text-gray-400">We’re headquartered in the heart of elegance.</p>
            <p className="mt-2 text-gray-300">
              🏢 Skatch HQ,<br />
              7th Floor, Iconic Towers,<br />
              Mumbai, Maharashtra, India – 400001
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
