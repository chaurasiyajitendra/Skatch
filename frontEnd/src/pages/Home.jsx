import React from 'react'
import Navbar from '../component/Navbar'
import { Link } from 'react-router-dom'
import { Typewriter } from 'react-simple-typewriter'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-[#0E0E0E] text-white px-10 py-4 font-serif overflow-hidden">
      <Navbar />

      <div className="w-full h-[90vh] flex flex-col justify-center items-center text-center">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-7xl md:text-9xl font-bold text-[#D4AF7F] tracking-tight relative"
        >
          Skatch
          {/* Glow Border */}
          <span className="absolute inset-0 border-2 border-[#D4AF7F] rounded-full blur-md opacity-20"></span>
        </motion.h1>

        {/* Sub Heading / Typewriter */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-6 text-xl md:text-2xl text-[#e0e0e0] max-w-2xl"
        >
          <Typewriter
            words={['Discover timeless elegance with SKATCH — where craftsmanship meets style.']}
            loop
            cursor
            cursorStyle="_"
            deleteSpeed={0}
            typeSpeed={60}
            delaySpeed={1200}
          />
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <Link
            to="/shop"
            className="mt-12 inline-block px-8 py-3 text-lg font-medium border border-[#D4AF7F] text-[#D4AF7F] rounded-full hover:bg-[#D4AF7F] hover:text-black transition duration-300"
          >
            Explore Collection
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Home
