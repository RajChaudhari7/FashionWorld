import React from 'react';
import { assets } from '../assets/assets';
import { FaInstagram, FaFacebook, FaTwitter, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='w-full '>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-8 py-8 mt-20  text-sm bg-blue-100 p-6 rounded-lg shadow-md'>
                <div className='flex flex-col items-center sm:items-start'>
                    <img src={assets.logo} className='mb-4 w-60' alt="Logo" />
                </div>
                <div>
                    <p className='text-xl font-medium mb-4 text-blue-700'>Company</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li><a href="/home" className='hover:text-blue-700'>Home</a></li>
                        <li><a href="/collection" className='hover:text-blue-700'>Collection</a></li>
                        <li><a href="/about" className='hover:text-blue-700'>About Us</a></li>
                        <li><a href="/orders" className='hover:text-blue-700'>Delivery</a></li>
                        <li><a href="/contact" className='hover:text-blue-700'>Contact</a></li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-4 text-blue-700'>Get In Touch</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li className='flex items-center gap-2'>
                            <FaPhone className='text-lg text-gray-600' />
                            <a href="tel:+91-8600412566" className='hover:text-blue-700'>+91-8600412566</a>
                        </li>
                        <li className='flex items-center gap-2'>
                            <FaEnvelope className='text-lg text-gray-600' />
                            <a href="mailto:rj480036@gmail.com" className='hover:text-blue-700'>rj480036@gmail.com</a>
                        </li>
                    </ul>
                    <div className='flex gap-4 mt-2'>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className='text-2xl text-gray-600 hover:text-red-500' />
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className='text-2xl text-gray-600 hover:text-blue-900' />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className='text-2xl text-gray-600 hover:text-blue-500' />
                        </a>
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <hr className='border-gray-400' />
                <p className='py-4 text-sm text-center text-gray-600'>© 2024 fashionworld.com - All Rights Reserved.</p>
            </div>
        </div>
    );
}

export default Footer;
