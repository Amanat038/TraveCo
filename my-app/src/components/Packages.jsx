import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Package = () => {
   const navigate = useNavigate();

   const [packages, setPackages] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);
   // const [isAuthenticated, setIsAuthenticated] = useState(false);

   const isAuthenticated = localStorage.getItem("authToken") ? true : false;



   
   useEffect(() => {
      const fetchPackages = async () => {
         try {
            const response = await fetch("https://traveco.onrender.com/packages");
            if (!response.ok) {
               throw new Error("Failed to fetch packages");
            }
            const data = await response.json();
            setPackages(data); // Set packages to state
         } catch (err) {
            setError(err.message);
         } finally {
            setIsLoading(false);
         }
      };

      fetchPackages();
   }, []);


   
   
   const handleBuyPackage = (pkgId) => {
      if (!isAuthenticated) {
         alert("you need to log in to purchase a package.");
         navigate("/login");
      } else {
         navigate(`/packageinfo/${pkgId}`);
      }
   };

   if (isLoading) {
      return <div>Loading packages...</div>;
   }

   if (error) {
      return <div>Error: {error}</div>;
   }

   return (
      <div className="md:text-center w-[80%] m-auto md:mt-10  mt-4">
         <h1 className="text-5xl font-extrabold text-center text-teal-700 md:mb-10">
            All Packages
         </h1>

         <div className="grid grid-cols-1 gap-8 m-5 mt-8 md:grid-cols-2 lg:grid-cols-3 md:m-8 sm:m-6">
            {packages.length === 0 ? (
               <div>No Packages available at the moment.</div>
            ) : (
               packages.map((pkg) => (
                  <div
                     key={pkg.id}
                     className="p-4 overflow-hidden bg-red-100 rounded-lg shadow-lg"
                  >
                    <img src={pkg.image} onClick={() => handleBuyPackage(pkg._id)} className="object-cover w-full h-48 rounded cursor-pointer" alt="" />
                     <h2 className="mt-4 text-xl font-bold text-teal-700 uppercase md:text-2xl">
                        {pkg.title}
                     </h2>
                     <p className="mt-4 text-lg md:mt-6">{pkg.description.split("").slice(0,100).join("")}{pkg.description.split("").length > 100 && "..."}</p>
                     {/* <p className="text-xl font-semibold">$ {pkg.price}</p> */}
                     <button
                        onClick={() => handleBuyPackage(pkg._id)}
                        className="w-full px-4 py-2 mt-10 text-white bg-teal-500 rounded hover:bg-teal-800"
                     >
                        View{pkg.name}
                     </button>
                  </div>
               ))
            )}
         </div>
      </div>
   );
};

export default Package;
