import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal';
import { useNavigate } from "react-router-dom";
import CartProduct from '../components/CartProduct';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';


const Checkout = () => {

    const navigate = useNavigate();

    const { currency, delivery_fee_Inside, delivery_fee_Outside, totalAmount, clearAllCart, cartItems } = useContext(ShopContext);

    // Bangla Convert Code 
    const toBn = (number) => {
        return number.toString().replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d])
    }


    const [method, setMethod] = useState('cod');

    const [deliveryCharge, setDeliveryCharge] = useState(delivery_fee_Inside);


    const productIDs = cartItems.map(item => item.productId);
    const productQty = cartItems.map(item => item.quantity);

    const productPostApi = 'https://admin.glorebd.com/api/public/order/create'

    // ------------------validation---------------
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        deliveryCharge: '',
        address: '',
        note: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };



    const validateForm = (data) => {

        const errors = {};

        if (!data.name) {
            errors.name = 'আপনার নাম দিন';
        } else if (data.name.length < 3) {
            errors.name = 'সর্বনিম্ন ৩ অক্ষরের নাম দিন';
        }

        let validPhone = /^(\+8801|01)[3-9]\d{8}$/;

        if (!data.phone) {
            errors.phone = 'আপনার ফোন নম্বর দিন';
        } else if (!validPhone.test(data.phone)) {
            errors.phone = 'আপনার সঠিক ১১ সংখ্যার ফোন নম্বর দিন';
        }

        if (!data.address) {
            errors.address = 'আপনার ঠিকানা দিন';
        }

        return errors;
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validateForm(formData);
        setErrors(newErrors);

        let isOk = Object.keys(newErrors).length;

        if (isOk == 0) {
            const formPostData = {
                product_ids: productIDs.toString(),
                s_product_qty: productQty.toString(),
                c_name: e.target.name.value,
                c_phone: e.target.phone.value,
                address: e.target.address.value,
                cod_amount: totalAmount,
                delivery_charge: deliveryCharge,
            }

            console.log(formPostData);

            axios.post(productPostApi, formPostData)
                .then(function (response) {
                    const OrderId = response.data?.data?.id; // Extract the OrderId
                    if (OrderId) {
                        clearAllCart();
                        navigate(`/thankyou/${OrderId}`); // Navigate to the thank-you page
                    } else {
                        console.error("Order ID is missing from the response");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            ;
        }
    };

    return (
        <div className='mx-auto px-2 lg:px-0 container relative'>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col-reverse sm:flex-row justify-between gap-10 lg:pb-10'>
                    {/* Left Side  */}
                    <div className="sm:w-1/2 shadow p-5 mb-52 sm:mb-0">
                        <CartProduct />
                    </div>

                    {/* Right Side  */}
                    <div className="flex flex-col gap-4 sm:w-1/2 shadow p-5">
                        <div className="">
                            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                            <p className='text-xs text-gray-500'>অর্ডার কনফার্ম করতে আপনার নাম, ঠিকানা, মোবাইল নাম্বার লিখে অর্ডার কনফার্ম করুন বাটনে ক্লিক করুন</p>
                        </div>
                        <div>
                            <label htmlFor="name" className="block mb-1 text-sm font-bold">আপনার নাম*</label>
                            <input className={`border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded py-1.5 px-3.5 w-full`} type="text" name="name" placeholder='Enter Full Name' onChange={handleChange} />
                            {
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.name}</p>
                            }

                        </div>
                        <div>
                            <label htmlFor="phone" className="block mb-1 text-sm font-bold">আপনার ফোন নম্বর*</label>
                            <input className={`border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded py-1.5 px-3.5 w-full`} type="text" name="phone" placeholder='Enter Contact Number' onChange={handleChange} />
                            {
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.phone}</p>
                            }
                        </div>
                        <div>
                            <label htmlFor="address" className="block mb-1 text-sm font-bold">আপনার ডেলিভারি ঠিকানা দিন*</label>
                            <textarea className={`border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded py-1.5 px-3.5 w-full`} type="text" name="address" placeholder='Enter Delivery Address' onChange={handleChange} />
                            {
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.address}</p>
                            }
                        </div>
                        <div>
                            <label htmlFor="deliveryCharge" className="block mb-1 text-sm font-bold">ডেলিভারি এলাকা</label>
                            <select onChange={e => setDeliveryCharge(e.target.value)} required name='deliveryCharge' className={`border-gray-300 border text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full p-2.5`}>
                                <option value={delivery_fee_Inside}>ঢাকার ভিতরে ৳{toBn(delivery_fee_Inside)}</option>
                                <option value={delivery_fee_Outside}>ঢাকার বাইরে ৳{toBn(delivery_fee_Outside)}</option>
                            </select>
                            {/* {
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.deliveryCharge}</p>
                            } */}
                        </div>
                        <div>

                            <label htmlFor="note" className="block mb-1 text-sm font-bold">গ্রাহক নোট</label>
                            <input className={`border ${errors.note ? 'border-red-500' : 'border-gray-300'} rounded py-1.5 px-3.5 w-full`} type="text" name="note" placeholder='Enter Your Note' onChange={handleChange} />
                            {
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.note}</p>
                            }
                        </div>
                        <div className="flex items-center justify-between gap-5">
                            <p>Payment Method</p>
                            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-3 cursor-pointer w-1/2">
                                <span className={`min-w-3.5 h-3.5 border rounded-full ${method == 'cod' ? 'bg-green-500' : ''}`}></span>
                                <span className='text-gray-400
                            mx-4 text-sm font-medium'>Cash On Delivery</span>
                            </div>
                        </div>
                        <div className="sm:block hidden">
                            <div className="text-2xl">
                                <Title text1={'CART'} text2={'TOTALS'} />
                            </div>
                            <CartTotal deliveryCharge={deliveryCharge} />
                        </div>
                        <button type='submit' className='bg-pink text-white text-sm px-8 py-3 rounded hidden sm:block'>অর্ডারটি নিশ্চিত করুন</button>
                    </div>
                </div>
                {/* Footer Cart Menu  */}
                <div className="right-0 bottom-0 left-0 z-40 fixed sm:hidden bg-gradient-to-t from-gray-50 to-white shadow-lg px-6 py-4 w-full">
                    <div className='pb-3'>
                        <h2 className="text-xl font-semibold">Cart Total</h2>
                        <CartTotal deliveryCharge={deliveryCharge} />
                    </div>
                    <button className="w-full bg-pink shadow-lg py-2 rounded-full font-medium text-center text-lg text-white">অর্ডারটি নিশ্চিত করুন</button>
                </div>
            </form>
        </div>
    )
}

export default Checkout