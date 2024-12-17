import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white '>
      <div className='container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left'>
        <div >
          <h2 className='text-2xl font-bold mb-2'>Travel Agency</h2>
          <p className='text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit soluta possimus recusandae autem ab nulla ex corporis deserunt dolores, enim iure eum, placeat officiis </p>
        </div>

        <div>
          <h3 className='text-xl font-semibold mb-4'>Ouick Links</h3>
          <ul className='space-y-2'>
            <li>
              <a href="#" className='hover:text-blue-400 transition-colors'>
                Home
              </a>
            </li>
            <li>
              <a href="#" className='hover:text-blue-400 transition-colors'>
                All Tours
              </a>
            </li>
            <li>
              <a href="#" className='hover:text-blue-400 transition-colors'>
                About Us
              </a>
            </li>
            <li>
              <a href="#" className='hover:text-blue-400 transition-colors'>
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
        <h3 className='text-xl font-semibold mb-4'>Contact Us</h3>
        <p className='text-gray-400'>Email:{""}<a href='TraveCo.com' className='hover:text-blue-400 transition-colors'>TraveCo.com</a></p>
        <p className='text-gray-400'>Email:{""}<a href='TraveCo.com' className='hover:text-blue-400 transition-colors'>+91 88391-67579</a></p>
        <p className="text-gray-400">
                  Address: 123 Travel St, Adventure City
               </p>
        </div>
      </div>
      <div className="bg-gray-900 py-4">
            <p className="text-center text-gray-400 text-sm">
               &copy; 2024 Travel Agency. All Rights Reserved.
            </p>
         </div>
    </footer>
  )
}

export default Footer