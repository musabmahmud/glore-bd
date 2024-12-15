import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

const CartProduct = () => {

    const { currency, cartProducts, handleRemoveFromCart, quantityIncrement, quantityDecrement, cloudAPI } = useContext(ShopContext);

    return (
        <>
            <div className='flex justify-between items-center p-3 cursor-pointer bg-gray-200 rounded'>
                <p>Shopping Items</p>
            </div>
            {cartProducts?.map((item, index) => (
                <div key={index} className='py-4 gap-2 border-b flex flex-row justify-between'>
                    <div className='w-1/3'>
                        <img src={`${cloudAPI}/image/${item.image}`} className='w-[100px] h-[100px] rounded' alt={item.name} />
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
            ))}
        </>
    )
}

export default CartProduct