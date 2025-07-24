import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, isAuthenticated } = useContext(ShopContext);
  const [productData, setProductdata] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductdata(foundProduct);
      setImage(foundProduct.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const handleAddToCart = () => {
    if (isAuthenticated) {
      if (productData.quantity > 0) {
        addToCart(productData._id, size);
      } else {
        toast.error('Product is out of stock');
      }
    } else {
      toast.error('Please log in first.');
    }
  };

  if (!productData) {
    return <div className='opacity-0'>Loading...</div>;
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105'
                alt=""
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto transition-transform duration-300 hover:scale-110' src={image} alt="" />
          </div>
        </div>
        <div className='flex-1'>
          <h1 className='font-bold text-3xl mt-1'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-1'>
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_dull_icon} alt="" className="w-4" />
            <p className='pl-2 text-gray-600'>(122)</p>
          </div>
          <p className='mt-2 text-4xl font-semibold text-orange-500'>{currency}{productData.price}</p>
          <p className='mt-1 text-gray-600 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-2'>
            <p className='font-semibold'>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 ${item === size ? 'border-orange-500' : ''}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 hover:bg-gray-800 transition-colors duration-300'
          >
            Add To Cart
          </button>
          <hr className='mt-5 sm:w-4/5' />
          <div className='text-l text-gray-600 mt-5 flex flex-col gap-1'>
            <p>100% Original Product.</p>
            <p>Cash On Delivery Is Available.</p>
            <p>Easy Return and Exchange Policy Within 5 Days.</p>
          </div>
        </div>
      </div>
      <div className='mt-20'>
        <div className='flex border-b'>
          <b className='border-b-4 border-orange-500 px-5 py-3 text-sm'>Description</b>
          <p className='border-b-2 border-transparent hover:border-orange-500 transition-colors duration-300 px-5 py-3 text-sm cursor-pointer'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600'>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste a id sit repudiandae vero aspernatur sint vel doloremque cumque obcaecati fugiat eos, facere aut dolorum quos magnam consequatur quasi quae!
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non a quasi quos iure eaque pariatur similique quo velit reprehenderit odio minus porro dicta, consequatur rem laudantium minima, assumenda recusandae aliquid?
          </p>
        </div>
      </div>
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      <ToastContainer />
    </div>
  );
};

export default Product;
