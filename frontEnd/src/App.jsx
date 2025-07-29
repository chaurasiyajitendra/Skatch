import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import 'remixicon/fonts/remixicon.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import UserProtect from './component/UserProtect'
import AdminPanle from './pages/AdminPanle'
import Shop from './pages/Shop'
import SingleProduct from './pages/SingleProduct'
import Cart from './pages/Cart'
import OderEdit from './component/OderEdit'
import CheckOut from './pages/CheckOut'
import AboutUs from './pages/Aboutus'
import Contact from './pages/Contectus'



const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/shop' element={<Shop/>} />
        <Route path='/about' element={<AboutUs/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/cart' element={<UserProtect ><Cart/></UserProtect>}/>
        <Route path='/checkout' element={<UserProtect><CheckOut/></UserProtect>} />
        <Route path='/editProduct/:id' element={<UserProtect><OderEdit/></UserProtect>} />
        <Route path='/product/:id' element={<SingleProduct />} />
        <Route path='/profile' element={<UserProtect><Profile/></UserProtect> } />
        <Route path='/admin' element={<UserProtect><AdminPanle/></UserProtect>}/>
      </Routes>
    </div>
  )
}

export default App
