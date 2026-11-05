import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import EventCard from '@/components/EventCard';
import { EventItem } from '@/types';
import { Sparkles, Calendar, Users, HeartHandshake, ShieldCheck, ArrowRight, TreePine } from 'lucide-react';

async function getRecentEvents(): Promise<EventItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/events/recent`, {
      cache: 'no-store',
    });
    const json = await res.json();
    return json.success ? json.data : [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const recentEvents = await getRecentEvents();

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Banner Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-emerald-50/70 to-transparent dark:from-emerald-950/20 dark:to-transparent pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Join Hands to Drive Grassroots Community Progress
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white max-w-4xl mx-auto leading-tight">
            Connecting Kind Hearts with Real Impact in Every Neighborhood
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            GoodGather makes creating, discovering, and volunteering for local social events straightforward and transparent.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              href="/events"
              className="px-6 py-3.5 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition flex items-center gap-2"
            >
              Explore Upcoming Events
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/events/create"
              className="px-6 py-3.5 rounded-xl font-semibold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition"
            >
              Create Event
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Impact Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 shadow-sm text-center">
          <div>
            <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">1,500+</p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">Active Volunteers</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">240+</p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">Events Completed</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">25,000+</p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">Lives Impacted</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">100%</p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">Community Driven</p>
          </div>
        </div>
      </section>

      {/* 3. Platform Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Mobilize with GoodGather?</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Built from the ground up to assist neighborhood leaders and empathetic citizens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Seamless Event Creation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Launch winter clothes, food, or cleanup drives in less than two minutes with strict future date validation.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Instant Volunteer Enrollment</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Join active campaigns with one click and track everything neatly in your personalized Joined Events dashboard.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Full Event Ownership</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Organizers hold total control to update logistics or withdraw events safely via JWT-protected routes.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Recent Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Upcoming Community Events</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Top 6 upcoming drives nearest on the calendar.
            </p>
          </div>
          <Link
            href="/events"
            className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            See All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentEvents.length === 0 ? (
          <div className="p-12 text-center bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-500">
            No upcoming events found. Be the first to create one!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentEvents.map((evt) => (
              <EventCard key={evt._id} event={evt} />
            ))}
          </div>
        )}
      </section>

      {/* 5. Past Events Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Impact Gallery</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Glimpses of selfless volunteers working together in past campaigns.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[
            'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=600&q=80',
          ].map((url, index) => (
            <div key={index} className="relative h-48 rounded-xl overflow-hidden shadow-sm">
              <Image src={url} alt={`Impact ${index + 1}`} fill className="object-cover hover:scale-105 transition duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* 6. Newsletter Subscription */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-600 rounded-3xl p-10 sm:p-14 text-center text-white space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Stay Updated on Social Drives</h2>
          <p className="text-emerald-100 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Subscribe to our weekly dispatch to receive notifications whenever a distribution or cleanup drive is initiated in your area.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none"
            />
            <button
              type="button"
              className="px-6 py-3 rounded-xl bg-gray-900 hover:bg-black text-white text-sm font-semibold transition"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}