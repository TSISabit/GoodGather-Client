import React from "react";
import Link from "next/link";
import Image from "next/image";
import { EventItem } from "@/types";
import EventCard from "@/components/EventCard";
import { ArrowRight, ShieldCheck, Users, CalendarHeart } from "lucide-react";

export const dynamic = "force-dynamic";

async function getRecentEvents(): Promise<EventItem[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/events/recent`,
      {
        cache: "no-store",
      },
    );
    const json = await res.json();
    return json.success ? json.data : [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const recentEvents = await getRecentEvents();

  return (
    <div className="flex flex-col gap-16 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-8 sm:p-14 text-center max-w-6xl mx-auto w-full shadow-sm">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 rounded-full mb-4">
          Empowering Communities Together
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Connecting Kind Hearts with <br />
          <span className="text-emerald-600 dark:text-emerald-400">
            Real Impact in Every Neighborhood
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-700 dark:text-slate-300 mb-8 font-medium">
          GoodGather makes organizing, discovering, and joining local social
          drives straightforward, transparent, and engaging.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all shadow-md"
          >
            Explore Upcoming Events <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/events/create"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold transition-all shadow-sm"
          >
            Create Event
          </Link>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="max-w-6xl mx-auto w-full px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div>
            <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              1,500+
            </p>
            <p className="text-xs uppercase tracking-wide text-slate-600 dark:text-slate-400 font-bold mt-1">
              Volunteers
            </p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              240+
            </p>
            <p className="text-xs uppercase tracking-wide text-slate-600 dark:text-slate-400 font-bold mt-1">
              Events Done
            </p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              25,000+
            </p>
            <p className="text-xs uppercase tracking-wide text-slate-600 dark:text-slate-400 font-bold mt-1">
              Lives Impacted
            </p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              100%
            </p>
            <p className="text-xs uppercase tracking-wide text-slate-600 dark:text-slate-400 font-bold mt-1">
              Community Driven
            </p>
          </div>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="max-w-6xl mx-auto w-full px-4 text-center">
        <h2 className="section-title text-2xl sm:text-3xl font-extrabold mb-2">
          Why Mobilize with GoodGather?
        </h2>
        <p className="section-subtitle text-sm font-medium mb-8 max-w-xl mx-auto">
          Tailored tools to help neighborhood leaders and active citizens
          coordinate relief and social work.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-4">
              <CalendarHeart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Seamless Event Creation
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Launch winter clothes, food, or cleanup drives in two minutes with
              strict future date validation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Instant Volunteer Enrollment
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Join active campaigns with one click and track everything neatly
              in your personalized Joined Events dashboard.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Full Event Ownership
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Organizers hold total control to update logistics or withdraw
              events safely via JWT-protected routes.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="max-w-6xl mx-auto w-full px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div>
            <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              1,500+
            </p>
            <p className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400 font-medium mt-1">
              Volunteers
            </p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              240+
            </p>
            <p className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400 font-medium mt-1">
              Events Done
            </p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              25,000+
            </p>
            <p className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400 font-medium mt-1">
              Lives Impacted
            </p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              100%
            </p>
            <p className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400 font-medium mt-1">
              Community Driven
            </p>
          </div>
        </div>
      </section>

      {/* Value Pillars
      <section className="max-w-6xl mx-auto w-full px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Why Mobilize with GoodGather?
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
          Tailored tools to help neighborhood leaders and active citizens
          coordinate relief and social work.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-4">
              <CalendarHeart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              Seamless Event Creation
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Launch winter clothes, food, or cleanup drives in two minutes with
              strict future date validation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              Instant Volunteer Enrollment
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Join active campaigns with one click and track everything neatly
              in your personalized Joined Events dashboard.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              Full Event Ownership
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Organizers hold total control to update logistics or withdraw
              events safely via JWT-protected routes.
            </p>
          </div>
        </div>
      </section> */}

      {/* Recent Upcoming Events */}
      <section className="max-w-6xl mx-auto w-full px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <h2 className="section-title text-2xl sm:text-3xl font-extrabold">
              Upcoming Community Events
            </h2>
            <p className="section-subtitle text-sm mt-1 font-medium">
              Top 6 upcoming drives nearest on the calendar.
            </p>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            See All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentEvents.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500">
              No upcoming events scheduled right now. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* Impact Gallery */}
      <section className="max-w-6xl mx-auto w-full px-4 text-center">
        <h2 className="section-title text-2xl sm:text-3xl font-extrabold mb-2">
          Impact Gallery
        </h2>
        <p className="section-subtitle text-sm font-medium mb-8">
          Glimpses of selfless volunteers working together in past campaigns.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="relative h-44 rounded-xl overflow-hidden shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80"
              alt="Volunteers sorting donation goods"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative h-44 rounded-xl overflow-hidden shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"
              alt="Hands holding tree sapling"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative h-44 rounded-xl overflow-hidden shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80"
              alt="Smiles at underprivileged street children school"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative h-44 rounded-xl overflow-hidden shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=600&q=80"
              alt="Youth picking beach plastic waste"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-4xl mx-auto w-full px-4">
        <div className="bg-emerald-600 text-white rounded-3xl p-8 sm:p-12 text-center shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Stay Updated on Social Drives
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base max-w-lg mx-auto mb-6">
            Subscribe to our weekly dispatch to receive notifications whenever a
            distribution or cleanup drive is initiated in your area.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              required
            />
            <button
              type="button"
              className="px-6 py-3 rounded-xl bg-gray-900 hover:bg-black text-white font-semibold transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
