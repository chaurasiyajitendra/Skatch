// src/pages/AboutUs.jsx
import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-gray-100 px-8 py-16">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-4xl font-semibold border-b border-gray-700 pb-4">
          About Skatch
        </h1>
        <p className="text-lg leading-relaxed text-gray-300">
          Skatch is not just a marketplace — it's a movement. Born out of a passion for timeless fashion, we curate exclusive luxury bags from the world’s most iconic brands like Gucci, Prada, and Louis Vuitton. Every product we offer is a statement of class, elegance, and exclusivity.
        </p>
        <p className="text-lg leading-relaxed text-gray-400">
          We believe in authenticity, craftsmanship, and the confidence a premium accessory brings. Our team handpicks each product to ensure only the finest collections reach you — because you deserve nothing but the best.
        </p>
        <div className="border-t border-gray-700 pt-6 text-gray-500 text-sm">
          Skatch — Where Luxury Meets Legacy.
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
