import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useLocation, useNavigate } from "react-router-dom";
import { assets } from '../assets/assets';

const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);

    const location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {
        if (showSearch) {
            setVisible(true)
            navigate('/collections');
        }
        else {
            setVisible(false);
        }
    }, [showSearch, navigate]);

    // Musab Loves Sinmim------iloveu
    return (
        <>
            {
                showSearch && visible && isCollection ?
                    <div className=' border-y bg-gray-50 text-center'>
                        <div className="inline-flex items-center justify-center border border-gray-400 px-5 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
                            <input value={search} onChange={(e) => setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm py-2' type="text" name="" placeholder="Search...." id="" />
                            <img className='w-5' src={assets.search_icon} alt="" />
                        </div>
                        <img onClick={() => setShowSearch(!showSearch)} className='inline w-3 cursor-pointer' src={assets.cross_icon} alt="" />
                    </div>
                    : <></>
            }
        </>
    )
}

export default SearchBar