import React from 'react'
import { NavLink } from 'react-router-dom'

const MobileBottomMenu = ({ setVisible }) => {
    return (

        <div className='flex flex-col p-4 text-gray-600'>
            <div onClick={() => setVisible(false)} className='flex items-center gap-3 p-3 cursor-pointer'>
                <img src='cross_icon.png' className="h-4" alt="" />
                <p>Back</p>
            </div>
            <NavLink onClick={() => setVisible(false)} className='border-y py-2 pl-6' to='/'>HOME</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border-b' to='/collections'>COLLECTIONS</NavLink>

            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border-b' to='/about'>ABOUT</NavLink>

            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border-b' to='/contact'>CONTACT</NavLink>
        </div>
    )
}

export default MobileBottomMenu