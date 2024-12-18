import React from 'react'
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {

    const d = new Date();
    let year = d.getFullYear();

    return (
        <div className='bg-black'>
            <div className='justify-center items-center mx-auto px-2 lg:px-0 pt-[100px] pb-[100px] lg:pb-0 text-white container'>
                <div className="md:flex justify-between lg:gap-8 space-y-10 lg:space-y-0 pb-10">
                    <div>
                        <Link to='/'>
                            <img src={assets.logoFooter} alt="logo" className='w-40' />
                        </Link>
                    </div>
                    <div>
                        <p className="mb-5 font-medium text-xl">
                            Explore More
                        </p>
                        <ul className="flex flex-col gap-1 text-gray-400">
                            <li>New Arrivals</li>
                            <li>Best Sellers</li>
                            <li>Sale</li>
                        </ul>
                    </div>
                    <div>
                        <p className="mb-5 font-medium text-xl">
                            Client Experience
                        </p>
                        <ul className="flex flex-col gap-1 text-gray-400">
                            <li>Track Your Order</li>
                            <li>Returns & Exchanges</li>
                            <li>Customer Reviews</li>
                            <li>Privacy Policy</li>
                            <li>FAQ</li>
                        </ul>
                    </div>
                    <div>
                        <p className='mb-5 font-medium text-xl'>GET IN TOUCH</p>
                        <div className="flex flex-col gap-1 mb-5 text-gray-400">
                            <Link to='tel:+8801855375963' target="_blank" className='text-sm text-justify'><b>মোবাইল নং:</b> (+88) 01855-375963</Link>
                            <Link to='mailto:hello@glorebd.com' target="_blank" className='text-sm text-justify'><b>ইমেইল:</b> hello@glorebd.com</Link>
                        </div>
                        <div className="flex items-center gap-8 text-3xl">
                            <Link target='_Blank' to="https://www.facebook.com/people/GLore/61565365121765/">
                                <FaFacebook />
                            </Link>
                            <FaTwitter />
                            <FaInstagram />
                        </div>
                    </div>
                </div>
                <div>
                    <hr />
                    <p className="py-5 text-center">
                        Copyright - {year}  &copy; All right reserved. Designed and Developed by <Link to='https://expressitbd.net' target='_Blank'>ExpressITbd</Link> Team
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer