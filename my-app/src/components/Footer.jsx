import React from 'react'

const Footer = () => {
  return (
    <footer className='text-white bg-gray-800 '>
      <div className='container grid grid-cols-1 gap-8 px-6 py-8 mx-auto text-center md:grid-cols-3 md:text-left'>
        <div className=''>
          <h2 className='mb-2 text-2xl font-bold'>Travel Agency</h2>
          <p className='text-gray-400'>Welcome to TraveCo, your ultimate travel companion! Our mission is to provide you with unforgettable travel experiences, tailored to your preferences and interests. Whether you're looking for exotic adventures, luxurious getaways, or budget-friendly explorations, we have something for everyone.</p>
        </div>

        <div className='text-center'>
          <h3 className='mb-4 text-xl font-semibold'>Ouick Links</h3>
          <ul className='space-y-2'>
            <li>
              <a href="/" className='transition-colors hover:text-blue-400'>
                Home
              </a>
            </li>
            <li>
              <a href="/tour" className='transition-colors hover:text-blue-400'>
                All Tours
              </a>
            </li>
            <li>
              <a href="/about" className='transition-colors hover:text-blue-400'>
                About Us
              </a>
            </li>
            <li>
              <a href="#" className='transition-colors hover:text-blue-400'>
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
        <h3 className='mb-4 text-xl font-semibold'>Contact Us</h3>
        <p className='text-gray-400'>Email:{""}<a href='TraveCo.com' className='transition-colors hover:text-blue-400'>TraveCo.com</a></p>
        <p className='text-gray-400'>Email:{""}<a href='TraveCo.com' className='transition-colors hover:text-blue-400'>+91 88391-67579</a></p>
        <p className="text-gray-400">
                  Address: Adarsh Nagar Gwalior (MP) 
               </p>
        </div>
      </div>
      <div className="py-4 bg-gray-900">
            <p className="text-sm text-center text-gray-400">
               &copy; 2025 Travel Agency. All Rights Reserved.
            </p>
         </div>
    </footer>
  )
}

export default Footer