import React from 'react'

const AboutUs = () => {
  return (
    <div className="px-4 py-10 text-gray-800 bg-gray-100 about-us">
      <div className="container max-w-4xl mx-auto">
        <h1 className="mb-6 text-4xl font-bold text-center text-teal-700">
          About Us
        </h1>
        <p className="mb-8 text-lg leading-7 text-center">
          Welcome to <strong>TraveCo</strong>, your ultimate travel companion! 
          Our mission is to provide you with unforgettable travel experiences, 
          tailored to your preferences and interests. Whether you're looking 
          for exotic adventures, luxurious getaways, or budget-friendly 
          explorations, we have something for everyone.
        </p>

        <div className="p-6 text-center bg-white rounded-lg shadow-md owner-info">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Meet the Owner
          </h2>
          <p className="text-lg">
            Hello, I am <strong>Amanat Singh Bhadouriya</strong>, the proud owner of 
            TraveCo. My passion for travel inspired me to create this platform, 
            where dreams turn into destinations. Join us to explore the world and 
            make memories that last a lifetime.
          </p>
        </div>

        <div className="mt-10 services">
          <h2 className="mb-6 text-3xl font-bold text-center text-teal-700">
            Our Services
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-md service-card">
              <h3 className="mb-3 text-xl font-semibold">Custom Travel Packages</h3>
              <p>
                Plan your dream vacation with personalized packages crafted to suit your needs.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md service-card">
              <h3 className="mb-3 text-xl font-semibold">Guided Tours</h3>
              <p>
                Explore destinations with the help of our experienced guides.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md service-card">
              <h3 className="mb-3 text-xl font-semibold">24/7 Customer Support</h3>
              <p>
                Our dedicated team is always here to assist you, anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs
