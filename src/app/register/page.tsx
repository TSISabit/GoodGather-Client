'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { HeartHandshake, User, Mail, Image as ImageIcon, Lock, Eye, EyeOff, Check, X, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Live Password validations
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasLength = password.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasUpper || !hasLower || !hasLength) {
      toast.error('Password requirements not met.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, photoURL }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      login(data.token, data.user);
      toast.success('Account created successfully!');
      router.push('/events');
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 sm:p-10">
        {/* Header Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
            <HeartHandshake className="w-8 h-8" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Create Account</h2>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-1 mb-8">
          Join the community and start driving social change
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tanvir Ahmed"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Profile Photo URL */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Profile Photo URL</label>
            <div className="relative">
              <ImageIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Optional: Leave empty for default avatar</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Validation checklist */}
            <div className="mt-3 space-y-1 text-xs">
              <div className={`flex items-center gap-1.5 ${hasUpper ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
                {hasUpper ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                <span>At least one uppercase letter (A-Z)</span>
              </div>
              <div className={`flex items-center gap-1.5 ${hasLower ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
                {hasLower ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                <span>At least one lowercase letter (a-z)</span>
              </div>
              <div className={`flex items-center gap-1.5 ${hasLength ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
                {hasLength ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                <span>Minimum 6 characters length</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition disabled:opacity-50"
          >
            {submitting ? 'Registering...' : 'Register'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}