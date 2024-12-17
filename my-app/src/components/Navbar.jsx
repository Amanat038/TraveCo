import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Navbar = () => {
   const [userInfo, setUserInfo] = useState(null);

   const [isMenuOpen, setIsMenuOpen] = useState(false);

   useEffect(() => {
      const storedUser = localStorage.getItem("userInfo");
      if (storedUser) {
         setUserInfo(JSON.parse(storedUser));
      }
   }, []);

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   return (
      <nav className="text-white bg-black shadow-md ">
         <div className="container px-4 mx-auto sm:px-6 lg:px-8 ">
            <div className="flex items-center justify-between h-16">
               <div className="flex-shrink-0">
                  <a href="#" className="text-4xl font-bold text-teal-500">
                     TraveCo.
                  </a>
               </div>

               {/* <div><input type="text" className="p-1 text-black rounded"/></div> */}

               <div className="hidden space-x-8 lg:flex">
                  <div className="flex w-[300px] h-8">
                     <input
                        type="text"
                        className="rounded-lt  rounded-lb p-1 text-black w-[300px]"
                     />
                     <img
                        className="h-8 bg-white rounded-tr rounded-br w-50 color-white"
                        src="https://www.freeiconspng.com/uploads/search-icon-png-21.png"
                        alt=""
                     />
                  </div>
                  <a
                     href="/"
                     className="text-lg font-semibold hover:text-teal-500"
                  >
                     Home
                  </a>
                  <a
                     href="#home"
                     className="text-lg font-semibold hover:text-teal-500"
                  >
                     All-Packages
                  </a>
                  <a
                     href="#home"
                     className="text-lg font-semibold hover:text-teal-500"
                  >
                     About-Us
                  </a>
                  {userInfo && userInfo.role === "admin" && (
                     <a
                        href="/admin"
                        className="text-lg font-semibold hover:text-teal-500"
                     >
                        <img
                           className="w-8 h-8"
                           src="https://static.vecteezy.com/system/resources/previews/020/429/953/original/admin-icon-vector.jpg"
                           alt="admin"
                        />
                     </a>
                  )}
               </div>

               <div className="lg:hidden">
                  <button
                     onClick={toggleMenu}
                     className="text-white focus:outline-none"
                  >
                     <svg
                        className="w-6 h-6 "
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                     </svg>
                  </button>
               </div>
            </div>
         </div>

         {isMenuOpen && (
            <div className="bg-black lg:hidden">
               {/* <div className="flex w-[80vh] h-8" ><input type="text" className="p-1 text-black rounded-lt rounded-lb"/><img className="h-8 bg-white rounded-tr rounded-br w-50 color-white" src="https://www.freeiconspng.com/uploads/search-icon-png-21.png" alt="" /></div> */}
               <a
                  href="#"
                  onClick={toggleMenu}
                  className="block px-4 py-2 hover:bg-teal-500"
               >
                  {" "}
                  Home
               </a>
               <a
                  href="#"
                  onClick={toggleMenu}
                  className="block px-4 py-2 hover:bg-teal-500"
               >
                  {" "}
                  All Package
               </a>
               <a
                  href="#"
                  onClick={toggleMenu}
                  className="block px-4 py-2 hover:bg-teal-500"
               >
                  {" "}
                  About Us
               </a>

               <a
                  href="#"
                  onClick={toggleMenu}
                  className="block px-4 py-2 hover:bg-teal-500"
               >
                  {" "}
                  Admin Panel
               </a>
            </div>
         )}
      </nav>
   );
};

export default Navbar;
