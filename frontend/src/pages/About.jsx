import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'About'} text2={'Us'} />
      </div>

        <div className='my-10 flex flex-col md:flex-row gap-16'>  
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>At Fashion World, we believe that clothing is more than just what you wear—it's a way to express your individuality, confidence, and style. We are dedicated to bringing you the latest trends, timeless pieces, and high-quality garments that not only elevate your wardrobe but make you feel your best, every day.</p>
            <p>Founded with a passion for fashion, our mission is simple: to offer versatile, stylish, and affordable clothing that suits every occasion and every personality. Whether you're dressing for a special event or curating your everyday essentials, we’ve got you covered with carefully selected pieces that blend comfort, luxury, and the latest trends.</p>
            <p>Our commitment goes beyond just fashion—we strive to create a shopping experience that's as enjoyable and seamless as possible. From easy navigation to exceptional customer service, we aim to make your journey with us effortless and exciting.
            Welcome to Fashion World, where style has no limits and every piece tells a story.</p>
            <b className='text-gray-800 text-2xl'>Our Mission</b>
            <p>At Fashion World, our mission is simple yet powerful: to make fashion accessible, inspiring, and empowering for everyone. We believe that what you wear has the power to shape how you feel, and we're committed to offering clothing that helps you express your unique style, confidence, and personality—no matter where life takes you.</p>
            <p>We strive to provide high-quality, on-trend apparel that blends timeless designs with modern flair. Our curated collections are created with you in mind—fashion-forward, versatile, and always comfortable. We’re dedicated to offering a seamless shopping experience where style meets convenience, and where every piece in our collection makes you feel like your best self.</p>
            <p>At Fashion World, we are more than just a clothing brand. We are a community that celebrates individuality, encourages self-expression, and believes in the transformative power of fashion.</p>
            <p>Thank you for choosing us to be part of your style journey.</p>
          </div>

        </div>

        <div className='text-xl py-4'>
          <Title text1={'Why'} text2={'Choose Us'} />
        </div>

        <div className='flex flex-col md:flex-row text-sm mb-20'>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Quality Assurance</b>
                <p className='text-gray-600'>At Fashion World, we stand behind every product we offer. Our commitment to you goes beyond providing the latest trends—we promise exceptional quality, attention to detail, and a shopping experience that exceeds your expectations.</p>
                <p className='text-gray-600'>:- Premium Quality: We use only the finest fabrics and craftsmanship to create clothing that is not only stylish but also built to last.</p>
                <p className='text-gray-600'>:- Trendy and Timeless Styles: Our collections are thoughtfully curated to ensure that you always have access to the latest fashion while embracing classic, enduring designs.</p>
                <p className='text-gray-600'>At Fashion World, we are committed to providing you with high-quality clothing, exceptional customer care, and the confidence that comes with every purchase.</p>
            </div>

            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Convinience:</b>
                <p className='text-gray-600'>At Fashion World, we believe that great style should come with ease. That’s why we’ve designed every aspect of your shopping experience to be as convenient, seamless, and enjoyable as possible—whether you're shopping from the comfort of your home or on the go.</p>
                <p className='text-gray-600'>:- Flexible Shipping Options: Whether you need your order fast or prefer free shipping on larger orders, we offer convenient delivery options to fit your schedule.</p>
                <p className='text-gray-600'>:- Fast & Secure Checkout: We offer a smooth, secure checkout process with multiple payment options, making it easier than ever to complete your purchase with confidence.</p>
                <p className='text-gray-600'>:- User-Friendly Website: Our easy-to-navigate website ensures you can quickly find the perfect pieces, whether you're browsing by category, size, or the latest trends.</p>
                <p className='text-gray-600'>  b   At Fashion World, we're committed to giving you a shopping experience that's as effortless and enjoyable as slipping into your favorite outfit. Fashion should be fun, and we’re here to make it easy for you to stay stylish.</p>
            </div>

            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Exceptional Customer Service</b>
                <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus sint fugit, totam, voluptas quis magnam vitae, earum consequuntur nostrum quas corporis quia alias iusto iste mollitia? Nisi eos vero accusantium!</p>
            </div>

        </div>
        <NewsletterBox  />

    </div>
  )
}

export default About
