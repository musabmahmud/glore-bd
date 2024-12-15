import React, { useContext } from 'react'
import { FaHome, FaMapPin, FaRegUserCircle, FaShoppingCart, FaStarOfDavid } from 'react-icons/fa'
import { NavLink, useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { AiFillProduct } from 'react-icons/ai'
import { RiCustomerService2Line, RiTeamLine } from 'react-icons/ri'

const MobileMenu = ({ isProductPage }) => {


    const location = useLocation();
    const isHome = location.pathname === "/";
    const isCollection = location.pathname === "/collections";
    const isAbout = location.pathname === "/about";
    const isContact = location.pathname === "/contact";

    const { setCartMenu, totalQuantity } = useContext(ShopContext);

    return (
        <div className={`right-0 bottom-0 left-0 z-40 fixed sm:hidden bg-gradient-to-t from-gray-50 to-white shadow-lg border-t w-full  ${isProductPage && 'sm:block hidden'}`}>
            <div className="relative flex justify-between items-center px-5 py-3">
                <NavLink className="flex flex-col items-center group" to="/">
                    <FaHome className={`group-hover:text-pink w-6 h-6 ${isHome && 'text-pink'} transition duration-200 ease-in-out text-gray-600`} />
                    <span className={`group-hover:text-pink ${isHome && 'text-pink'} text-xs transition-all duration-500 ease-in-out text-gray-600`}>Home</span>
                </NavLink>
                <NavLink className="flex flex-col items-center mr-10 group" to="/collections">
                    <FaStarOfDavid className={`group-hover:text-pink w-6 h-6 ${isCollection && 'text-pink'} transition duration-200 ease-in-out text-gray-600`} />
                    <span className={`group-hover:text-pink ${isCollection && 'text-pink'} text-xs transition-all duration-500 ease-in-out text-gray-600`}>collection</span>
                </NavLink>
                <NavLink to='/about' className="flex flex-col items-center ml-10 group">
                    <RiTeamLine className={`group-hover:text-pink w-6 h-6 ${isAbout && 'text-pink'}`} />
                    <span className={`group-hover:text-pink ${isAbout && 'text-pink'} text-xs transition-all duration-500 ease-in-out text-gray-600`}>About US</span>
                </NavLink>
                <NavLink to='/contact' className="flex flex-col items-center group">
                    <RiCustomerService2Line className={`group-hover:text-pink w-6 h-6 ${isContact && 'text-pink'}`} />
                    <span className={`group-hover:text-pink ${isContact && 'text-pink'} text-xs transition-all duration-500 ease-in-out text-gray-600`}>Contact</span>
                </NavLink>
                <button onClick={() => setCartMenu(true)} className="bottom-8 left-1/2 absolute flex justify-center items-center border-2 border-gray-200 bg-gray-100 hover:bg-gray-200 shadow-lg hover:shadow-xl rounded-full w-14 h-14 transform transition -translate-x-1/2 duration-300 ease-in-out">
                    <FaShoppingCart size={20} />
                    <span className={`inline-flex top-0 right-0 absolute justify-center items-center bg-sky-400 rounded-full w-5 h-5 ${totalQuantity > 0 && 'animate-ping'}`}></span>
                    <span className="top-0 right-0 absolute flex justify-center items-center bg-pink rounded-full w-5 h-5 text-white text-xs">{totalQuantity}</span>
                </button>
            </div>
        </div>
    )
}

export default MobileMenu