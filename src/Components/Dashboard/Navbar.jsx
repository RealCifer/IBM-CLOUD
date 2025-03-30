import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button className="lg:hidden mr-2">
              <Menu className="w-6 h-6" />
            </button>
            <span className="text-xl font-semibold text-pink-600">Admin Dashboard</span>
          </div>
          <div className="flex items-center">
            <div className="hidden lg:flex items-center mr-4 bg-gray-100 rounded-lg px-3 py-2">
              <Search className="w-5 h-5 text-gray-500 mr-2" />
              <input type="text" placeholder="Search..." className="bg-transparent border-none focus:outline-none" />
            </div>
            <button className="p-2 relative">
              <Bell className="w-6 h-6 text-gray-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-pink-600 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;