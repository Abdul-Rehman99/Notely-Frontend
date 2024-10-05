import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { FaSearch } from 'react-icons/fa'
import { SunMoon,MoonStar } from 'lucide-react';
import AddButton from './AddButton';
// import Popup from './Popup';


const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className={`w-full p-4 shadow-sm flex justify-between items-center ${darkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
      {/* Search Bar */}
      <div className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-800 rounded-md px-3 py-2 w-1/2 md:w-1/3">
        <FaSearch className="text-gray-600 dark:text-gray-300" />
        <input
          type="text" 
          placeholder="Search..." 
          className="bg-transparent focus:outline-none w-full text-gray-700 dark:text-gray-200" 
        />
      </div>

      {/* Buttons and Toggle */}
      <div className="flex items-center space-x-4">
        {/* <Popup /> */}
        <AddButton />
        <Button>Signup</Button>
        <button
          onClick={toggleDarkMode} 
          className="p-2 rounded-full focus:outline-none bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? <SunMoon /> : <MoonStar />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
