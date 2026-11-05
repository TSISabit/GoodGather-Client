'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { EventItem } from '@/types';
import toast from 'react-hot-toast';
import { Calendar, MapPin, Tag, UserCheck, Heart } from 'lucide-react';

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, token } = useAuth();

  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/events/detail/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setEvent(res.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleJoin = async () => {
    if (!user || !token) {
      toast.error('Please login to join this event.');
      router.push('/login');
      return;
    }

    setJoining(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/events/join/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Unable to join event');

      toast.success('Successfully joined the event!');
      router.push('/joined-events');
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return <div className="max-w-4xl mx-auto py-20 text-center text-gray-500">Loading event details...</div>;
  }

  if (!event) {
    return <div className="max-w-4xl mx-auto py-20 text-center text-red-500">Event not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-xl">
        <div className="relative h-72 sm:h-96 w-full">
          <Image src={event.thumbnailUrl} alt={event.title} fill className="object-cover" />
          <span className="absolute top-4 left-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-emerald-600 dark:text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" />
            {event.eventType}
          </span>
        </div>

        <div className="p-8 sm:p-10 space-y-6">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
            {event.title}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-gray-100 dark:border-gray-700 text-sm">
            <div className="flex items-center gap-2.5 text-gray-600 dark:text-gray-300">
              <Calendar className="w-4 h-4 text-emerald-500" />
              <span>Date: <strong>{event.eventDate}</strong></span>
            </div>
            <div className="flex items-center gap-2.5 text-gray-600 dark:text-gray-300">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span>Location: <strong>{event.location}</strong></span>
            </div>
            <div className="flex items-center gap-2.5 text-gray-600 dark:text-gray-300">
              <UserCheck className="w-4 h-4 text-emerald-500" />
              <span>Organizer: <strong>{event.creatorName}</strong></span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">About the Initiative</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={handleJoin}
              disabled={joining}
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition disabled:opacity-50"
            >
              <Heart className="w-4 h-4 fill-current" />
              {joining ? 'Processing...' : 'Join Event'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}