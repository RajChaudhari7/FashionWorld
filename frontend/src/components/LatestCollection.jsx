import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItems from './ProductItems';
const LatestCollection = () => {

    const {products} = useContext(ShopContext);
    const [latestProducts,setLatestProducts] = useState([])
    
    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    },[products])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'Latest'} text2={'Collections'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Welcome to our newest collection, where fashion meets innovation! We've curated a stunning array of designs to elevate your wardrobe with pieces that are as unique as you are. From modern essentials to statement-making styles, this collection offers something for every occasion.
        Each item is crafted with meticulous attention to detail, using high-quality fabrics and the latest trends to ensure you always stand out. Whether you're looking for the perfect outfit for a special event, or everyday pieces that blend comfort with style, our latest collection is here to redefine your style journey.
        </p>
      </div>
        {/* rendering product */}

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 gap-y-6'>
            {
                latestProducts.map((item,index)=>(
                    <ProductItems key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))
            }
        </div>
    </div>
  )
}

export default LatestCollection
