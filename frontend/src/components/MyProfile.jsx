import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

const MyProfile = () => {
    const { userName, userEmail, orders } = useContext(ShopContext);
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        // Assuming orders is an array of order objects
        setOrderList(orders);
    }, [orders]);

    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold'>My Profile</h1>
            <div className='mt-4'>
                <p><strong>Name:</strong> {userName}</p>
                <p><strong>Email:</strong> {userEmail}</p>
            </div>
            <div className='mt-6'>
                <h2 className='text-xl font-semibold'>Orders</h2>
                {orderList.length > 0 ? (
                    <ul className='mt-2 space-y-2'>
                        {orderList.map((order, index) => (
                            <li key={index} className='border p-2 rounded'>
                                <p><strong>Order ID:</strong> {order.id}</p>
                                <p><strong>Date:</strong> {order.date}</p>
                                <p><strong>Total:</strong> ${order.total}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className='mt-2'>No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default MyProfile;
