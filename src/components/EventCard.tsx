import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EventItem } from '../types';
import { MapPin, Calendar, Tag } from 'lucide-react';

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition">
      <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-700">
        <Image
          src={event.thumbnailUrl}
          alt={event.title}
          fill
          className="object-cover"
        />
        <span className="absolute top-3 left-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-emerald-600 dark:text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
          <Tag className="w-3 h-3" />
          {event.eventType}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 mb-2">
            {event.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-2">
            <Calendar className="w-3.5 h-3.5 text-emerald-500" />
            <span>{event.eventDate}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-2 truncate">
            <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>

          <Link
            href={`/events/${event._id}`}
            className="mt-4 block w-full text-center py-2.5 px-4 rounded-xl text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 transition"
          >
            View Event
          </Link>
        </div>
      </div>
    </div>
  );
}