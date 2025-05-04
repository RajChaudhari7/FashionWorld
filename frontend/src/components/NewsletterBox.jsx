import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext'; // Adjust the import according to your file structure

const NewsletterBox = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { isAuthenticated } = useContext(ShopContext);

  const sendSubscriptionEmail = async (email) => {
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log('Subscription email sent successfully');
      } else {
        console.error('Failed to send subscription email');
      }
    } catch (error) {
      console.error('Error sending subscription email:', error);
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      setMessage('Please log in first.');
    } else {
      sendSubscriptionEmail(email);
      setMessage('Thank you for subscribing!');
      setEmail(''); // Clear the email input after submission
    }
  };

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 25% off</p>
      <p className='text-gray-400 mt-3'>
        Subscribe today and get 20% off your first order—exclusive savings just for you!
      </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input
          className='w-full sm:flex-l outline-none'
          type="email"
          placeholder='Enter your email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>
          Subscribe
        </button>
      </form>
      {message && <p className='text-red-500'>{message}</p>}
    </div>
  );
};

export default NewsletterBox;
