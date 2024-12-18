import React from 'react';
import { Routes, Route, Navigate, useLocation, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Collections from './pages/Collections'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Order from './pages/Order'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import SearchBar from './components/SearchBar'
import Checkout from './pages/Checkout'
import ThankYou from './pages/ThankYou'
import Dashboard from './admin/dashboard'
import ProtectedRoute from './admin/ProtectedRoute'
import MobileMenu from './components/MobileMenu'

// Cart Successful Notification 
import { Toaster } from 'react-hot-toast';


function App() {

  const location = useLocation();

  // Check if the current route is not the product page
  const isProductPage = location.pathname.startsWith('/singleproduct/');
  const isProtectedPage = location.pathname.startsWith('/admin');  // Change '/admin' if other protected pages exist


  const isHome = location.pathname.startsWith('');
  const isCollections = location.pathname.startsWith('/collections');

  // Define routes where the footer should not appear
  const noFooterRoutes = ['/singleproduct', '/cart', '/checkout', '/collections', '/orders'];
  // Check if the current route matches any no-footer routes
  const showFooter = noFooterRoutes.some((route) => location.pathname.startsWith(route));


  const noMobileFooterRoutes = ['/singleproduct', '/cart', '/checkout', '/orders'];
  const showMobileMenu = noMobileFooterRoutes.some((route) => location.pathname.startsWith(route));

  return (
    <div className='relative'>
      {!isProtectedPage && <Navbar isProductPage={isProductPage} />}
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collections' element={<Collections />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/singleproduct/:slug' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/orders' element={<Order />} />
          <Route path='/thankyou/:OrderId' element={<ThankYou />} />

          <Route path='/login' element={<Login />} />
          {/* Admin Panel  */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to='/' replace />} />
        </Routes>
      <div className='relative overflow-x-hidden'>
        {!showMobileMenu && <MobileMenu />}
        {!showFooter && <Footer />}
      </div>
    </div>
  )
}

export default App
