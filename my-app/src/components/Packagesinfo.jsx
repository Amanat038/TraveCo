import { useEffect, useState } from "react";
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
   const { id } = useParams();
   const [packageDetails, setPackageDetails] = useState(null);
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
            if (!response.ok) {
               throw new Error("Failed to fetch package details");
            }
            const data = await response.json();
            console.log("Package Details Response:", data);
            setPackageDetails(data);
         } catch (err) {
            setError(err.message);
         } finally {
            setIsLoading(false);
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
            console.log("Booking Data:", data);
            console.log("Package Details:", packageDetails);

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

   return (
      <div className="md:text-center w-[80%] m-auto">
         <h1 className="mb-8 text-5xl font-extrabold text-center text-red-800">
            {packageDetails.title}
         </h1>

         <div className="p-4 overflow-hidden bg-white rounded-lg shadow-lg">
            <img
               src={packageDetails.image}
               alt={packageDetails.title}
               className="object-cover w-full h-60"
            />
            <h2 className="mt-4 text-2xl font-bold">{packageDetails.title}</h2>
            <p className="mt-2 text-lg">{packageDetails.description}</p>
            <p className="mt-2 text-xl font-semibold">{packageDetails.price}</p>

            <button
               className="w-full px-4 py-2 mt-4 text-white bg-teal-500 rounded"
               onClick={() => setIsBooking(true)}
            >
               Buy Package
            </button>
         </div>
         {isBooking && (
            <div className="p-4 mt-8 bg-gray-100 rounded-lg">
               <h3 className="text-xl font-semibold">Booking Form</h3>
               <form onSubmit={handleSubmit} className="mt-4">
                  <div className="mb-4">
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
                  <div className="mb-4">
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
                  <div className="mb-4">
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
                  <div className="mb-4">
                     <label className="block mb-2" htmlFor="numberOfTravelers">
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
                  <div className="mb-4">
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
                  <button
                     type="submit"
                     className="w-full px-4 py-2 text-white bg-teal-500 rounded"
                  >
                     Confirm Booking
                  </button>
               </form>
            </div>
         )}
      </div>
   );
};

export default Packageinfo;
