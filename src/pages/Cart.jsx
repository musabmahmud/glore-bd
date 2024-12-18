import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { FaArrowRight, FaMinus, FaPlus } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { assets } from '../assets/assets';
const CartMenu = () => {

    const { currency, totalAmount, cartProducts, handleRemoveFromCart, quantityIncrement, quantityDecrement, clearAllCart, setCartMenu, cloudAPI } = useContext(ShopContext);

    return (
        <div className='p-5 h-full w-full relative z-50'>
            <div className='flex justify-between items-center gap-3 p-3 cursor-pointer bg-gray-200 rounded mb-5'>
                <p>Shopping Cart</p>
                <img onClick={() => setCartMenu(false)} src={assets.cross_icon} className="h-4" alt="Shopping Cart" />
            </div>
            {/*Cart Products  */}
            <div className='overflow-y-scroll pb-2 h-full w-full no-scrollbar'>
                {
                    cartProducts?.map((item, index) => (
                        <div key={index} className='py-4 gap-5 border-b flex flex-row justify-between'>
                            <div className='w-1/3'>
                                <img src={`${cloudAPI}/image/${item.image}`} className='w-[100px] h-[120px] rounded' alt={item.name} />
                            </div>
                            <div className='text-black w-2/3'>
                                <p className='font-medium text-pink mb-2'>{item.name}</p>
                                <div className="flex justify-between items-center">
                                    <p>{currency}{item.price}</p>
                                    <p>x</p>
                                    <div className="flex items-center justify-center border rounded-s-lg rounded-r-lg gap-1 px-1">
                                        <button type="button" onClick={() => quantityDecrement(item)}>
                                            <FaMinus size={10} />
                                        </button>
                                        <p className='bg-gray-100 px-2 py-1'>{item.quantity}</p>
                                        <button type="button" onClick={() => quantityIncrement(item)}>
                                            <FaPlus size={10} />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <p className='text-pink'><span>{currency}</span> {item.price * item.quantity}</p>
                                    <button onClick={() => handleRemoveFromCart(item.id)} className=''>
                                        <RiDeleteBin6Line size={20} className='text-red-600' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* Footer Checkout*/}
            <div className="pt-2 pb-4 fixed bottom-0 left-5 right-5 bg-white">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-lg font-semibold">Subtotal:</p>
                    <p className="text-lg font-semibold">৳{totalAmount}</p>
                </div>
                <div className="flex justify-between items-center gap-5">
                    <div className=" bg-gray-300 py-2 rounded text-black w-full text-center">
                        <button onClick={clearAllCart}>Clear All</button>
                    </div>
                    <Link to='/checkout' onClick={() => setCartMenu(false)} className="flex items-center justify-center gap-2 bg-pink py-2 rounded text-white w-full">
                        <span>এগিয়ে যান</span> <FaArrowRight className=' animate-pulse' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CartMenu