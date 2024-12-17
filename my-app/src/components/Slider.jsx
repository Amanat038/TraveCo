import React from "react";
import {useState} from "react"
const Slider = () => {
   const images = [
      {
         src: "https://wallpaperaccess.com/full/108160.jpg",
         caption:"Lake View"
      },
      {
         src: "https://www.kayak.co.uk/news/wp-content/uploads/sites/5/2022/12/DEST_CHINA_ZHANGYE_DANXIA_LANDFORM_GettyImages-961684310.jpg",
         caption:"Beautiful Landscape"
      },
      {
         src: "https://www.wallpaperflare.com/static/750/259/632/landscape-nature-mountain-wallpaper.jpg",
         caption:"Mountain View"
      },

   ];


   const [currentIndex,setCurrentIndex] =useState(0)


  //  useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => 
  //     prevIndex === images.length -1 ? 0 : prevIndex +1)
  //   },3000)
  //   return() => clearInterval(interval)
  //  },[images.length])
  
   const nextSlide = () => {
      setCurrentIndex((prevIndex) =>
         prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
   };

   const prevSlide = () => {
      setCurrentIndex((prevIndex) =>
         prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
   };
   return <div className="relative w-full md:h-60">
    <img className="w-full h-full" src={images[currentIndex].src} alt={images[currentIndex].caption} />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
      <h2 className="text-2xl font-bold md:text-4xl">
        {images[currentIndex].caption}
      </h2>
      <p className="mt-2 text-lg md:text-xl">Explore The Beauty!</p>
    </div>

    <button className="absolute p-2 text-white transform -translate-y-1/2 bg-white bg-opacity-50  top-1/2 rounded-full hover:bg-gray-600 left-4 " onClick={prevSlide}></button>
    <button className="absolute p-2 text-white transform -translate-y-1/2 bg-white bg-opacity-50 top-1/2  rounded-full hover:bg-gray-600 right-4" onClick={nextSlide}></button>

   </div>;
};

export default Slider;
