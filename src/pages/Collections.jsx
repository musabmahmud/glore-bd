import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import PriceRangeFilter from '../components/PriceRange/PriceRangeFilter';
import { FaAngleRight } from 'react-icons/fa';

// Price Slider 

const Collections = () => {

  const { products, search, showSearch, categories, currency } = useContext(ShopContext);

  // price range slider 
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [rangeValues, setRangeValues] = useState([0, 0]);

  useEffect(() => {
    // Initialize price range based on product data
    const prices = products.map((p) => p.price);
    if (prices.length > 0) {
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setPriceRange([minPrice, maxPrice]);
      setRangeValues([minPrice, maxPrice]);
    }

    //Initialize Products
    setFilterProducts(products);

  }, [products]);


  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    const value = String(e.target.value); // Ensure value is a string
    if (category.includes(value)) {
      setCategory(prev => prev.filter(item => item !== value));
    } else {
      setCategory(prev => [...prev, value]);
    }
  };

  const applyFilter = () => {

    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(product => {
        return category.includes(String(product.category.id));
      });
    }

    productsCopy = productsCopy.filter(
      (product) => product.price >= rangeValues[0] && product.price <= rangeValues[1]
    );

    setFilterProducts(productsCopy);
  }

  const sortProducts = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high': // Sort by price (low to high)
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case 'high-low': // Sort by price (high to low)
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      case 'name-asc': // Sort by name (A to Z)
        setFilterProducts(fpCopy.sort((a, b) => a.name.localeCompare(b.name)));
        break;

      case 'name-desc': // Sort by name (Z to A)
        setFilterProducts(fpCopy.sort((a, b) => b.name.localeCompare(a.name)));
        break;

      case 'stock-high': // Sort by stock (high to low)
        setFilterProducts(fpCopy.sort((a, b) => b.stock - a.stock));
        break;

      case 'stock-low': // Sort by stock (low to high)
        setFilterProducts(fpCopy.sort((a, b) => a.stock - b.stock));
        break;

      case 'latest': // Sort by latest created (newest to oldest)
        setFilterProducts(fpCopy.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        break;

      case 'oldest': // Sort by oldest created (oldest to newest)
        setFilterProducts(fpCopy.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)));
        break;

      default:// Apply default filter if no sorting type matches
        applyFilter();
        break;
    }

  }

  useEffect(() => {
    applyFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, showSearch, search, rangeValues]);


  useEffect(() => {
    sortProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);



  return (

    <div className='container mx-auto relative'>
      <div className='flex sm:flex-row flex-col gap-1 sm:gap-10 pt-5 py-10 border-t sm:space-y-5'>
        {/* Left Filter Option */}
        <div className="min-w-60 px-2 sm:px-0">
          <button onClick={() => setShowFilter(!showFilter)} className='flex items-center gap-2 my-2 text-xl cursor-pointer'>FILTERS
            <FaAngleRight className={`h-3 sm:hidden  transition ease-in-out duration-200 ${showFilter ? 'rotate-90' : ''}`} />
          </button>
          {/* Category Filter  */}
          <div className={`border rounded border-gray-300 sm:mt-12 p-5 mb-5 ${showFilter ? '' : 'hidden'} sm:block`}>
            <div className='mb-10 space-y-3'>
              <span className="font-semibold">Filter by Category</span>

              <div className="flex flex-col gap-5 font-medium text-gray-700 text-sm">
                {
                  categories.map((item, index) => (
                    <p className="flex gap-5" key={index}>
                      <input type="checkbox" className='w-3' name="" id="" value={item.id} onChange={toggleCategory} />{item.name}
                    </p>
                  ))
                }
              </div>
            </div>
            <div className='space-y-3'>
              <span className="font-semibold">Filter by Price</span>
              <PriceRangeFilter
                min={priceRange[0]}
                max={priceRange[1]}
                minDifference={100}
                onRangeChange={setRangeValues}
                currency={currency}
              />
            </div>
          </div>


        </div>

        {/* Right Side Products  */}
        <div className="flex-1">
          <div className="flex justify-between mb-5 text-base sm:text-2xl px-2 sm:px-0">
            <Title text1={'ALL'} text2={'COLLECTIONS'} />
            <select onChange={(e) => setSortType(e.target.value)} name="" id="" className="border-2 border-gray-300 px-2 text-sm">
              <option value="relavent">Sort by: Relavent</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="latest">Latest to Oldest</option>
              <option value="oldest">Oldest to Latest</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="stock-high">Stock: High to Low</option>
              <option value="stock-low">Stock: Low to High</option>
            </select>
          </div>

          {/* products */}
          <div className="gap-2 lg:gap-4 gap-y-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 min-h-screen">
            {
              filterProducts.map((item, index) => (
                <ProductItem key={index} index={index} id={item.id} image={item.image} name={item.name} price={item.price} />))
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default Collections