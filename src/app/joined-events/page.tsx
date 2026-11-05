'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { JoinedEventItem } from '@/types';
import EventCard from '@/components/EventCard';

export default function JoinedEventsPage() {
  const router = useRouter();
  const { user, token, loading: authLoading } = useAuth();
  const [joined, setJoined] = useState<JoinedEventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/events/my-joined`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) setJoined(res.data);
        })
        .finally(() => setLoading(false));
    }
  }, [user, token, authLoading, router]);

  if (loading || authLoading) {
    return <div className="max-w-7xl mx-auto py-16 text-center text-gray-500">Loading your enrolled drives...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">My Enrolled Events</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Social service drives you have committed to join (sorted chronologically)</p>

      {joined.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 text-gray-500">
          You haven&apos;t joined any events yet. Explore upcoming drives and participate!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {joined.map((item) => (
            <EventCard key={item._id} event={item.eventDetails} />
          ))}
        </div>
      )}
    </div>
  );
}