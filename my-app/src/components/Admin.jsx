import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Admin = () => {

  const [tourPackages, setTourPackages] =useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    availableDates: '',
    image: '',
});

const isValidImageURL = (url) => {
  const regex = /^(http|https):\/\/.*\.(jpeg|jpg|gif|png|bmp|webp)$/i;
  return regex.test(url);
};


  useEffect(() => {
    const fetchData = async () =>{
      try{
        const packagesResponse = await axios.get('http://localhost:4600/packages');
        setTourPackages(packagesResponse.data);

        const bookingResponse = await axios.get('http://localhost:4600/admin/bookings');
        setBookings(bookingResponse.data);
       
      }catch(error){
        console.error('error fetching data',error);

      }
    };

    fetchData();
  },[]);

  const handleChange = (e) => {
    setErrorMessage('');
    setFormData({
      ...formData,
      [e.target.name]:e.target.value,
    });
  };

  console.log(formData.image);




  const handleAddPackage = async (e) => {
    e.preventDefault();

    if (!isValidImageURL(formData.image)) {
      setErrorMessage('Please enter a valid image URL.');
      return;
    }
    
    try {
      await axios.post('http://localhost:4600/admin/packages', formData);
      alert('Package added successfully');
      setFormData({
        title: '',
        description: '',
        price: '',
        availableDates: '',
        image: '',
      });
      // Re-fetch data
      const response = await axios.get('http://localhost:4600/packages');
      setTourPackages(response.data);
    } catch (error) {
      console.error('Error adding package', error);
    }
  };



  const handleDeletePackage = async (id) => {
    try {
      await axios.delete(`http://localhost:4600/admin/packages/${id}`);
      setTourPackages(tourPackages.filter(pkg => pkg._id !== id));
      console.log(tourPackages)
      alert('Package deleted successfully');
      // Re-fetch data
      const response = await axios.get('http://localhost:4600/admin/packages');
      setTourPackages(response.data);
    } catch (error) {
      console.error('Error deleting package', error);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container p-6 mx-auto">
        <h1 className="mb-8 text-3xl font-semibold text-center text-teal-600">Admin Dashboard</h1>

        {/* Add Package Form */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold text-teal-500">Add New Tour Package</h2>
          <form onSubmit={handleAddPackage} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <input
              type="text"
              name="availableDates"
              placeholder="Available Dates    date like this  2024-02-01, 2024-03-10, 2024-04-20"
              value={formData.availableDates}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            {errorMessage && (
          <p className="text-red-600">{errorMessage}</p>
        )}
            <button
              type="submit"
              className="w-full py-3 text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none"
            >
              Add Package
            </button>
          </form>
        </div>

       
        <div className="p-6 mb-8 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold text-teal-500">All Tour Packages</h2>
          <ul className="space-y-4">
            {tourPackages.map((packageItem) => (
              <li key={packageItem._id} className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className='flex-shrink-0 md:flex '>
                  <div ><img src={packageItem.image} alt={packageItem.title}
              className="object-cover w-32 h-32 mr-5 rounded-lg" /></div>
              <div>
                  <h3 className="text-xl font-semibold text-teal-600">{packageItem.title}</h3>
                  <p className="text-gray-600">{packageItem.description}</p>
                  <p className="text-teal-500">Price: ${packageItem.price}</p>
                </div>
                </div>
                <button
                  onClick={() => handleDeletePackage(packageItem._id)}
                  className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Bookings List */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold text-teal-500">All Bookings</h2>
          <ul className="space-y-4">
            {bookings.map((booking) => (
              <li key={booking._id} className="p-4 border-b border-gray-200">
                <p className="text-lg font-semibold text-teal-600">User: {booking.name}</p>
                <p className="text-gray-600">Package: {booking.packageId.title}</p>
                <p className="text-gray-600">Booking Date: {booking.createdAt}</p>
                <p className="text-gray-600">Price: {booking.packageId.price}</p>
                <p className="text-gray-600">Number Of Travelers: {booking.numberOfTravelers}</p>
                <p className="text-gray-600">Total Price: {booking.totalPrice}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Admin
