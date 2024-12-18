import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { cartQuantityDecrement, cartQuantityIncrement, clearCart, removeFromCart } from '../stores/cart';

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {

    const cloudAPI = 'https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev';

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);


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
    }, [window.innerWidth]);

    const productAPI = "https://admin.glorebd.com/api/all/product/get";

    const categoriAPI = "https://admin.glorebd.com/api/all/category/get";

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(productAPI);
                setProducts(response.data.data.data);
                setIsLoading(false);

            } catch (error) {
                console.log("Error Fetching Data", error);
            }
        }

        fetchData();
    }, [productAPI])


    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(categoriAPI);
                setCategories(response.data.data);

            } catch (error) {
                console.log("Error Fetching Data", error);
            }
        }
        fetchCategory();
    }, [categoriAPI])


    const currency = '৳';

    const delivery_fee_Inside = 80;
    const delivery_fee_Outside = 150;

    const [search, setSearch] = useState('');

    const [showSearch, setShowSearch] = useState(false);


    const [cartMenu, setCartMenu] = useState(false);

    const [cartProducts, setCartProducts] = useState([]);

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;

    useEffect(() => {

        let mergedArray = cartItems.map(user => {
            let product = products.find(pref => pref.id === user.productId);
            return { ...product, ...user }
        });

        setCartProducts(mergedArray);
    }, [cartItems, products]);

    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        let subQuantity = 0;
        cartItems.forEach(item => subQuantity += item.quantity);
        setTotalQuantity(subQuantity);
    }, [cartItems]);

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    }
    const quantityDecrement = (product) => {
        const updateQuantity = Number(product.quantity) - 1;
        if (updateQuantity >= 1) {
            product = { id: product.id, quantity: updateQuantity };
            console.log(product);
            dispatch(cartQuantityDecrement(product));
        }
    }
    const quantityIncrement = (product) => {
        const updateQuantity = Number(product.quantity) + 1;
        if (updateQuantity < 100) {
            product = { id: product.id, quantity: updateQuantity };
            console.log(product);
            dispatch(cartQuantityIncrement(product));
        }
    }


    const clearAllCart = () => {
        dispatch(clearCart());
    }

    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        let subTotal = 0;
        cartProducts.map((item) => (subTotal = subTotal + item.quantity * item.price));
        setTotalAmount(subTotal);
    }, [cartItems, cartProducts]);

    const value = {
        isLoading, products, currency, isMobile, delivery_fee_Inside, delivery_fee_Outside, search, setSearch, showSearch, setShowSearch, cartItems, totalQuantity, setCartMenu, cartMenu, categories, handleRemoveFromCart, quantityIncrement, quantityDecrement, clearAllCart, cartProducts, totalAmount, cloudAPI
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}