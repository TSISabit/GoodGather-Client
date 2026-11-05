import React from 'react';
import Link from 'next/link';
import { HeartHandshake, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">GoodGather</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering grassroots communities across Bangladesh to organize, fund, and mobilize social welfare and humanitarian initiatives.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-emerald-400 transition">Home</Link></li>
              <li><Link href="/events" className="hover:text-emerald-400 transition">Upcoming Events</Link></li>
              <li><Link href="/events/create" className="hover:text-emerald-400 transition">Host an Event</Link></li>
              <li><Link href="/login" className="hover:text-emerald-400 transition">Volunteer Portal</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2.5"><MapPin className="w-4 h-4 text-emerald-400 shrink-0" /> Mirpur 2, Dhaka 1216, Bangladesh</li>
              <li className="flex items-center gap-2.5"><Phone className="w-4 h-4 text-emerald-400 shrink-0" /> +880 1700-000000</li>
              <li className="flex items-center gap-2.5"><Mail className="w-4 h-4 text-emerald-400 shrink-0" /> contact@goodgather.org</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Follow Social Work</h4>
            <p className="text-sm text-gray-400 mb-4">Stay updated with volunteer photos and stories.</p>
            <div className="flex items-center gap-3">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (formerly Twitter)"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-emerald-600 flex items-center justify-center text-white transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 GoodGather Inc. All rights reserved.</p>
          <p>Designed with care for grassroots community impact.</p>
        </div>
      </div>
    </footer>
  );
}