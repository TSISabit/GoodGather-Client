import React from 'react';
import EventCard from '@/components/EventCard';
import { EventItem } from '@/types';

async function getUpcomingEvents(): Promise<EventItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/events/upcoming`, {
      cache: 'no-store',
    });
    const json = await res.json();
    return json.success ? json.data : [];
  } catch {
    return [];
  }
}

export default async function EventsListPage() {
  const events = await getUpcomingEvents();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Upcoming Community Events</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Discover active relief, cleanliness, and tree plantation campaigns. Past events are automatically hidden.
        </p>
      </div>

      {events.length === 0 ? (
        <div className="p-16 text-center bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 text-gray-500">
          No upcoming events at this moment. Check back soon or create your own campaign!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((evt) => (
            <EventCard key={evt._id} event={evt} />
          ))}
        </div>
      )}
    </div>
  );
}