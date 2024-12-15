
import { useContext, useEffect, useState } from 'react';
import logo from '/nav_logo.png';
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from '../context/ShopContext';
import MobileBottomMenu from './MobileBottomMenu';
import Cart from '../pages/Cart';
const Navbar = ({ isProductPage }) => {

    const [visible, setVisible] = useState(false);

    const { showSearch, setShowSearch, totalQuantity, setCartMenu, cartMenu } = useContext(ShopContext);

    const [scrollNav, setScrollNav] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setScrollNav(true);
            } else {
                setScrollNav(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={`top-0 left-0 right-0 bg-white z-50 transition-shadow duration-500 ${scrollNav && 'shadow-lg'} ${isProductPage ? 'sm:block hidden' : 'sticky'}`}>
            <nav className='flex justify-between items-center px-1 py-1 sm:py-2 font-medium container mx-auto'>
                {/* logo  */}
                <Link to='/'><img src={logo} className='w-36' alt="Logo" />
                </Link>
                {/* Nav Items  */}
                <div className='sm:flex gap-5 hidden text-gray-500 text-sm'>
                    <NavLink to="/" className="flex flex-col items-center gap-1">
                        <p>HOME</p>
                        <hr className='hidden bg-gray-500 border-none w-2/4 h-[1.5px]' />
                    </NavLink>

                    <NavLink to="/collections" className="flex flex-col items-center gap-1">
                        <p>COLLECTIONS</p>
                        <hr className='hidden bg-gray-500 border-none w-2/4 h-[1.5px]' />
                    </NavLink>

                    <NavLink to="/about" className="flex flex-col items-center gap-1">
                        <p>ABOUT</p>
                        <hr className='hidden bg-gray-500 border-none w-2/4 h-[1.5px]' />
                    </NavLink>

                    <NavLink to="/contact" className="flex flex-col items-center gap-1">
                        <p>CONTACT</p>
                        <hr className='hidden bg-gray-500 border-none w-2/4 h-[1.5px]' />
                    </NavLink>
                </div>

                <div className='flex items-center gap-6'>

                    {/* search bar */}
                    <img onClick={() => setShowSearch(!showSearch)} src='search_icon.png' alt="search" className='w-5 cursor-pointer hidden sm:block' />

                    {/* dropdown menu for profile and logout  */}

                    {/* sidebar menu  */}
                    <img onClick={() => setVisible(true)} src="menu_icon.png" className='hidden w-5 cursor-pointer' alt="" />

                    {/* Login Section  */}
                    {/* <div className='relative group hidden sm:block'>
                        <Link to='/login'>
                            <img src={assets.profile_icon} alt="" className='w-5 cursor-pointer' />
                        </Link>
                        <div className='group-hover:block right-0 z-20 absolute hidden pt-4 dropdown-menu'>
                            <div className='flex flex-col gap-2 bg-slate-100 px-5 py-3 rounded w-36 text-gray-500'>
                                <Link className='hover:text-pink'>My Profile</Link>
                                <Link to='/orders' className='hover:text-pink'>Orders</Link>
                                <Link className='hover:text-pink'>Logout</Link>
                            </div>
                        </div>
                    </div> */}

                    {/* shopping cart  */}
                    <div onClick={() => setCartMenu(true)} className='sm:block relative hidden cursor-pointer'>
                        <img src='cart_icon.png' className='w-5 min-w-5' alt="" />
                        <span className={`inline-flex top-3 -right-3 absolute justify-center items-center bg-sky-400 rounded-full w-5 h-5 font-semibold text-md text-white ${totalQuantity > 0 && 'animate-ping'}`}></span>
                        <span className="top-3 -right-3 absolute flex justify-center items-center bg-pink rounded-full w-5 h-5 text-white text-xs">{totalQuantity}</span>
                        {/* <span className='right-[-5px] bottom-[-5px] absolute bg-pink rounded-full w-4 text-[8px] text-center text-white leading-4 aspect-square'>{totalQuantity}</span> */}
                    </div>
                </div>

                {/* sidebar Menu*/}
                <div className={`top-0 bottom-0 z-50 bg-white absolute transition-all sm:hidden duration-1000 w-full shadow-md h-full left-0 right-0 ${visible ? 'translate-x-0 ' : '-translate-x-full'}`}>
                    <MobileBottomMenu setVisible={setVisible} />
                </div>

                {/* Cart Menu  */}
                <div className={`top-0 right-0 bottom-0 z-[100] bg-white fixed transition-all duration-1000 w-[350px] shadow-md h-full ${cartMenu ? 'translate-x-0' : 'translate-x-full'}`}>
                    <Cart setCartMenu={setCartMenu} />
                </div>

            </nav>
        </header>
    )
}

export default Navbar