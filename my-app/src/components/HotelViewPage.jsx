import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import jsPDF from "jspdf";

const generateInvoicePDF = (invoice) => {
   const doc = new jsPDF();
   doc.text("TraveCo. Invoice ", 20, 10);
   doc.text("Customer info :- ", 20, 20);

   doc.text(`   Name: ${invoice.name}`, 20, 30);
   doc.text(`   Email: ${invoice.email}`, 20, 40);
   doc.text(`   Phone Number: ${invoice.phoneNumber}`, 20, 50);

   doc.text("Package Info :-", 20, 60);
   doc.text(`   Price Per Person: ${invoice.pricePerRoom}`, 20, 70);
   doc.text(`   Title: ${invoice.title}`, 20, 80);

   doc.text("Booking Details:- ", 20, 90);
   doc.text(`   Number Of Travelers: ${invoice.numberOfRooms}`, 20, 100);
   doc.text(`   Total Price: ${invoice.totalPrice}`, 20, 110);
   doc.text(" ", 20, 120);
   doc.text("                     Thank You for Chose TraveCo. ", 20, 130);

   doc.save("invoice.pdf");
};
const HotelViewPage = () => {
   const { id } = useParams();
   const [packageDetails, setPackageDetails] = useState([]);
   const [isBooking, setIsBooking] = useState(false);
   const [bookingData, setBookingData] = useState({
      name: "",
      email: "",
      phoneNumber: "",
      numberOfRooms: 1,
   });

   useEffect(() => {
      const fetchPackageDetails = async () => {
         try {
            const response = await fetch(
               `http://localhost:4600/hotelView/${id}`
            );
            const data = await response.json();
            setPackageDetails(data);
            console.log(data);
         } catch (err) {
            console.log(err.message);
         }
      };

      fetchPackageDetails();
   }, [id]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setBookingData({ ...bookingData, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await fetch("http://localhost:4600/hotels", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               ...bookingData,
               packageId: id,
            }),
         });

         const data = await response.json();

         if (response.ok) {
            alert("Booking Successful! Your invoice will be generated.");
            setIsBooking(false);
            generateInvoicePDF({
               name: data.invoice.customer.name,
               email: data.invoice.customer.email,
               totalPrice: data.invoice.bookingDetails.totalPrice,
               numberOfRooms: data.invoice.bookingDetails.numberOfRooms,
               number: data.invoice.customer.phoneNumber,
               pricePerRoom: data.invoice.package.pricePerRoom,
               title: data.invoice.package.title,
            });
         } else {
            alert(data.message || "Booking failed.");
         }
      } catch (error) {
         console.error(error);
         alert("Error in booking.");
      }
   };

   return (
      <div className="min-h-screen m-auto ">
         <div className="container p-6 mx-auto mt-auto">
            {packageDetails.length === 0 ? (
               <div>No Packages available at the moment.</div>
            ) : (
               <div className="grid grid-cols-1 gap-8 m-5 mt-8 lg:grid-cols-2 md:m-8 sm:m-6 ">
                  <div className="grid grid-cols-1 gap-1 p-4 m-5 mt-8 bg-white rounded-lg shadow-md lg:grid-cols-2 md:m-8 sm:m-6 ">
                     {packageDetails.image.map((img, pkg) => (
                        <div
                           key={pkg.id}
                           className="p-2 m-4 overflow-hidden bg-red-100 rounded-lg shadow-lg"
                        >
                           <img
                              src={img}
                              className="object-cover w-full h-48 rounded cursor-pointer"
                              alt=""
                           />
                        </div>
                     ))}
                  </div>
                  <div className="p-4 mt-8 bg-white rounded-lg shadow-md">
                     <h1 className="mb-4 text-3xl font-bold text-teal-600 uppercase">
                        {packageDetails.title}
                     </h1>
                     <p className="mb-6 leading-relaxed text-gray-700">
                        {packageDetails.description}
                     </p>

                     <div className="space-y-4 ">
                        <p className="text-lg font-semibold text-gray-900">
                           Food:{" "}
                           <span className="font-normal text-gray-700">
                              {packageDetails.food}
                           </span>
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                           Price:{" "}
                           <span className="text-xl font-bold text-teal-600">
                              ₹{packageDetails.price}
                           </span>
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                           Policy:{" "}
                           <span className="font-normal text-gray-700">
                              {packageDetails.policy}
                           </span>
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                           Rating:{" "}
                           <span className="text-2xl font-bold text-yellow-500">
                              ⭐ {packageDetails.rating}
                           </span>
                        </p>

                        <button
                           className="w-full p-3 text-xl font-bold text-white bg-teal-500 rounded button hover:bg-teal-700"
                           onClick={() => setIsBooking(true)}
                        >
                           Book Now
                        </button>
                     </div>
                  </div>
               </div>
            )}

            {isBooking && (
               <div
                  id="default-modal"
                  aria-hidden="true"
                  className="fixed flex items-center justify-center w-full h-auto max-w-2xl p-2 overflow-x-hidden overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-lg shadow-lg m top-1/2 left-1/2"
               >
                  <button
                     onClick={() => setIsBooking(false)}
                     aria-label="Close Modal"
                     className="absolute p-0 text-black bg-transparent rounded-full top-4 right-4 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="currentColor"
                     >
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                     </svg>
                  </button>
                  <div
                     className="relative w-full max-w-xl max-h-full p-6 bg-white rounded-lg shadow-lg"
                     onClick={(e) => e.stopPropagation()}
                  >
                     <h3 className="py-2 text-3xl font-extrabold text-teal-500">
                        Booking Form
                     </h3>
                     <form onSubmit={handleSubmit} className="mt-3">
                        <div className="px-4 mb-4">
                           <label className="block mb-2" htmlFor="name">
                              Name
                           </label>
                           <input
                              type="text"
                              id="name"
                              name="name"
                              value={bookingData.name}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border rounded-lg"
                              required
                           />
                        </div>
                        <div className="px-4 mb-4">
                           <label className="block mb-2" htmlFor="email">
                              Email
                           </label>
                           <input
                              type="email"
                              id="email"
                              name="email"
                              value={bookingData.email}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border rounded-lg"
                              required
                           />
                        </div>
                        <div className="px-4 mb-4">
                           <label className="block mb-2" htmlFor="phoneNumber">
                              Phone Number
                           </label>
                           <input
                              type="text"
                              id="phoneNumber"
                              name="phoneNumber"
                              value={bookingData.phoneNumber}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border rounded-lg"
                              required
                           />
                        </div>
                        <div className="px-4 mb-4">
                           <label
                              className="block mb-2"
                              htmlFor="numberOfRooms"
                           >
                              Number of Rooms
                           </label>
                           <input
                              type="number"
                              id="numberOfRooms"
                              name="numberOfRooms"
                              value={bookingData.numberOfRooms}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border rounded-lg"
                              required
                           />
                        </div>

                        <div className="p-4 mb-4 ">
                           <button
                              data-modal-hide="static-modal"
                              type="submit"
                              className="w-full px-4 py-2 text-white bg-teal-500 rounded"
                           >
                              Book Now
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default HotelViewPage;
