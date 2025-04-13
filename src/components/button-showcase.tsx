"use client";

import Link from "next/link";

const ButtonShowcase = () => {
  return (
    <div className="flex flex-col items-center space-y-16 py-12">
      <h2 className="text-3xl font-bold mb-8">Button Design Options</h2>
      
      {/* Option 1: Animated Gradient Button with 3D Effect */}
      <div className="w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Option 1: Animated Gradient Button with 3D Effect</h3>
        <div className="relative group">
          {/* Animated background glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
          
          {/* 3D button with hover effects */}
          <Link href="/practical-info" className="relative px-8 py-4 bg-white dark:bg-gray-900 rounded-xl leading-none flex items-center divide-x divide-gray-600 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl active:scale-95">
            <span className="pr-6 text-gray-900 dark:text-gray-100 text-lg font-bold">View Program</span>
            <span className="pl-6 text-indigo-400 group-hover:text-indigo-500 transition duration-200 flex items-center">
              <span className="pr-2">Explore</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform group-hover:translate-x-1">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
          </Link>
        </div>
      </div>
      
      {/* Option 2: Playful LEGO-Inspired Button */}
      <div className="w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Option 2: Playful LEGO-Inspired Button</h3>
        <div className="relative group">
          {/* LEGO-style button with 3D effect */}
          <Link href="/practical-info" className="relative inline-block px-10 py-5 bg-yellow-400 rounded-lg text-xl font-bold text-gray-800 transform transition-all duration-300 ease-in-out hover:shadow-[0_8px_0_0_rgba(0,0,0,0.2)] active:shadow-[0_0px_0_0_rgba(0,0,0,0.2)] active:translate-y-2">
            <div className="absolute -top-2 -left-2 -right-2 h-2 bg-yellow-500 rounded-t-lg"></div>
            <div className="absolute -bottom-2 -left-2 -right-2 h-2 bg-yellow-300 rounded-b-lg"></div>
            <div className="absolute -left-2 -top-2 -bottom-2 w-2 bg-yellow-500 rounded-l-lg"></div>
            <div className="absolute -right-2 -top-2 -bottom-2 w-2 bg-yellow-300 rounded-r-lg"></div>
            
            <div className="flex items-center space-x-2">
              <span>View Program</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 animate-bounce-subtle">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
            
            {/* LEGO studs on top */}
            <div className="absolute -top-5 left-1/4 w-4 h-4 bg-yellow-500 rounded-full"></div>
            <div className="absolute -top-5 left-2/4 w-4 h-4 bg-yellow-500 rounded-full"></div>
            <div className="absolute -top-5 left-3/4 w-4 h-4 bg-yellow-500 rounded-full"></div>
          </Link>
        </div>
      </div>
      
      {/* Option 3: Modern Glassmorphism Button */}
      <div className="w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Option 3: Modern Glassmorphism Button</h3>
        <div className="relative group">
          {/* Animated spotlight effect */}
          <div className="absolute -inset-px bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500 group-hover:duration-200"></div>
          
          {/* Glassmorphism button */}
          <Link href="/practical-info" className="relative inline-flex px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white shadow-xl transition-all duration-300 hover:bg-white/20 hover:shadow-white/20 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-primary/10 rounded-xl"></div>
            <div className="relative flex items-center space-x-4">
              <span className="text-xl font-medium">View Program</span>
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/20 group-hover:bg-white/30 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Option 4: Interactive Pulse Button with Micro-interactions */}
      <div className="w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Option 4: Interactive Pulse Button with Micro-interactions</h3>
        <div className="relative group">
          {/* Pulsing background */}
          <div className="absolute -inset-0.5 bg-primary rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300 group-hover:duration-200 animate-pulse-slow"></div>
          
          {/* Main button */}
          <Link href="/practical-info" className="relative inline-flex items-center space-x-2 px-8 py-4 bg-gray-900 rounded-xl leading-none divide-x divide-gray-600 transition-all duration-300 ease-in-out hover:scale-105">
            <span className="text-white text-lg font-medium pr-4">View Program</span>
            
            {/* Interactive icon container */}
            <div className="pl-4 group-hover:pl-6 transition-all duration-300">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/40 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-primary group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ButtonShowcase;
