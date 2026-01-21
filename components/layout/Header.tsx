'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, User } from 'lucide-react';

interface UserData {
  firstName: string;
  lastName: string;
}

export const Header = () => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    }
  }, []);

  const userName = user ? `${user.firstName} ${user.lastName}` : 'Researcher';

  return (
    <header className="bg-white border-b border-gray-200/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="px-8 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Dashboard
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">Welcome back, {userName}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="relative p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:text-gray-900 hover:scale-105">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
            <Link 
              href="/dashboard/settings"
              className="flex items-center gap-2.5 px-4 py-2.5 bg-white hover:bg-gray-50 rounded-xl transition-all duration-200 border border-gray-200 shadow-sm hover:shadow-md"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-700">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

