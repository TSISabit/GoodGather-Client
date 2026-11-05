"use client";

import React, { useEffect, useState, useMemo } from "react";
import { EventItem } from "@/types";
import EventCard from "@/components/EventCard";
import { Filter, ArrowUpDown } from "lucide-react";

const CATEGORIES = [
  "All",
  "Donation",
  "Plantation",
  "Cleanup",
  "Healthcare",
  "Education",
];

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    fetch(`${apiUrl}/api/events`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && Array.isArray(data.data)) {
          setEvents(data.data);
        } else if (Array.isArray(data)) {
          setEvents(data);
        }
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredAndSortedEvents = useMemo(() => {
    return events
      .filter((ev: EventItem) => {
        if (selectedCategory === "All") return true;
        const currentType = ev.eventType || ev.category;
        if (!currentType) return false;
        return (
          currentType.toString().trim().toLowerCase() ===
          selectedCategory.trim().toLowerCase()
        );
      })
      .sort((a, b) => {
        const timeA = new Date(a.eventDate).getTime() || 0;
        const timeB = new Date(b.eventDate).getTime() || 0;
        return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
      });
  }, [events, selectedCategory, sortOrder]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Title & Description */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
          Upcoming Community Events
        </h1>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Discover active relief, cleanliness, and tree plantation campaigns.
          Past events are automatically hidden.
        </p>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-semibold uppercase text-gray-500 mr-2">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Date Sort Control */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <span className="flex items-center gap-1 text-xs font-semibold uppercase text-gray-500">
            <ArrowUpDown className="w-3.5 h-3.5" /> Sort Date:
          </span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="asc">Earliest First</option>
            <option value="desc">Latest First</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="text-center py-20 text-gray-500 font-medium">
          Loading events...
        </div>
      ) : filteredAndSortedEvents.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">
            No events found matching your category criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
