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
  eventType: 'Cleanup' | 'Plantation' | 'Donation' | 'Healthcare' | 'Education' | 'Other';
  thumbnailUrl: string;
  location: string;
  eventDate: string;
  creatorEmail: string;
  creatorName: string;
  createdAt: string;
}

export interface JoinedEventItem {
  _id: string;
  eventId: string;
  userEmail: string;
  userName: string;
  joinedAt: string;
  eventDetails: EventItem;
}