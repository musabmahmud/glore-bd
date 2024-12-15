import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import RelatedProductItems from './RelatedProductItems';

const RelatedProducts = ({ category, id }) => {

    const { products } = useContext(ShopContext);

    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            const relatedProducts = products
                .filter(item => item.category.name === category && item.id !== id)
                .slice(0, 8);
            setRelated(relatedProducts);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products])

    return (
        <div className='my-24'>
            <div className="py-2 text-3xl text-center">
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
            </div>
            <div className="gap-1 gap-y-10 lg:gap-4 grid grid-cols-2 lg:grid-cols-4">
                {related.map((item, index) => (
                    <RelatedProductItems key={index} id={item.id} image={item.image} name={item.name} price={item.price} index={index} />
                ))}
            </div>
        </div>
    )
}

export default RelatedProducts