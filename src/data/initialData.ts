import { addDays } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { CalendarEvent, Client, Label, SocialMediaPlatform } from "../types";

export const platforms: SocialMediaPlatform[] = [
  { id: uuidv4(), name: "Facebook", icon: "facebook" },
  { id: uuidv4(), name: "Instagram", icon: "instagram" },
  { id: uuidv4(), name: "LinkedIn", icon: "linkedin" },
  { id: uuidv4(), name: "Twitter", icon: "twitter" },
  { id: uuidv4(), name: "TikTok", icon: "video" },
  { id: uuidv4(), name: "YouTube", icon: "youtube" },
  { id: uuidv4(), name: "Pinterest", icon: "pin" },
];

export const clients: Client[] = [
  { id: uuidv4(), name: "Tech Solutions Inc.", color: "#3B82F6" },
  { id: uuidv4(), name: "Green Earth Organics", color: "#10B981" },
  { id: uuidv4(), name: "Urban Fitness", color: "#F59E0B" },
  { id: uuidv4(), name: "Luxury Living", color: "#8B5CF6" },
];

export const labels: Label[] = [
  { id: uuidv4(), name: "Urgent", color: "#EF4444" },
  { id: uuidv4(), name: "Review", color: "#F59E0B" },
  { id: uuidv4(), name: "Approved", color: "#10B981" },
  { id: uuidv4(), name: "Draft", color: "#6B7280" },
];

const today = new Date();

export const initialEvents: CalendarEvent[] = [
  {
    id: uuidv4(),
    title: "Product Launch Post",
    description: "Announce the new product line with promotional images",
    startDate: addDays(today, 1),
    endDate: addDays(today, 1),
    platforms: [platforms[0].id, platforms[1].id],
    clientId: clients[0].id,
    labels: [labels[2].id],
    images: [
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
    ],
    repeat: null,
  },
  {
    id: uuidv4(),
    title: "Weekly Wellness Tips",
    description: "Share health and wellness tips for our audience",
    startDate: addDays(today, 2),
    endDate: addDays(today, 2),
    platforms: [platforms[1].id, platforms[2].id],
    clientId: clients[2].id,
    labels: [labels[3].id],
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    ],
    repeat: {
      frequency: 1,
      intervalType: "week",
      count: 4,
    },
  },
  {
    id: uuidv4(),
    title: "Holiday Campaign",
    description: "Special holiday promotion across all platforms",
    startDate: addDays(today, 3),
    endDate: addDays(today, 5),
    platforms: [
      platforms[0].id,
      platforms[1].id,
      platforms[2].id,
      platforms[3].id,
    ],
    clientId: clients[3].id,
    labels: [labels[0].id, labels[2].id],
    images: [
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80",
    ],
    repeat: null,
  },
];
