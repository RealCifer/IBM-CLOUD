import React, { useState, useEffect } from "react";

const banners = [
  "/Banner.png", 
  "/Banner1.png",
  "/Banner2.png", 
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const nextBanner = () => {
    setFade(false); // Start fade-out effect
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
      setFade(true); // Fade-in effect
    }, 500); // Slow down fade-out before changing image
  };

  const prevBanner = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
      setFade(true);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(nextBanner, 4000); // Slower transition time
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-40 lg:h-full overflow-hidden">
      {/* Navigation buttons */}
      <button onClick={prevBanner} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md">
        ‹
      </button>
      
      {/* Image with slower fade effect */}
      <img 
        className={`w-full h-full object-cover transition-opacity duration-1000 ${fade ? "opacity-100" : "opacity-0"}`} 
        src={banners[currentIndex]} 
        alt="Hero Section" 
      />

      <button onClick={nextBanner} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md">
        ›
      </button>
      
      {/* Dots for navigation */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${currentIndex === index ? "bg-white scale-110" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
}
