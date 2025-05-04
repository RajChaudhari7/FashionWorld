import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItems from '../components/ProductItems';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    setCategory((prev) =>
      prev.includes(e.target.value)
        ? prev.filter((item) => item !== e.target.value)
        : [...prev, e.target.value]
    );
  };

  const toggleSubCategory = (e) => {
    setSubCategory((prev) =>
      prev.includes(e.target.value)
        ? prev.filter((item) => item !== e.target.value)
        : [...prev, e.target.value]
    );
  };

  const applyFilter = () => {
    let productsCopy = [...products];

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = [...filterProducts];

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 pt-10 border-t transition-all duration-300 bg-gray-100 p-12">
  {/* Filter options */}
  <div className="min-w-60 flex flex-col gap-4 sm:sticky top-4">
    <button
      onClick={() => setShowFilter(!showFilter)}
      className="flex items-center justify-between text-xl cursor-pointer hover:text-gray-700 transition-colors"
    >
      FILTERS
      <img
        className={`h-3 sm:hidden transition-transform ${
          showFilter ? 'rotate-90' : ''
        }`}
        src={assets.dropdown_icon}
        alt="Toggle Filters"
      />
    </button>

    {/* Category filter */}
    <div
      className={`border border-gray-700 p-5 mt-2 transition-all ${
        showFilter ? '' : 'hidden'
      } sm:block shadow-md rounded-md`}
    >
      <p className="mb-3 text-sm font-medium">Categories</p>
      <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
        <label className="flex items-center gap-2">
          <input
            className="w-3"
            type="checkbox"
            value="Men"
            onChange={toggleCategory}
          />
          Men
        </label>
        <label className="flex items-center gap-2">
          <input
            className="w-3"
            type="checkbox"
            value="Women"
            onChange={toggleCategory}
          />
          Women
        </label>
        <label className="flex items-center gap-2">
          <input
            className="w-3"
            type="checkbox"
            value="Kids"
            onChange={toggleCategory}
          />
          Kids
        </label>
      </div>
    </div>

    {/* SubCategory */}
    <div
      className={`border border-gray-300 p-5 transition-all ${
        showFilter ? '' : 'hidden'
      } sm:block shadow-md rounded-md`}
    >
      <p className="mb-3 text-sm font-medium">Type</p>
      <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
        <label className="flex items-center gap-2">
          <input
            className="w-3"
            type="checkbox"
            value="Topwear"
            onChange={toggleSubCategory}
          />
          Topwear
        </label>
        <label className="flex items-center gap-2">
          <input
            className="w-3"
            type="checkbox"
            value="Bottomwear"
            onChange={toggleSubCategory}
          />
          Bottomwear
        </label>
        <label className="flex items-center gap-2">
          <input
            className="w-3"
            type="checkbox"
            value="Winterwear"
            onChange={toggleSubCategory}
          />
          Winterwear
        </label>
      </div>
    </div>
  </div>

  {/* Right side */}
  <div className="flex-1">
    <div className="flex justify-between items-center mb-4">
      <Title text1="All" text2="Collections" />
      {/* Product sort */}
      <select
        onChange={(e) => setSortType(e.target.value)}
        className="border-2 border-gray-300 text-sm px-3 py-2 cursor-pointer rounded-md shadow-sm"
      >
        <option value="relevant">Sort by Relevant</option>
        <option value="low-high">Sort by Low to High</option>
        <option value="high-low">Sort by High to Low</option>
      </select>
    </div>

    {/* Map Products */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filterProducts.map((item, index) => (
        <ProductItems
          key={index}
          name={item.name}
          id={item._id}
          price={item.price}
          image={item.image}
          className="transform transition-transform hover:scale-105"
        />
      ))}
    </div>
  </div>
</div>
  );
};

export default Collection;
