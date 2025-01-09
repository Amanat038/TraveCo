import React, { useEffect, useState } from "react";
import axios from "axios";
const Admin = () => {
   const [tourPackages, setTourPackages] = useState([]);
   const [upcomingPackages, setUpcomingPackages] = useState([]);
   const [foreignPackages, setForeignPackages] = useState([]);
   const [hotels, setHotels] = useState([]);
   const [errorMessage, setErrorMessage] = useState("");
   const [bookings, setBookings] = useState([]);
   const [formData, setFormData] = useState({
      title: "",
      description: "",
      price: "",
      availableFates: "",
      rating: "",
      policy: "",
      food: "",
   });
   const [image, setImage] = useState([]);
   // const [message, setMessage] = useState("");
   // const [selectedFile, setSelectedFile] = useState(null);

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedPackageId, setSelectedPackageId] = useState(null);



 






   const [showModal, setShowModal] = useState({
      addPackage: false,
      upcomingPackage: false,
      addHotels: false,
      bookings: false,
      packages: false,
      upcomingTourPackage: false,
      hotels: false,
   });

   const toggleModal = (modalName) => {
      setShowModal((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
   };

   const isValidImageURL = (url) => {
      const regex =
         /^(http|https):\/\/[^ ]+\.(jpeg|jpg|gif|png|bmp|webp|svg)$/i;
      return regex.test(url);
   };

   useEffect(() => {
      const fetchData = async () => {
         try {
            const packagesResponse = await axios.get(
               "https://traveco.onrender.com/packages"
            );
            // console.log(packagesResponse.data);
            setTourPackages(packagesResponse.data);

            const bookingResponse = await axios.get(
               "https://traveco.onrender.com/admin/bookings"
            );
            setBookings(bookingResponse.data);

            const upcomingPackageResponse = await axios.get(
               "https://traveco.onrender.com/upcomingPackage"
            );
            // console.log(upcomingPackageResponse)
            setUpcomingPackages(upcomingPackageResponse.data);

            const foreignPackageResponse = await axios.get(
               "https://traveco.onrender.com/foreignPackages"
            );
            // console.log(upcomingPackageResponse)
            setForeignPackages(foreignPackageResponse.data);

            const hotels = await axios.get("https://traveco.onrender.com/hotels");
            // console.log(upcomingPackageResponse)
            setHotels(hotels.data);
         } catch (error) {
            console.error("error fetching data", error);
         }
      };

      fetchData();
   }, []);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleFileChange = (e) => {
      setImage(e.target.files[0]);
   };

   const handleAddPackage = async (e) => {
      e.preventDefault();

      if (
         !formData.title ||
         !formData.description ||
         !formData.price ||
         !image
      ) {
         // setMessage("All fields are required!");
         return;
      }
      const data = new FormData();
      data.append("image", image);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("availableFates", formData.availableFates);

      // if (!isValidImageURL(formData.image)) {
      //    setErrorMessage("Please enter a valid image URL.");
      //    return;
      // }

      try {
         await axios.post("https://traveco.onrender.com/admin/packages", data, {
            headers: { "Content-Type": "multipart/form-data" },
         });
         alert("Package added successfully");
         setFormData({
            title: "",
            description: "",
            price: "",
            availableFates: "",
            // image: "",
         });

         setImage([null]);
         // Re-fetch data
         const response = await axios.get("https://traveco.onrender.com/packages");
         setTourPackages(response.data);
      } catch (error) {
         console.error("Error adding package", error);
      }
   };

   const upcomingHandleAddPackage = async (e) => {
      e.preventDefault();

      if (!isValidImageURL(formData.image)) {
         setErrorMessage("Please enter a valid image URL.");
         return;
      }

      try {
         await axios.post(
            "https://traveco.onrender.com/admin/UpComingPackages",
            formData
         );
         alert("Upcoming Package added successfully");
         setFormData({
            title: "",
            description: "",
            price: "",
            availableFates: "",
            image: "",
         });
         // Re-fetch data
         const response = await axios.get(
            "https://traveco.onrender.com/upcomingPackages"
         );
         setUpcomingPackages(response.data);
      } catch (error) {
         console.error("Error  adding upcoming package", error);
      }
   };

   const foreignHandleAddPackage = async (e) => {
      e.preventDefault();

      if (!isValidImageURL(formData.image)) {
         setErrorMessage("Please enter a valid image URL.");
         return;
      }

      try {
         await axios.post(
            "https://traveco.onrender.com/admin/foreignPackages",
            formData
         );
         alert("Upcoming Package added successfully");
         setFormData({
            title: "",
            description: "",
            price: "",
            availableFates: "",
            image: "",
         });
         // Re-fetch data
         const response = await axios.get(
            "https://traveco.onrender.com/foreignPackages"
         );
         setForeignPackages(response.data);
      } catch (error) {
         console.error("Error  adding upcoming package", error);
      }
   };

   const hotel = async (e) => {
      e.preventDefault();

      if (
         !formData.title ||
         !formData.description ||
         !formData.price ||
         !image
      ) {
         // setMessage("All fields are required!");
         return;
      }
      const data = new FormData();
      data.append("image", image);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);

      data.append("rating", formData.rating);
      data.append("policy", formData.policy);
      data.append("food", formData.food);

      try {
         await axios.post("https://traveco.onrender.com/admin/hotels", data, {
            headers: { "Content-Type": "multipart/form-data" },
         });
         alert("Hotel added successfully");
         setFormData({
            title: "",
            description: "",
            price: "",
            rating: "",
            policy: "",
            food: "",
         });
         // Re-fetch data
         const response = await axios.get("https://traveco.onrender.com/hotels");
         // console.log(response.data);
         setTourPackages(response.data);
      } catch (error) {
         console.error("Error adding package", error);
      }
   };

   const handleOpenModal = (id) => {
      setSelectedPackageId(id);
      setIsModalOpen(true);
      console.log("id", id);
   };

   const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedPackageId(null);
   };

   const hotelImg = async (id) => {
      console.log("id", id);
      const data = new FormData();

      data.append("image", image);

      try {
         await axios.put(`https://traveco.onrender.com/admin/hotelsImg/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
         });
         alert("HotelImg added successfully");

         setImage([null]);

         // Re-fetch data
         const response = await axios.get("https://traveco.onrender.com/hotels");
         // console.log(response.data);
         setTourPackages(response.data);
      } catch (error) {
         console.error("Error adding package", error);
      }
   };

   const handleDeletePackage = async (id) => {
      try {
         await axios.delete(`https://traveco.onrender.com/admin/packages/${id}`);
         setTourPackages(tourPackages.filter((pkg) => pkg._id !== id));
         // console.log(tourPackages);
         alert("Package deleted successfully");
         // Re-fetch data
         const response = await axios.get("https://traveco.onrender.com/packages");
         setTourPackages(response.data);
      } catch (error) {
         alert("Error deleting package", error);
         console.log("Error deleting package", error);
         console.error("Error deleting package", error);
      }
   };

   const handleUpdatePackage = () => {};

   return (
      <div className="min-h-screen m-auto bg-gray-100">
         <div className="container p-6 mx-auto">
            <div className="flex justify-center">
               <img
                  className="w-20 h-20 "
                  src="https://static.vecteezy.com/system/resources/previews/020/429/953/original/admin-icon-vector.jpg"
                  alt="Admin"
               />
            </div>
            <h1 className="mb-8 text-3xl font-semibold text-center text-teal-700">
               Admin Dashboard
            </h1>

            <div className="w-full p-6 mb-10 bg-white rounded-lg shadow-lg">
               <div className="flex justify-center gap-5">
                  <div className="w-1/4">
                     <select
                        onChange={(e) => toggleModal(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                     >
                        <option value="" disabled selected>
                           Add Packages & Hotels
                        </option>
                        <option value="addPackage">Add New Package</option>
                        <option value="upcomingPackage">
                           Upcoming Package
                        </option>
                        <option value="addForeignPackage">
                           Foreign Package
                        </option>
                        <option value="addHotels">Hotels</option>
                     </select>
                  </div>

                  <div className="w-1/4">
                     <select
                        onChange={(e) => toggleModal(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                     >
                        <option value="" disabled selected>
                           See Packages and Bookings
                        </option>

                        <option value="packages"> Packages</option>
                        <option value="bookings"> Bookings</option>
                        <option value="upcomingTourPackage">
                           {" "}
                           Upcoming Packages
                        </option>
                        <option value="foreignPackages">
                           {" "}
                           Foreign Packages
                        </option>
                        <option value="hotels"> Hotels</option>
                     </select>
                  </div>
               </div>
            </div>

            {/* Add Package Form */}
            {showModal.addPackage && (
               <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="p-6 mb-8 bg-white rounded-lg shadow-lg ">
                     <div className="flex justify-between">
                        <h2 className="mb-4 text-2xl font-semibold text-teal-700">
                           Add New Tour Package
                        </h2>
                        <button
                           className="p-2 mb-4 text-white bg-red-600 rounded"
                           onClick={() => toggleModal("addPackage")}
                        >
                           Close
                        </button>
                     </div>

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
                           name="availableFates"
                           placeholder="Available Dates    date like this  2024-02-01, 2024-03-10, 2024-04-20"
                           value={formData.availableFates}
                           onChange={handleChange}
                           className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                           required
                        />
                        <input
                           type="file"
                           name="image"
                           accept="image/*"
                           value={formData.image}
                           onChange={handleFileChange}
                           className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                           required
                        />
                        {errorMessage && (
                           <p className="text-red-600">{errorMessage}</p>
                        )}
                        <button
                           type="submit"
                           className="w-full py-3 font-bold text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none tex-xl"
                        >
                           Add Package
                        </button>
                     </form>
                  </div>
               </div>
            )}

            {/* Add upcoming Package Form */}

            {showModal.upcomingPackage && (
               <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="p-6 mb-8 bg-white rounded-lg shadow-lg ">
                     <div className="flex justify-between">
                        <h2 className="mb-4 text-2xl font-semibold text-teal-700">
                           Upcoming Tour Packages
                        </h2>
                        <button
                           className="p-2 mb-4 text-white bg-red-600 rounded"
                           onClick={() => toggleModal("upcomingPackage")}
                        >
                           Close
                        </button>
                     </div>

                     <form
                        onSubmit={upcomingHandleAddPackage}
                        className="space-y-4"
                     >
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
                           name="availableFates"
                           placeholder="Available Dates    date like this  2024-02-01, 2024-03-10, 2024-04-20"
                           value={formData.availableFates}
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
                           className="w-full py-3 text-xl font-bold text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none"
                        >
                           Add Upcoming Package
                        </button>
                     </form>
                  </div>
               </div>
            )}

            {/* Add foreign Package Form */}

            {showModal.addForeignPackage && (
               <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="p-6 mb-8 bg-white rounded-lg shadow-lg ">
                     <div className="flex justify-between">
                        <h2 className="mb-4 text-2xl font-semibold text-teal-700">
                           Foreign Tour Packages
                        </h2>
                        <button
                           className="p-2 mb-4 text-white bg-red-600 rounded"
                           onClick={() => toggleModal("addForeignPackage")}
                        >
                           Close
                        </button>
                     </div>

                     <form
                        onSubmit={foreignHandleAddPackage}
                        className="space-y-4"
                     >
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
                           name="availableFates"
                           placeholder="Available Dates    date like this  2024-02-01, 2024-03-10, 2024-04-20"
                           value={formData.availableFates}
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
                           className="w-full py-3 text-xl font-bold text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none"
                        >
                           Add Upcoming Package
                        </button>
                     </form>
                  </div>
               </div>
            )}

            {/* Add hotels Form */}

            {showModal.addHotels && (
               <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="p-6 mb-8 bg-white rounded-lg shadow-lg ">
                     <div className="flex justify-between">
                        <h2 className="mb-4 text-2xl font-semibold text-teal-700">
                           Add New Hotel
                        </h2>
                        <button
                           className="p-2 mb-4 text-white bg-red-600 rounded"
                           onClick={() => toggleModal("addHotels")}
                        >
                           Close
                        </button>
                     </div>
                     <form onSubmit={hotel} className="space-y-4">
                        <input
                           type="text"
                           name="title"
                           placeholder="Title"
                           value={formData.title}
                           onChange={handleChange}
                           className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-50"
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
                           name="rating"
                           placeholder="rating"
                           value={formData.rating}
                           onChange={handleChange}
                           className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                           required
                        />
                        <input
                           type="text"
                           name="food"
                           placeholder="food available or not"
                           value={formData.food}
                           onChange={handleChange}
                           className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                           required
                        />
                        <input
                           type="text"
                           name="policy"
                           placeholder="policy"
                           value={formData.policy}
                           onChange={handleChange}
                           className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                           required
                        />

                        <input
                           type="file"
                           name="image"
                           accept="image/*"
                           value={formData.image}
                           onChange={handleFileChange}
                           className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                           required
                        />
                        {errorMessage && (
                           <p className="text-red-600">{errorMessage}</p>
                        )}
                        <button
                           type="submit"
                           className="w-full py-3 text-xl font-bold text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none"
                        >
                           Add Hotel
                        </button>
                     </form>
                  </div>
               </div>
            )}

            {/* show Package List */}

            {showModal.packages && (
               <div className="w-full p-6 mb-8 bg-white rounded-lg shadow-lg ">
                  <div className="flex justify-between">
                     <h2 className="mb-4 text-3xl font-semibold text-center text-teal-700">
                        All Tour Packages
                     </h2>
                     <button
                        className="p-2 mb-4 text-white bg-red-600 rounded"
                        onClick={() => toggleModal("packages")}
                     >
                        Close
                     </button>
                  </div>
                  <ul className="w-full space-y-4">
                     {tourPackages.map((packageItem) => (
                        <li
                           key={packageItem._id}
                           className="flex flex-col items-center justify-between w-full p-4 border-b border-gray-200 md:grid md:grid-cols-3"
                        >
                           <div className="flex-shrink-0 w-full ">
                              {packageItem.image &&
                              packageItem.image.length > 0 ? (
                                 packageItem.image.map((img, index) => (
                                    <img
                                       key={index}
                                       src={img}
                                       alt={packageItem.title}
                                       className="object-cover w-full h-48 rounded-lg md:h-40 lg:h-48"
                                    />
                                 ))
                              ) : (
                                 <p>No images available</p> // Fallback if no images exist
                              )}
                           </div>
                           <div className="flex-grow mt-4 md:mt-0 md:ml-5">
                              <h3 className="text-xl font-semibold text-teal-600">
                                 <span className="uppercase">Place : </span>
                                 <span className="uppercase">
                                    {packageItem.title}
                                 </span>
                              </h3>
                              <p className="mt-2 text-sm text-gray-600 md:text-base ">
                                 <span className="font-semibold text-teal-600 uppercase">
                                    Info :{" "}
                                 </span>
                                 {packageItem.description}
                              </p>
                              <p className="mt-2 text-sm text-gray-600 md:text-base ">
                                 <span className="font-bold text-teal-500 uppercase">
                                    Available Dates:
                                 </span>{" "}
                                 <span className="font-semibold">
                                    {Array.isArray(
                                       packageItem.availableFates
                                    ) ? (
                                       packageItem.availableFates.map(
                                          (date, index) => (
                                             <span key={index}>
                                                {new Date(
                                                   date
                                                ).toLocaleDateString(
                                                   undefined,
                                                   {
                                                      year: "numeric",
                                                      month: "long",
                                                      day: "numeric",
                                                   }
                                                )}
                                                {index <
                                                packageItem.availableFates
                                                   .length -
                                                   1
                                                   ? ", "
                                                   : ""}
                                             </span>
                                          )
                                       )
                                    ) : (
                                       <span className="ml-2 text-gray-400">
                                          No dates available
                                       </span>
                                    )}
                                 </span>
                              </p>
                              <p className="mt-2 font-bold text-teal-500 uppercase">
                                 Price: ${packageItem.price}
                              </p>
                           </div>

                           <div className="mt-4 md:gap-2 md:mt-0 md:ml-5">
                              <div className="flex items-end">
                                 <button
                                    onClick={() =>
                                       handleDeletePackage(packageItem._id)
                                    }
                                    className="w-20 py-2 mt-2 text-white bg-red-600 rounded-md md:mt-0 hover:bg-red-700 focus:outline-none"
                                 >
                                    Delete
                                 </button>
                                 <button
                                    onClick={() =>
                                       handleUpdatePackage(packageItem._id)
                                    }
                                    className="w-20 px-4 py-2 text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none"
                                 >
                                    Update
                                 </button>
                              </div>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            )}

            {/* show upcoming packages List */}

            {showModal.upcomingTourPackage && (
               <div className="w-full p-6 mb-8 bg-white rounded-lg shadow-lg ">
                  <div className="flex justify-between">
                     <h2 className="mb-4 text-3xl font-semibold text-center text-teal-700">
                        Upcoming Tour Packages
                     </h2>
                     <button
                        className="p-2 mb-4 text-white bg-red-600 rounded"
                        onClick={() => toggleModal("upcomingTourPackage")}
                     >
                        Close
                     </button>
                  </div>
                  <ul className="w-full space-y-4">
                     {upcomingPackages.map((packageItem) => (
                        <li
                           key={packageItem._id}
                           className="flex flex-col items-center justify-between w-full p-4 border-b border-gray-200 md:grid md:grid-cols-3"
                        >
                           <div className="flex-shrink-0 w-full ">
                              <img
                                 src={packageItem.image}
                                 alt={packageItem.title}
                                 className="object-cover w-full h-48 rounded-lg md:h-40 lg:h-48"
                              />
                           </div>
                           <div className="flex-grow mt-4 md:mt-0 md:ml-5">
                              <h3 className="text-xl font-semibold text-teal-600">
                                 <span className="uppercase">Place : </span>
                                 <span className="uppercase">
                                    {packageItem.title}
                                 </span>
                              </h3>
                              <p className="mt-2 text-sm text-gray-600 md:text-base ">
                                 <span className="font-semibold text-teal-600 uppercase">
                                    Info :{" "}
                                 </span>
                                 {packageItem.description}
                              </p>
                              <p className="mt-2 text-sm text-gray-600 md:text-base ">
                                 <span className="font-bold text-teal-500 uppercase">
                                    Available Dates:
                                 </span>{" "}
                                 <span className="font-semibold">
                                    {Array.isArray(
                                       packageItem.availableFates
                                    ) ? (
                                       packageItem.availableFates.map(
                                          (date, index) => (
                                             <span key={index}>
                                                {new Date(
                                                   date
                                                ).toLocaleDateString(
                                                   undefined,
                                                   {
                                                      year: "numeric",
                                                      month: "long",
                                                      day: "numeric",
                                                   }
                                                )}
                                                {index <
                                                packageItem.availableFates
                                                   .length -
                                                   1
                                                   ? ", "
                                                   : ""}
                                             </span>
                                          )
                                       )
                                    ) : (
                                       <span className="ml-2 text-gray-400">
                                          No dates available
                                       </span>
                                    )}
                                 </span>
                              </p>
                              <p className="mt-2 font-bold text-teal-500 uppercase">
                                 Price: ${packageItem.price}
                              </p>
                           </div>

                           <div className="mt-4 md:gap-2 md:mt-0 md:ml-5">
                              <div className="flex items-end">
                                 <button
                                    onClick={() =>
                                       handleDeletePackage(packageItem._id)
                                    }
                                    className="w-20 py-2 mt-2 text-white bg-red-600 rounded-md md:mt-0 hover:bg-red-700 focus:outline-none"
                                 >
                                    Delete
                                 </button>
                                 <button
                                    onClick={() =>
                                       handleUpdatePackage(packageItem._id)
                                    }
                                    className="w-20 px-4 py-2 text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none"
                                 >
                                    Update
                                 </button>
                              </div>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            )}

            {/* show foreign packages List */}

            {showModal.foreignPackages && (
               <div className="w-full p-6 mb-8 bg-white rounded-lg shadow-lg ">
                  <div className="flex justify-between">
                     <h2 className="mb-4 text-3xl font-semibold text-center text-teal-700">
                        Foreign Tour Packages
                     </h2>
                     <button
                        className="p-2 mb-4 text-white bg-red-600 rounded"
                        onClick={() => toggleModal("foreignPackages")}
                     >
                        Close
                     </button>
                  </div>
                  <ul className="w-full space-y-4">
                     {foreignPackages.map((packageItem) => (
                        <li
                           key={packageItem._id}
                           className="flex flex-col items-center justify-between w-full p-4 border-b border-gray-200 md:grid md:grid-cols-3"
                        >
                           <div className="flex-shrink-0 w-full ">
                              <img
                                 src={packageItem.image}
                                 alt={packageItem.title}
                                 className="object-cover w-full h-48 rounded-lg md:h-40 lg:h-48"
                              />
                           </div>
                           <div className="flex-grow mt-4 md:mt-0 md:ml-5">
                              <h3 className="text-xl font-semibold text-teal-600">
                                 <span className="uppercase">Place : </span>
                                 <span className="uppercase">
                                    {packageItem.title}
                                 </span>
                              </h3>
                              <p className="mt-2 text-sm text-gray-600 md:text-base ">
                                 <span className="font-semibold text-teal-600 uppercase">
                                    Info :{" "}
                                 </span>
                                 {packageItem.description}
                              </p>
                              <p className="mt-2 text-sm text-gray-600 md:text-base ">
                                 <span className="font-bold text-teal-500 uppercase">
                                    Available Dates:
                                 </span>{" "}
                                 <span className="font-semibold">
                                    {Array.isArray(
                                       packageItem.availableFates
                                    ) ? (
                                       packageItem.availableFates.map(
                                          (date, index) => (
                                             <span key={index}>
                                                {new Date(
                                                   date
                                                ).toLocaleDateString(
                                                   undefined,
                                                   {
                                                      year: "numeric",
                                                      month: "long",
                                                      day: "numeric",
                                                   }
                                                )}
                                                {index <
                                                packageItem.availableFates
                                                   .length -
                                                   1
                                                   ? ", "
                                                   : ""}
                                             </span>
                                          )
                                       )
                                    ) : (
                                       <span className="ml-2 text-gray-400">
                                          No dates available
                                       </span>
                                    )}
                                 </span>
                              </p>
                              <p className="mt-2 font-bold text-teal-500 uppercase">
                                 Price: ${packageItem.price}
                              </p>
                           </div>

                           <div className="mt-4 md:gap-2 md:mt-0 md:ml-5">
                              <div className="flex items-end">
                                 <button
                                    onClick={() =>
                                       handleDeletePackage(packageItem._id)
                                    }
                                    className="w-20 py-2 mt-2 text-white bg-red-600 rounded-md md:mt-0 hover:bg-red-700 focus:outline-none"
                                 >
                                    Delete
                                 </button>
                                 <button
                                    onClick={() =>
                                       handleUpdatePackage(packageItem._id)
                                    }
                                    className="w-20 px-4 py-2 text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none"
                                 >
                                    Update
                                 </button>
                              </div>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            )}

            {showModal.hotels && (
               <div className="w-full p-6 mb-8 bg-white rounded-lg shadow-lg ">
                  <div className="flex justify-between ">
                     <h2 className="mb-4 text-3xl font-semibold text-center text-teal-700">
                        Available Hotels
                     </h2>
                     <button
                        className="p-2 mb-4 text-white bg-red-600 rounded"
                        onClick={() => toggleModal("hotels")}
                     >
                        Close
                     </button>
                  </div>
                  <ul className="w-full space-y-4">
                     {hotels.map((packageItem) => (
                        <li
                           key={packageItem._id}
                           className="flex flex-col items-center justify-between w-full p-4 border-b border-gray-200 md:grid md:grid-cols-3"
                        >
                           <div className="flex-shrink-0 w-full ">
                              <img
                                 src={packageItem.image}
                                 alt={packageItem.title}
                                 className="object-cover w-full h-48 rounded-lg md:h-40 lg:h-48"
                              />
                           </div>
                           <div className="flex-grow mt-4 md:mt-0 md:ml-5">
                              <h3 className="text-xl font-semibold text-teal-600">
                                 <span className="uppercase">Place : </span>
                                 <span className="uppercase">
                                    {packageItem.title}
                                 </span>
                              </h3>
                              <p className="mt-2 ">
                                 <span className="font-bold text-teal-500 uppercase">
                                    Info :{" "}
                                 </span>
                                 {packageItem.description}
                              </p>

                              <p className="flex mt-2">
                                 <span className="font-bold text-teal-500 uppercase">
                                    {" "}
                                    Rating:{" "}
                                 </span>{" "}
                                 {Array.from({ length: 5 }, (_, index) =>
                                    index < Math.floor(packageItem.rating)
                                       ? "★"
                                       : "☆"
                                 ).map((star, index) => (
                                    <span key={index} className="flex">
                                       {star}{" "}
                                    </span>
                                 ))}
                              </p>
                              <p className="mt-2 ">
                                 <span className="font-bold text-teal-500 uppercase">
                                    {" "}
                                    Food:
                                 </span>{" "}
                                 {packageItem.food}
                              </p>
                              <p className="mt-2 ">
                                 <span className="font-bold text-teal-500 uppercase">
                                    {" "}
                                    Policy:
                                 </span>{" "}
                                 {packageItem.policy}
                              </p>
                              <p className="mt-2 ">
                                 <span className="font-bold text-teal-500 uppercase">
                                    {" "}
                                    Price:
                                 </span>{" "}
                                 ${packageItem.price}
                              </p>
                           </div>

                           <div className="mt-4 md:gap-2 md:mt-0 md:ml-5">
                              <div className="flex items-end">
                                 <button
                                    onClick={() => {
                                       handleOpenModal(packageItem._id);
                                    }}
                                    className="w-20 py-2 mt-2 text-white bg-teal-400 rounded-md md:mt-0 hover:bg-teal-500 focus:outline-none"
                                 >
                                    Upload
                                 </button>
                                 <button
                                    onClick={() =>
                                       handleDeletePackage(packageItem._id)
                                    }
                                    className="w-20 py-2 mt-2 text-white bg-red-600 rounded-md md:mt-0 hover:bg-red-700 focus:outline-none"
                                 >
                                    Delete
                                 </button>
                                 <button
                                    onClick={() => hotelImg(packageItem._id)}
                                    className="w-20 px-4 py-2 text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none"
                                 >
                                    Update
                                 </button>
                              </div>
                           </div>

                           {isModalOpen && (
                              <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
                                 <div className="p-6 bg-white rounded-lg shadow-lg w-96">
                                    <h2 className="mb-4 text-xl font-semibold">
                                       Upload Images
                                    </h2>
                                    <p className="mb-4">
                                       Upload content for package:{" "}
                                       {/* <strong>{packageItem?.name}</strong> */}
                                    </p>
                                    <form
                                       onSubmit={(e) => {
                                          hotelImg(selectedPackageId);
                                          e.preventDefault();
                                       }}
                                    >
                                       <input
                                          type="file"
                                          name="image"
                                          accept="image/*"
                                          value={formData.image}
                                          onChange={handleFileChange}
                                          className="w-full px-4 py-2 mb-4 border rounded-md"
                                       />

                                       <button
                                          type="submit"
                                          className="w-full py-2 text-white bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none"
                                       >
                                          Submit
                                       </button>
                                    </form>
                                    <button
                                       onClick={handleCloseModal}
                                       className="w-full py-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
                                    >
                                       Close
                                    </button>
                                 </div>
                              </div>
                           )}
                        </li>
                     ))}
                  </ul>
               </div>
            )}

            {/* show Bookings List */}

            {showModal.bookings && (
               <div className="p-6 bg-white rounded-lg shadow-lg">
                  <div className="flex justify-between">
                     <h2 className="mb-4 text-2xl font-semibold text-teal-700">
                        All Bookings
                     </h2>
                     <button
                        className="p-2 mb-4 text-white bg-red-600 rounded"
                        onClick={() => toggleModal("bookings")}
                     >
                        Close
                     </button>
                  </div>
                  <ul className="space-y-4">
                     {bookings.map((booking) => (
                        <li
                           key={booking._id}
                           className="p-4 border-b border-gray-200"
                        >
                           <p className="text-lg font-semibold text-teal-600">
                              User Name : {booking.name}
                           </p>
                           <p className="text-gray-600">
                              Package: {booking.packageId.title}
                           </p>
                           <p className="text-gray-600">
                              Booking Date: {booking.createdAt}
                           </p>
                           <p className="text-gray-600">
                              Price: {booking.packageId.price}
                           </p>
                           <p className="text-gray-600">
                              Number Of Travelers: {booking.numberOfTravelers}
                           </p>
                           <p className="text-gray-600">
                              Total Price: {booking.totalPrice}
                           </p>
                        </li>
                     ))}
                  </ul>
               </div>
            )}

            {/* Modal */}
         </div>
      </div>
   );
};
export default Admin;
