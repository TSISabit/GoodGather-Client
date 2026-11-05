export interface User {
  id: string;
  name: string;
  email: string;
  photoURL: string;
}

export interface EventItem {
  _id: string;
  title: string;
  description: string;
  eventDate: string;
  location: string;
  eventType?: 'Cleanup' | 'Plantation' | 'Donation' | 'Healthcare' | 'Education' | 'Other' | string;
  category?: string;
  thumbnailUrl: string;
  creatorId?: string;
  creatorEmail?: string;
  creatorName?: string;
  joinedUsers?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface JoinedEventItem {
  _id: string;
  eventId: string;
  userEmail: string;
  userName: string;
  joinedAt: string;
  eventDetails: EventItem;
}