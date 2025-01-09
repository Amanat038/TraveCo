import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Hometourdisplay = () => {
   const navigate = useNavigate();

   const [packages, setPackages] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchPackages = async () => {
         try {
            const response = await fetch("http://localhost:4600/packages?limit=3"); // Fetch limited packages
            if (!response.ok) {
               throw new Error("Failed to fetch packages");
            }
            const data = await response.json();
            setPackages(data);
         } catch (err) {
            setError(err.message);
         } finally {
            setIsLoading(false);
         }
      };

      fetchPackages();
   }, []);

   if (isLoading) {
      return <div>Loading packages...</div>;
   }

   if (error) {
      return <div>Error: {error}</div>;
   }

   return (
      <div className="w-[80%] m-auto text-center lg:mt-10">
         <h1 className="text-5xl font-extrabold text-teal-700 lg:mb-10">Featured Packages</h1>

         <div className="grid grid-cols-1 gap-8 m-5 md:grid-cols-2 lg:grid-cols-3">
            {packages.length === 0 ? (
               <div>No Packages available at the moment.</div>
            ) : (
               packages.map((pkg) => (
                  <div
                     key={pkg.id}
                     className="p-4 overflow-hidden bg-red-100 rounded-lg shadow-lg"
                  >
                     <img src={pkg.image} className="object-cover w-full h-48 rounded" alt="" />
                     <h2 className="pb-3 mt-4 text-xl font-bold text-teal-700 uppercase md:text-2xl">{pkg.title}</h2>
                     <p className="text-lg">{pkg.description.split("").slice(0,100).join("")}{pkg.description.split("").length > 100 && "..."}</p>
                     {/* <p className="pt-3 text-xl font-semibold text-teal-700">$ {pkg.price}</p> */}
                     <button
                        onClick={() => navigate(`/packageinfo/${pkg._id}`)}
                        className="w-full px-4 py-2 mt-10 text-white bg-teal-500 rounded hover:bg-teal-800"
                     >
                        View {pkg.name}
                     </button>
                  </div>
               ))
            )}
         </div>

         <button
            onClick={() => navigate("/tour")}
            className="px-6 py-2 m-4 text-white bg-teal-500 rounded hover:bg-teal-800"
         >
            View All Packages
         </button>
      </div>
   );
};

export default Hometourdisplay ;
