import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {Link, useNavigate } from "react-router-dom";
const Navbar = () => {
   const [userInfo, setUserInfo] = useState(null);

   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");
   const navigate = useNavigate();

   useEffect(() => {
      const storedUser = localStorage.getItem("userInfo");
      if (storedUser) {
         setUserInfo(JSON.parse(storedUser));
      }
   }, []);

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   const logOut = () => {
      localStorage.removeItem("userInfo");
      setUserInfo(null);
      window.location.href = "/login";
   };

   const handleSearch = (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
         navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      }
   };

   return (
      <nav className="text-white bg-black shadow-md ">
         <div className="container px-2 mx-auto md:px-0 lg:px-8 ">
            <div className="flex items-center justify-between h-16">
               <div className="flex-shrink-0">
                  <Link to="/" className="text-4xl font-bold text-teal-500">
                     TraveCo.
                  </Link>
               </div>

               <div className="hidden space-x-8 lg:flex">
                  <form
                     onSubmit={handleSearch}
                     className="items-center hidden space-x-8 lg:flex"
                  >
                     <div className="flex w-[300px] h-8">
                        <input
                           type="text"
                           placeholder="Search..."
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           className="rounded-l-lg p-1 text-black w-[300px]"
                        />
                        <button
                           type="submit"
                           className="h-8 px-2 bg-white rounded-r-lg"
                        >
                           <img
                              className="w-6 h-6"
                              src="https://www.freeiconspng.com/uploads/search-icon-png-21.png"
                              alt="Search"
                           />
                        </button>
                     </div>
                  </form>
                  <Link
                     to="/"
                     className="text-lg font-semibold hover:text-teal-500"
                  >
                     Home
                  </Link>
                  <Link
                     to="/tour"
                     className="text-lg font-semibold hover:text-teal-500"
                  >
                     All-Packages
                  </Link>
                  <Link
                     to="/about"
                     className="text-lg font-semibold hover:text-teal-500"
                  >
                     About-Us
                  </Link>

                  {userInfo ? (
                     <>
                        <button
                           onClick={logOut}
                           className="text-lg font-semibold cursor-pointer CUR hover:text-teal-500"
                        >
                           LogOut
                        </button>
                        {userInfo.role === "admin" && (
                           <Link
                              to="/admin"
                              className="text-lg font-semibold hover:text-teal-500"
                           >
                              <img
                                 className="w-8 h-8"
                                 src="https://static.vecteezy.com/system/resources/previews/020/429/953/original/admin-icon-vector.jpg"
                                 alt="Admin"
                              />
                           </Link>
                        )}
                     </>
                  ) : (
                     <Link
                        to="/login"
                        className="text-lg font-semibold cursor-pointer hover:text-teal-500"
                     >
                        Login
                     </Link>
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
               <Link
                  to="/"
                  onClick={toggleMenu}
                  className="block px-4 py-2 hover:bg-teal-500"
               >
                  {" "}
                  Home
               </Link>
               <Link
                  to="#"
                  onClick={toggleMenu}
                  className="block px-4 py-2 hover:bg-teal-500"
               >
                  {" "}
                  All Package
               </Link>
               <Link
                  to="/about"
                  onClick={toggleMenu}
                  className="block px-4 py-2 cursor-pointer hover:bg-teal-500"
               >
                  {" "}
                  About Us
               </Link>

               {userInfo ? (
                  <>
                     <Link
                        onClick={logOut}
                        className="block px-4 py-2 cursor-pointer hover:bg-teal-500"
                     >
                        LogOut
                     </Link>
                     {userInfo.role === "admin" && (
                        <Link
                           to="/admin"
                           className="block px-4 py-2 hover:bg-teal-500"
                        >
                           <img
                              className="w-8 h-8"
                              src="https://static.vecteezy.com/system/resources/previews/020/429/953/original/admin-icon-vector.jpg"
                              alt="Admin"
                           />
                        </Link>
                     )}
                  </>
               ) : (
                  <Link
                     to="/login"
                     className="text-lg font-semibold cursor-pointer hover:text-teal-500"
                  >
                     Login
                  </Link>
               )}

               <form
                  onSubmit={handleSearch}
                  className="flex items-center w-full"
               >
                  <input
                     type="text"
                     placeholder="Search..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="rounded-l-lg p-1 text-black w-[300px]"
                  />
                  <button
                     type="submit"
                     className="h-8 px-2 bg-white rounded-r-lg"
                  >
                     <img
                        className="w-6 h-6"
                        src="https://www.freeiconspng.com/uploads/search-icon-png-21.png"
                        alt="Search"
                     />
                  </button>
               </form>
            </div>
         )}
      </nav>
   );
};

export default Navbar;
