import React from 'react';
import { CheckCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-2 rounded-lg shadow-sm">
            <CheckCircle size={20} />
          </div>
          <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
            Student Task Tracker
          </h1>
        </div>
        <div className="text-sm text-gray-500 font-medium">
          Manage your studies & internships
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
