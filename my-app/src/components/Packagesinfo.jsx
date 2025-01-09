import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import axios from "axios";

const generateInvoicePDF = (invoice) => {
   const doc = new jsPDF();
   doc.text("TraveCo. Invoice ", 20, 10);
   doc.text("Customer info :- ", 20, 20);

   doc.text(`   Name: ${invoice.name}`, 20, 30);
   doc.text(`   Email: ${invoice.email}`, 20, 40);
   doc.text(`   Phone Number: ${invoice.phoneNumber}`, 20, 50);

   doc.text("Package Info :-", 20, 60);
   doc.text(`   Price Per Person: ${invoice.pricePerPerson}`, 20, 70);
   doc.text(`   Title: ${invoice.title}`, 20, 80);

   doc.text("Booking Details:- ", 20, 90);
   doc.text(`   Number Of Travelers: ${invoice.numberOfTravelers}`, 20, 100);
   doc.text(`   Total Price: ${invoice.totalPrice}`, 20, 110);
   doc.text(" ", 20, 120);
   doc.text("                     Thank You for Chose TraveCo. ", 20, 130);

   doc.save("invoice.pdf");
};

const Packageinfo = () => {
   const navigate = useNavigate();

   const isAuthenticated = localStorage.getItem("authToken") ? true : false;
   const { id } = useParams();
   const [packageDetails, setPackageDetails] = useState(null);
   const [hotel, setHotels] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);
   const [isBooking, setIsBooking] = useState(false);
   const [bookingData, setBookingData] = useState({
      name: "",
      email: "",
      phoneNumber: "",
      numberOfTravelers: 1,
      specialRequests: "",
   });

   useEffect(() => {
      const fetchPackageDetails = async () => {
         try {
            const response = await fetch(`http://localhost:4600/package/${id}`);
            const data = await response.json();
            setPackageDetails(data);

            const hotels = await axios.get("http://localhost:4600/hotels");

            setHotels(hotels.data);
            console.log(hotels.data);
         } catch (err) {
            setError(err.message);
         } finally {
            setIsLoading(false);
         }
      };

      fetchPackageDetails();
   }, []);

   const handleBuyPackage = (pkgId) => {
      if (!isAuthenticated) {
         alert("you need to log in to purchase a package.");
         navigate("/login");
      } else {
         navigate(`/hotelView/${pkgId}`);
      }
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setBookingData({ ...bookingData, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await fetch("http://localhost:4600/bookings", {
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
               numberOfTravelers: data.invoice.bookingDetails.numberOfTravelers,
               number: data.invoice.customer.phoneNumber,
               pricePerPerson: data.invoice.package.pricePerPerson,
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

   if (isLoading) {
      return <div>Loading package details...</div>;
   }

   if (error) {
      return <div>Error: {error}</div>;
   }

   if (!packageDetails) {
      return <div>No package found.</div>;
   }

   const handlePayment = async () => {
      try {
         const response = await fetch("http://localhost:4600/create-order", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               amount: packageDetails.price, // Assuming price is the amount user needs to pay
            }),
         });

         const data = await response.json();

         if (data.order) {
            const options = {
               key: "your_key_id", // Razorpay key
               amount: data.order.amount, // Amount in paise
               currency: "INR",
               name: "TraveCo",
               description: "Booking Payment",
               order_id: data.order.id,
               handler: function (response) {
                  // Here, you can handle payment success
                  alert("Payment successful!");
                  console.log(response);
                  // You can call an API here to verify the payment if needed
               },
               prefill: {
                  name: bookingData.name,
                  email: bookingData.email,
                  contact: bookingData.phoneNumber,
               },
               notes: {
                  address: "TraveCo Address",
               },
               theme: {
                  color: "#528FF0",
               },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
         }
      } catch (error) {
         console.error("Error initiating payment:", error);
         alert("Error initiating payment");
      }
   };

   return (
      <div className="md:text-center md:w-[70%] m-auto mb-8 ">
         <h1 className="mb-8 text-5xl font-extrabold text-center text-teal-700 uppercase">
            {packageDetails.title}
         </h1>

         <div className="p-6 gap-6 overflow-hidden bg-white rounded-lg shadow-lg text-start flex ">
            <div className="  w-1/3">
               <img
                  src={packageDetails.image}
                  alt={packageDetails.title}
                  className="object-cover w-full h-[100%] rounded"
               />
            </div>

            <div className="w-2/3">
               <h2 className="mt-4 text-xl font-bold text-teal-500 uppercase md:mt-6 md:text-3xl">
                  {packageDetails.title}
               </h2>
               <p className="mt-4 text-sm md:mt-6 md:text-lg text-start text-wrap">
                  {packageDetails.description}
               </p>
               <p className="mt-4 md:mt-6">
                  <span className="text-xl font-semibold text-teal-600">
                     Available Dates :{" "}
                  </span>
                  <span className="font-semibold md:text-lg">
                     {Array.isArray(packageDetails.availableFates) ? (
                        packageDetails.availableFates.map((date, index) => (
                           <span key={index}>
                              {new Date(date).toLocaleDateString(undefined, {
                                 year: "numeric",
                                 month: "long",
                                 day: "numeric",
                              })}
                              {index < packageDetails.availableFates.length - 1
                                 ? ", "
                                 : ""}
                           </span>
                        ))
                     ) : (
                        <span className="ml-2 text-gray-400">
                           No dates available
                        </span>
                     )}
                  </span>
               </p>
               <p className="mt-2 text-xl font-semibold">
                  {" "}
                  <span className="text-teal-600">Price : </span>${" "}
                  <span className="text-lg md:text-lg">
                     {packageDetails.price}
                  </span>
               </p>

               <button
                  className="w-full px-4 py-2 mt-10 text-white bg-teal-500 rounded hover:bg-teal-800"
                  onClick={() => setIsBooking(true)}
                  data-modal-target="default-modal"
                  data-modal-toggle="default-modal"
               >
                  Buy Package
               </button>
            </div>
         </div>
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
                           htmlFor="numberOfTravelers"
                        >
                           Number of Travelers
                        </label>
                        <input
                           type="number"
                           id="numberOfTravelers"
                           name="numberOfTravelers"
                           value={bookingData.numberOfTravelers}
                           onChange={handleChange}
                           className="w-full px-4 py-2 border rounded-lg"
                           required
                        />
                     </div>
                     <div className="px-4 mb-4">
                        <label className="block mb-2" htmlFor="specialRequests">
                           Special Requests
                        </label>
                        <textarea
                           id="specialRequests"
                           name="specialRequests"
                           value={bookingData.specialRequests}
                           onChange={handleChange}
                           className="w-full px-4 py-2 border rounded-lg"
                        />
                     </div>
                     <div className="p-4 mb-4 ">
                        <button
                           data-modal-hide="static-modal"
                           type="submit"
                           className="w-full px-4 py-2 text-white bg-teal-500 rounded"
                           onClick={handlePayment}
                        >
                           Payment
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}

         <div className="md:text-center w-[100%] m-auto md:mt-10  mt-4">
            <h1 className="text-5xl font-extrabold text-center text-teal-700 md:mb-10">
               Hotels
            </h1>

            <div className="grid grid-cols-3 gap-8 m-5 mt-8 md:grid-cols-5 lg:grid-cols-6 md:m-8 sm:m-6 h-[200px] md:h-[220px]">
               {hotel.length === 0 ? (
                  <div>No Hotels available at the moment.</div>
               ) : (
                  hotel.map((pkg) => (
                     <div
                        key={pkg.id}
                        className="p-2 overflow-hidden bg-red-100 rounded-lg shadow-lg"
                     >
                        <img
                           src={pkg.image[0]}
                           onClick={() => handleBuyPackage(pkg._id)}
                           className="object-cover w-full h-[50%] rounded cursor-pointer"
                           alt=""
                        />
                        <h2 className="mt-2 text-sm font-bold text-teal-700 uppercase md:text-md">
                           {pkg.title}
                        </h2>

                        <button
                           onClick={() => handleBuyPackage(pkg._id)}
                           className="fixed w-full px-1 py-1 mt-3 text-white bg-teal-500 rounded hover:bg-teal-800 relative bottom-1"
                        >
                           View{pkg.name}
                        </button>
                     </div>
                  ))
               )}
            </div>
         </div>
      </div>
   );
};

export default Packageinfo;
