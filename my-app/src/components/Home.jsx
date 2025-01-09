import React from "react";
import Navbar from "./Navbar";
// import Banner from "./banner";
import Slider from "./Slider";
import Footer from "./Footer";
import { Outlet } from "react-router-dom"
;
import { useEffect } from "react";


const Home = () => {

   useEffect(() => {
      const userInfo = localStorage.getItem("userInfo");

      if (userInfo) {
         // If user info exists, you might want to navigate or set the state accordingly
         console.log("User info is already stored");
        
         // navigate("/");
      } else {
         // Handle the case where the user is not logged in
         console.log("No user info found, user not logged in");
      }
   }, []);



   
   return (
      <div className="flex flex-col min-h-screen bg-cover ">
         <header className="text-white bg-black ">
            <Navbar />
            <Slider/>
         </header>

         <main className="flex-grow ">
            <Outlet />
            
         </main>
         
         <footer className="text-white bg-gray-800 ">
            <div className="text-center">
               <Footer />
             
            </div>
         </footer>
      </div>
   );
};

export default Home;
