import React from 'react'
// Swiper JS
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { Pagination } from 'swiper/modules';
import { assets } from '../assets/assets';


const Hero = () => {
    return (
        <div className=''>
            <Swiper
                className="mySwiper w-full"
                // spaceBetween={30}
                effect={'fade'}
                pagination={true} modules={[Pagination]}
            >
                <SwiperSlide>

                    <div className="bg-gradient-to-b from-gray-50 to-gray-100 w-full sm:min-h-[500px]">
                        <div className='text-[#fff] flex items-center justify-between sm:w-[1000px] lg:w-[1200px] mx-auto px-2 sm:px-10'>
                            <div className='w-1/2 text-black space-y-2 sm:space-y-5 text-center'>
                                <h1 className='text-3xl font-bold lg:text-7xl leading-normal'>নতুন <span className='text-pink'>কালেকশন</span></h1>
                                {/*  */}
                                <p className='sm:pt-5 pb-0 text-sm md:text-xl'>✨ <span className="text-pink">GloreBD</span> - এর সাথে ফ্যাশনে পা রাখুন নতুন দিগন্তে! <br /><span className='hidden sm:block'>আমাদের এক্সক্লুসিভ নতুন কালেকশন এখন উপলব্ধ! আপনার প্রিয় ফ্যাশন স্টাইল খুঁজে নিন আর নিজেকে সাজান অনন্যভাবে। ❤️</span></p>
                                <div className='sm:pt-5'>
                                    <Link to="/collections" className='w-[150px] md:w-[250px] block text-center bg-gradient-to-r from-pink to-sky-300 px-8 py-3 rounded font-bold text-sm text-white mx-auto'>অর্ডার করুন</Link>
                                </div>
                            </div>
                            <div className='w-1/2 flex justify-end'>
                                <img src={assets.slider1} className='max-h-[600px]' alt="" />
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="bg-gradient-to-b from-gray-50 to-gray-100 w-full sm:min-h-[500px]">
                        <div className='text-[#fff] flex items-center justify-between sm:w-[1000px] lg:w-[1200px] mx-auto px-2 sm:px-10'>
                            <div className='w-1/2 text-black space-y-2 sm:space-y-5 text-center'>
                                <h1 className='text-3xl font-bold lg:text-7xl leading-normal'>নতুন <span className='text-pink'>কালেকশন</span></h1>
                                {/*  */}
                                <p className='sm:pt-5 pb-0 text-sm md:text-xl'>✨ <span className="text-pink">GloreBD</span> - এর সাথে ফ্যাশনে পা রাখুন নতুন দিগন্তে! <br /><span className='hidden sm:block'>আমাদের এক্সক্লুসিভ নতুন কালেকশন এখন উপলব্ধ! আপনার প্রিয় ফ্যাশন স্টাইল খুঁজে নিন আর নিজেকে সাজান অনন্যভাবে। ❤️</span></p>
                                <div className='sm:pt-5'>
                                    <Link to="/collections" className='w-[150px] md:w-[250px] block text-center bg-gradient-to-r from-pink to-sky-300 px-8 py-3 rounded font-bold text-sm text-white mx-auto'>অর্ডার করুন</Link>
                                </div>
                            </div>
                            <div className='w-1/2 flex justify-end'>
                                <img src={assets.slider1} className='max-h-[600px]' alt="" />
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            {/* <div className="z-20 absolute inset-0 flex flex-row-reverse justify-center items-center py-10 w-full h-full translate-y-1/2">
                <div className='text-[#414141]'>
                    <div className='flex items-center gap-2'>
                        <span className='bg-[#414141] w-8 md:w-11 h-[2px]'></span>
                        <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
                    </div>
                    <h1 className='sm:py-3 font-prata text-3xl lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
                        <span className='bg-[#414141] w-8 md:w-11 h-[1px]'></span>
                    </div>
                </div>
            </div> */}
            {/* Hero right side */}
            {/* absolute inset-0 bg-center  */}
            {/* <div>
                <img className='lg:rounded-xl w-full h-full' src={heroImage} alt="glore image" />
            </div> */}
        </div>
    )
}

export default Hero