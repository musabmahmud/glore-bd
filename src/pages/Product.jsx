import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';
import { FaAngleDown, FaAngleLeft, FaAward, FaCcMastercard, FaFacebook, FaInstagram, FaMinus, FaPinterest, FaPlus, FaReddit, FaShoppingBag, FaShoppingCart, FaTruck, FaWhatsapp } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../stores/cart';
import CartMenu from './Cart';
import ReactPlayer from 'react-player';

// Facebook Share Hashtag 
import { Helmet } from 'react-helmet-async';

// Swiper JS
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import toast from 'react-hot-toast';
import { FaThreads } from 'react-icons/fa6';


const Product = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { slug } = useParams(); // Extract the slug and ID from the route

    // Product URL 
    const productUrl = window.location.href; // Full URL

    const extractIdFromSlug = (slugWithId) => {
        const parts = slugWithId.split("-"); // Split by hyphen
        return parts[parts.length - 1]; // The last part is the ID
    };
    const productId = extractIdFromSlug(slug);

    const dispatch = useDispatch();

    const { products, currency, totalQuantity, setCartMenu, cartMenu, cloudAPI } = useContext(ShopContext);

    const [singleProduct, setSingleProduct] = useState(false);

    const [imageFly, setimageFly] = useState(false);

    const [quantity, setQuantity] = useState(1);

    const decrement = () => {
        quantity > 1 && setQuantity(quantity - 1);
    }

    const increment = () => {
        setQuantity(quantity + 1);
    }

    const fetchSingleData = async () => {
        let selectedItem = products.find(p => p.id == productId);
        setSingleProduct(selectedItem);
    }

    const handleAddToCart = (product) => {
        setimageFly(false);
        requestAnimationFrame(() => {
            setimageFly(true); // Trigger animation
        });

        const data = { productId: product, quantity: quantity };
        dispatch(addToCart(data));

        toast.success('Product Added to Cart Successfully!')
    }

    useEffect(() => {
        fetchSingleData();
        setQuantity(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId, products]);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        // Add event listener for resize
        window.addEventListener("resize", handleResize);

        // Cleanup the event listener
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);



    const [data, setData] = useState(null); // For storing fetched data
    const [isDesOpen, setIsDesOpen] = useState(false); // Accordion open state

    const metaTags = document.getElementsByTagName('meta');
    for (let tag of metaTags) {
        console.log(tag.outerHTML);
    }

    // Optionally filter specific meta tags
    const ogTags = Array.from(metaTags).filter(tag => tag.getAttribute('property')?.startsWith('og:'));
    console.log('Open Graph Meta Tags:', ogTags);


    return singleProduct ? (
        <div className='container mx-auto'>

            {/* SEO META TAG  */}
            <Helmet key={slug}>
                <meta charSet="utf-8" data-rh="true" />
                <title data-rh="true">{singleProduct.name}</title>
                <meta property="og:title" content={singleProduct.name} data-rh="true" />
                <meta property="og:description" content={singleProduct.short_desc} data-rh="true" />
                <meta property="og:image" content={`${cloudAPI}/image/${singleProduct.image}`} data-rh="true" />
                <meta property="og:url" content={productUrl} data-rh="true" />
                <meta property="og:type" content="product" data-rh="true" />
            </Helmet>

            <div className='relative sm:pt-5 sm:border-t-2 h-full'>
                <img src={`${cloudAPI}/image/${singleProduct.image}`} className={`w-full h-full z-[1000] absolute hidden opacity-0 invisible single-flying-div ${imageFly && 'single-mobile-flying-div'}`}
                    onAnimationEnd={() => setimageFly(false)}
                    alt={singleProduct.name} />
                <div className="flex sm:flex-row flex-col gap-12">
                    {/* product image */}
                    <div className='sm:w-1/2 lg:w-2/3'>
                        {/* <img src={`${cloudAPI}/image/${singleProduct.image}`} className='rounded' alt={singleProduct.name} /> */}
                        {isMobile ?
                            <Swiper
                                className="mySwiper"
                                // spaceBetween={30}
                                effect={'fade'}
                                navigation={{
                                    clickable: true,
                                }}
                                modules={[Navigation]}
                            >
                                <SwiperSlide>
                                    <ReactPlayer
                                        url={`${cloudAPI}/video/${singleProduct.video}`}
                                        playing={true}
                                        loop={true}
                                        controls={false}
                                        muted={true} // Mute the video
                                        width="100%" // Ensure the player takes full width
                                        height="100%" // Ensure the player takes full height
                                        className="object-cover"
                                        // lazy load optimization
                                        preload="none" // Only load when interacted with
                                        config={{
                                            file: {
                                                attributes: {
                                                    preload: "none",
                                                    autoPlay: true,
                                                },
                                            },
                                        }}
                                    />
                                </SwiperSlide>
                                {
                                    singleProduct.product_images?.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <img src={`${cloudAPI}/image/${image.name}`} className="object-cover" />
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper> :
                            <div className="grid grid-cols-2 gap-2">
                                <ReactPlayer
                                    url={`${cloudAPI}/video/${singleProduct.video}`}
                                    playing={true}
                                    loop={true}
                                    controls={false}
                                    // light={<img src={`${cloudAPI}/image/${singleProduct.image}`}/>}
                                    muted={true} // Mute the video
                                    width="100%" // Ensure the player takes full width
                                    height="100%" // Ensure the player takes full height
                                    className="object-cover"
                                    // lazy load optimization
                                    preload="none" // Only load when interacted with
                                    config={{
                                        file: {
                                            attributes: {
                                                preload: "none",
                                                autoPlay: true,
                                            },
                                        },
                                    }}
                                />
                                {
                                    singleProduct.product_images?.map((image, index) => (

                                        <div key={index}>
                                            <img src={`${cloudAPI}/image/${image.name}`} className='min-h-full' alt={singleProduct.name} />
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </div>

                    {/* product info  */}
                    <div className='sticky sm:w-1/2 top-5 space-y-5 sm:px-0 px-2 sm:min-h-screen'>
                        <h1 className='lg:font-bold text-xl lg:text-3xl'>{singleProduct.name}</h1>
                        <div className='flex items-center gap-1 mt-2'>
                            <img src='/star_icon.png' alt={`${singleProduct.name} ratings`} className='w-3 5' />
                            <img src='/star_icon.png' alt={`${singleProduct.name} ratings`} className='w-3 5' />
                            <img src='/star_icon.png' alt={`${singleProduct.name} ratings`} className='w-3 5' />
                            <img src='/star_icon.png' alt={`${singleProduct.name} ratings`} className='w-3 5' />
                            <img src='/star_icon.png' alt={`${singleProduct.name} ratings`} className='w-3 5' />
                            <p className="pl-2">(122)</p>
                        </div>
                        <p className='font-medium text-3xl'>{currency} {singleProduct.price}</p>
                        <p className='w-4/5 text-gray-500 text-justify'>Category : {singleProduct.category.name}</p>
                        <div className="flex items-center gap-2">
                            <p>Quantity : </p>
                            <div className="flex items-center justify-center border rounded-s-lg rounded-r-lg gap-4 p-2">
                                <button type="button" onClick={decrement}>
                                    <FaMinus />
                                </button>
                                <p>{quantity}</p>
                                <button type="button" onClick={increment}>
                                    <FaPlus />
                                </button>
                            </div>
                        </div>
                        {singleProduct.stock > 0 ?
                            <>
                                <p>In Stock : <span className='font-bold'>{singleProduct.stock}</span></p>
                                <button onClick={() => handleAddToCart(singleProduct.id)} className='md:block hidden bg-pink active:bg-gray-700 px-8 py-3 rounded w-full font-bold text-sm text-white'>অর্ডার করুন</button>
                            </>
                            : <p className='py-8 text-gray-500'>Out of Stock...</p>
                        }
                        <hr className="mt-8 sm:w-4/5" />
                        <div className="mt-5 text-gray-500 text-sm space-y-3">
                            <div className='flex gap-2'>
                                <FaAward size={20} />
                                <p>100% Original Product.</p>
                            </div>
                            <div className='flex gap-2'>
                                <FaTruck size={20} />
                                <p>Express Shipping</p>
                            </div>
                            <div className='flex gap-2'>
                                <FaCcMastercard size={20} />
                                <p>Cash on Delivery Available</p>
                            </div>
                            <div className='flex gap-2'>
                                <FaShoppingBag size={20} />
                                <p>Easy return and exchange policy within 7 days</p>
                            </div>
                        </div>
                        {/* Description  */}
                        <div className="border-b border-gray-300 pb-2">
                            <button onClick={() => setIsDesOpen(!isDesOpen)}
                                className="w-full text-left flex justify-between items-center focus:outline-none"
                            >
                                <span className="text-lg font-medium">Description</span>
                                <span
                                    className={`transform ${isDesOpen && "rotate-180"} duration-500 transition-transform`}
                                >
                                    <FaAngleDown />
                                </span>
                            </button>
                            {isDesOpen && (
                                <p className="pb-2 text-sm text-gray-600 duration-300 text-justify" dangerouslySetInnerHTML={{ __html: singleProduct.short_desc?.replace(/\r\n/g, "<br />") }} />
                            )}
                        </div>

                        {/* Share Options */}
                        <p>Share to</p>
                        <div className="flex items-center justify-between sm:justify-start gap-8 text-3xl">
                            <Link to={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                <FaFacebook />
                            </Link>
                            <Link to={`https://www.instagram.com/?url=${encodeURIComponent(productUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                <FaInstagram />
                            </Link>
                            <Link to={`https://www.reddit.com/submit?url=${encodeURIComponent(productUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                <FaReddit />
                            </Link>
                            <Link to={`https://wa.me/?text=${encodeURIComponent(productUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                <FaWhatsapp />
                            </Link>
                            <Link to={`https://wa.me/?text=${encodeURIComponent(productUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                <FaThreads />
                            </Link>
                            <Link to={`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(productUrl)}&media=${cloudAPI}/image/${singleProduct.image}&description=${singleProduct.short_desc}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                <FaPinterest />
                            </Link>
                        </div>
                    </div>
                </div>


                {/* Footer Cart Menu  */}
                <div className="right-0 bottom-0 left-0 z-40 fixed flex flex-row justify-between items-center gap-2 sm:hidden bg-gradient-to-t from-gray-50 to-white shadow-lg px-6 py-4 w-full">
                    <button className="flex-1 bg-pink shadow-lg py-2 rounded-full font-medium text-center text-lg text-white" onClick={() => handleAddToCart(singleProduct.id)} >অর্ডার করুন</button>
                    <button className="flex justify-center items-center bg-pink rounded-full w-12 h-12" onClick={() => setCartMenu(true)}>
                        <FaShoppingCart size={20} className='text-white' />
                        <span className={`inline-flex top-4 right-5 absolute justify-center items-center bg-sky-400 rounded-full w-5 h-5 font-semibold text-md text-white  ${totalQuantity > 0 && 'animate-ping'}`}></span>
                        <span className="top-4 right-5 absolute flex justify-center items-center bg-sky-400 rounded-full w-5 h-5 text-white text-xs">{totalQuantity}</span>
                    </button>
                </div>

                {/* Cart Menu  */}
                <div className={`top-0 right-0 bottom-0 z-[100] bg-white fixed transition-all duration-1000 w-[350px] shadow-md h-full ${cartMenu ? 'translate-x-0' : 'translate-x-full'}`}>
                    <CartMenu setCartMenu={setCartMenu} />
                </div>
            </div>

            {/* Related Product Items */}
            <div className='relative'>
                {/* display related products */}
                <RelatedProducts category={singleProduct.category.name} id={singleProduct.id} />
            </div>
            <button onClick={() => navigate(-1)} className='absolute sm:hidden top-[20px] left-[20px] rounded-full flex items-center justify-center bg-pink/50 w-10 h-10 z-50'>
                <FaAngleLeft className='text-white bg-pink/80 p-1 rounded-full opacity-100' size={25} />
            </button>
        </div >
    )
        :

        (<div className="flex sm:flex-row flex-col gap-12 border-gray-300 mx-auto px-4 py-[100px] border rounded animate-pulse">
            <div className="bg-slate-200 p-4 rounded sm:w-1/2"></div>
            <div className="flex-1 space-y-6 py-1 sm:w-1/2">
                <div className="bg-slate-200 rounded h-40"></div>
                <div className="space-y-3">
                    <div className="gap-4 grid grid-cols-3">
                        <div className="col-span-2 bg-slate-200 rounded h-20"></div>
                        <div className="col-span-1 bg-slate-200 rounded h-20"></div>
                    </div>
                    <div className="bg-slate-200 rounded h-40"></div>
                </div>
            </div>
        </div>)
}

export default Product