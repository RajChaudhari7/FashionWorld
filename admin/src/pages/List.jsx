import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.product);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleCheckout = async (cartItems) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/checkout', { cartItems }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); // Refresh the product list after checkout
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const saveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append('id', editingProduct._id);
      formData.append('name', editingProduct.name);
      formData.append('description', editingProduct.description);
      formData.append('price', editingProduct.price);
      formData.append('category', editingProduct.category);
      formData.append('subCategory', editingProduct.subCategory);
      formData.append('sizes', JSON.stringify(editingProduct.sizes));
      formData.append('bestseller', editingProduct.bestseller);
      formData.append('quantity', editingProduct.quantity);

      // Append images if they are being edited
      if (editingProduct.image1) formData.append('image1', editingProduct.image1);
      if (editingProduct.image2) formData.append('image2', editingProduct.image2);
      if (editingProduct.image3) formData.append('image3', editingProduct.image3);
      if (editingProduct.image4) formData.append('image4', editingProduct.image4);

      const response = await axios.post(backendUrl + '/api/product/edit', formData, { headers: { token, 'Content-Type': 'multipart/form-data' } });
      if (response.data.success) {
        toast.success(response.data.message);
        setEditingProduct(null);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='p-6 mr-25'>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-6'>
        {/* ----------List Table Title---------- */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Sizes</b>
          <b>Quantity</b>
          <b className='text-center'>Action</b>
          <b className='text-center'>Edit</b>
        </div>

        {/* -----------Product List ---------- */}
        {list.map((item, index) => (
          <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-lg' key={index}>
            <img className='w-12' src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p className='md:mr-4'>{item.sizes.join(', ') || 'N/A'}</p>
            <p>{item.quantity}</p>
            <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
            <p onClick={() => handleEdit(item)} className='text-right md:text-center cursor-pointer text-lg text-blue-500'>Edit</p>
          </div>
        ))}
      </div>

      {/* -----------Edit Form---------- */}
      {editingProduct && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg'>
            <h2 className='text-xl mb-4'>Edit Product</h2>
            <div className='mb-4'>
              <label className='block mb-2'>Price</label>
              <input
                type='number'
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                className='w-full px-3 py-2 border rounded'
              />
            </div>
            <div className='mb-4'>
              <label className='block mb-2'>Quantity</label>
              <input
                type='number'
                value={editingProduct.quantity}
                onChange={(e) => setEditingProduct({ ...editingProduct, quantity: Number(e.target.value) })}
                className='w-full px-3 py-2 border rounded'
              />
            </div>
            <div className='mb-4'>
              <label className='block mb-2'>Sizes</label>
              <input
                type='text'
                value={editingProduct.sizes.join(', ')}
                onChange={(e) => setEditingProduct({ ...editingProduct, sizes: e.target.value.split(',').map(size => size.trim()) })}
                className='w-full px-3 py-2 border rounded'
              />
            </div>
            <div className='flex justify-end'>
              <button onClick={() => setEditingProduct(null)} className='mr-2 px-4 py-2 bg-gray-300 rounded'>Cancel</button>
              <button onClick={saveEdit} className='px-4 py-2 bg-blue-500 text-white rounded'>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
