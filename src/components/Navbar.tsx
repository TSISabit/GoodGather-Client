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
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Good<span className="text-emerald-600 dark:text-emerald-400">Gather</span>
          </span>
        </Link>

        {/* Links & CTA */}
        <div className="flex items-center gap-5">
          <Link
            href="/events"
            className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
          >
            Upcoming Events
          </Link>

          <ThemeToggle />

          {!loading && (
            <>
              {user ? (
                <div className="relative">
                  {/* Profile Avatar Button */}
                  <button
                    type="button"
                    aria-label="User menu"
                    className="group relative flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {user.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt={user.name || 'User Profile'}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full ring-2 ring-emerald-500 object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center ring-2 ring-emerald-500 shadow-sm text-sm">
                        {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}

                    {/* Tooltip on hover */}
                    <span className="absolute top-12 left-1/2 -translate-x-1/2 hidden group-hover:inline-block bg-slate-900 text-slate-50 text-xs font-medium py-1 px-2.5 rounded-md whitespace-nowrap shadow-xl pointer-events-none z-50">
                      {user.name || user.email}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <>
                      {/* Backdrop to close dropdown on outside click */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setDropdownOpen(false)}
                      />

                      <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 py-2 z-50">
                        <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-700">
                          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Signed in as</p>
                          <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                            {user.name || user.email}
                          </p>
                        </div>

                        <Link
                          href="/events/create"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-gray-700/60 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                        >
                          <CalendarPlus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          Create Event
                        </Link>

                        <Link
                          href="/manage-events"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-gray-700/60 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                        >
                          <Settings2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          Manage Events
                        </Link>

                        <Link
                          href="/joined-events"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-gray-700/60 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          Joined Events
                        </Link>

                        <div className="border-t border-gray-100 dark:border-gray-700 my-1" />

                        <button
                          type="button"
                          onClick={() => {
                            setDropdownOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition active:scale-95"
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