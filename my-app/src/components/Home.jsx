import React from "react";
import Navbar from "./Navbar";
// import Banner from "./banner";
import Slider from "./Slider";
import Footer from "./Footer";
import Packageinfo from "./Packages";
import { Outlet } from "react-router-dom"


const Home = () => {
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
