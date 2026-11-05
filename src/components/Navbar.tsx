'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { HeartHandshake, LogOut, CalendarPlus, Settings2, CheckCircle2 } from 'lucide-react';

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Good<span className="text-emerald-600 dark:text-emerald-400">Gather</span>
          </span>
        </Link>

        {/* Links & CTA */}
        <div className="flex items-center gap-5">
          <Link
            href="/events"
            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
          >
            Upcoming Events
          </Link>

          <ThemeToggle />

          {!loading && (
            <>
              {user ? (
                <div className="relative">
                  <div
                    className="group relative flex items-center gap-3 cursor-pointer"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <Image
                      src={user.photoURL}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-full ring-2 ring-emerald-500 object-cover"
                    />
                    {/* Tooltip on hover */}
                    <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs py-1 px-2.5 rounded whitespace-nowrap shadow-md pointer-events-none z-50">
                      {user.name}
                    </div>
                  </div>

                  {dropdownOpen && (
                    <div
                      className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Signed in as</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
                      </div>

                      <Link
                        href="/events/create"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-gray-700/50 hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        <CalendarPlus className="w-4 h-4" />
                        Create Event
                      </Link>

                      <Link
                        href="/manage-events"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-gray-700/50 hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        <Settings2 className="w-4 h-4" />
                        Manage Events
                      </Link>

                      <Link
                        href="/joined-events"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-gray-700/50 hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Joined Events
                      </Link>

                      <div className="border-t border-gray-100 dark:border-gray-700 my-1" />

                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition"
                >
                  Login
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}