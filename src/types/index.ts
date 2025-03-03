export interface SocialMediaPlatform {
  id: string;
  name: string;
  icon: string;
}

export interface Client {
  id: string;
  name: string;
  color: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface RepeatSettings {
  frequency: number;
  intervalType: 'day' | 'week' | 'month' | 'year';
  count: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  platforms: string[];
  clientId: string;
  labels: string[];
  images: string[];
  repeat: RepeatSettings | null;
  parentEventId?: string;
}