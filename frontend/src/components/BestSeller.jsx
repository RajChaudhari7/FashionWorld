import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItems from './ProductItems';

const BestSeller = () => {

    const{products} = useContext(ShopContext);
    const [bestSeller , setBestSeller] = useState([]);

    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller));
        setBestSeller(bestProduct.slice(0,5))
    },[products])

  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'Best'} text2={'Sellers'} />
            <p className='w-3/4 m-auto text-xs sm:text-base text-gray-600'>
                The wait is over—our best-selling pieces are back and better than ever! These customer favorites have earned their place in your wardrobe thanks to their perfect blend of comfort, style, and versatility. From wardrobe staples to statement-makers, our best sellers are here to keep you looking and feeling your best.
                Why are they our best sellers? It's simple: they combine effortless design with high-quality materials, creating the perfect balance of fashion-forward and timeless appeal. Whether you're updating your closet or looking for the perfect go-to outfit, these pieces are guaranteed to elevate your everyday look.
            </p> 
            <p className='w-3/4 m-auto text-xs sm:text-base text-gray-600'>
              Shop now and find out why these styles are crowd favorites. These pieces are flying off the shelves, so don’t wait—add them to your cart before they’re gone!            
            </p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestSeller.map((item,index)=>(
                    <ProductItems key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                ))
            }
        </div>
      
    </div>
  )
}

export default BestSeller
