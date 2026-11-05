# GoodGather – Grassroots Social Development & Event Mobilization Platform

GoodGather is a modern, responsive single-page web platform designed for communities across Bangladesh to organize, discover, and join social service activities (e.g., winter blanket distribution, urban cleanups, tree plantation drives).

- **Live URL**: [https://goodgather.vercel.app](https://goodgather.vercel.app)
- **Server API**: [https://goodgather-server.onrender.com](https://goodgather-server.onrender.com)

## Key Features
- **Strict Future-Date Event Creation**: Prevents backdated events; organizers can create campaigns with custom locations and categories.
- **Dynamic Past Event Filtering**: Automatically filters out passed dates on the server and client, ensuring only actionable drives are listed.
- **Unified Authentication & Google Sign-In**: Integrated password criteria checker (uppercase, lowercase, 6+ length) along with Google OAuth login.
- **Theme Customization**: Full dark/light mode toggle that synchronizes with user preference and browser storage.
- **Protected Action Dashboard**: Dedicated routes for managing personal events (update/delete) and inspecting joined events chronologically.

## Tech Stack
- **Framework**: Next.js 15 (App Router), React
- **Language**: TypeScript 
- **Styling**: Tailwind CSS, Lucide Icons
- **Auth & State**: JWT, Context API, Google OAuth, react-hot-toast