import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addDays, addWeeks, addMonths, addYears } from 'date-fns';
import { 
  CalendarEvent, 
  Client, 
  Label, 
  SocialMediaPlatform,
  RepeatSettings
} from '../types';
import { platforms as initialPlatforms, clients as initialClients, labels as initialLabels, initialEvents } from '../data/initialData';

interface CalendarContextType {
  events: CalendarEvent[];
  platforms: SocialMediaPlatform[];
  clients: Client[];
  labels: Label[];
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (event: CalendarEvent) => void;
  deleteEvent: (id: string, deleteRepeats: boolean) => void;
  addClient: (name: string) => void;
  deleteClient: (id: string) => void;
  addLabel: (name: string, color: string) => void;
  deleteLabel: (id: string) => void;
  getClientById: (id: string) => Client | undefined;
  getLabelById: (id: string) => Label | undefined;
  getPlatformById: (id: string) => SocialMediaPlatform | undefined;
  filteredEvents: CalendarEvent[];
  filters: {
    platforms: string[];
    clients: string[];
    labels: string[];
  };
  updateFilters: (filterType: 'platforms' | 'clients' | 'labels', values: string[]) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [platforms, setPlatforms] = useState<SocialMediaPlatform[]>(initialPlatforms);
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [labels, setLabels] = useState<Label[]>(initialLabels);
  const [filters, setFilters] = useState({
    platforms: [] as string[],
    clients: [] as string[],
    labels: [] as string[]
  });

  // Generate repeated events based on repeat settings
  const generateRepeatedEvents = (event: CalendarEvent): CalendarEvent[] => {
    if (!event.repeat) return [event];
    
    const { frequency, intervalType, count } = event.repeat;
    const repeatedEvents: CalendarEvent[] = [event];
    
    for (let i = 1; i <= count; i++) {
      let newStartDate: Date;
      let newEndDate: Date;
      
      // Calculate new dates based on interval type
      switch (intervalType) {
        case 'day':
          newStartDate = addDays(event.startDate, i * frequency);
          newEndDate = addDays(event.endDate, i * frequency);
          break;
        case 'week':
          newStartDate = addWeeks(event.startDate, i * frequency);
          newEndDate = addWeeks(event.endDate, i * frequency);
          break;
        case 'month':
          newStartDate = addMonths(event.startDate, i * frequency);
          newEndDate = addMonths(event.endDate, i * frequency);
          break;
        case 'year':
          newStartDate = addYears(event.startDate, i * frequency);
          newEndDate = addYears(event.endDate, i * frequency);
          break;
      }
      
      repeatedEvents.push({
        ...event,
        id: uuidv4(),
        startDate: newStartDate,
        endDate: newEndDate,
        parentEventId: event.id
      });
    }
    
    return repeatedEvents;
  };

  const addEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: uuidv4()
    };
    
    if (newEvent.repeat) {
      const repeatedEvents = generateRepeatedEvents(newEvent);
      setEvents(prev => [...prev, ...repeatedEvents]);
    } else {
      setEvents(prev => [...prev, newEvent]);
    }
  };

  const updateEvent = (updatedEvent: CalendarEvent) => {
    // If this is a repeated event, handle updates for all instances
    if (updatedEvent.repeat || updatedEvent.parentEventId) {
      // If updating a child event, find the parent
      const parentId = updatedEvent.parentEventId || updatedEvent.id;
      
      // Remove all related events (parent and children)
      const filteredEvents = events.filter(e => 
        e.id !== parentId && e.parentEventId !== parentId
      );
      
      // Generate new repeated events if needed
      if (updatedEvent.repeat) {
        const repeatedEvents = generateRepeatedEvents(updatedEvent);
        setEvents([...filteredEvents, ...repeatedEvents]);
      } else {
        // Just add the single updated event if repeat was removed
        setEvents([...filteredEvents, updatedEvent]);
      }
    } else {
      // For non-repeated events, simple update
      setEvents(prev => 
        prev.map(event => event.id === updatedEvent.id ? updatedEvent : event)
      );
    }
  };

  const deleteEvent = (id: string, deleteRepeats: boolean) => {
    if (deleteRepeats) {
      // Find the event to check if it's part of a repeat series
      const eventToDelete = events.find(e => e.id === id);
      
      if (eventToDelete) {
        if (eventToDelete.parentEventId) {
          // This is a child event, delete all related to the parent
          setEvents(prev => prev.filter(e => 
            e.id !== eventToDelete.parentEventId && e.parentEventId !== eventToDelete.parentEventId
          ));
        } else {
          // This is a parent event, delete all children
          setEvents(prev => prev.filter(e => 
            e.id !== id && e.parentEventId !== id
          ));
        }
      }
    } else {
      // Just delete the single event
      setEvents(prev => prev.filter(event => event.id !== id));
    }
  };

  const addClient = (name: string) => {
    const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    const newClient: Client = {
      id: uuidv4(),
      name,
      color: randomColor
    };
    setClients(prev => [...prev, newClient]);
  };

  const deleteClient = (id: string) => {
    setClients(prev => prev.filter(client => client.id !== id));
    // Also remove events associated with this client
    setEvents(prev => prev.filter(event => event.clientId !== id));
  };

  const addLabel = (name: string, color: string) => {
    const newLabel: Label = {
      id: uuidv4(),
      name,
      color
    };
    setLabels(prev => [...prev, newLabel]);
  };

  const deleteLabel = (id: string) => {
    setLabels(prev => prev.filter(label => label.id !== id));
    // Remove this label from all events
    setEvents(prev => 
      prev.map(event => ({
        ...event,
        labels: event.labels.filter(labelId => labelId !== id)
      }))
    );
  };

  const getClientById = (id: string) => {
    return clients.find(client => client.id === id);
  };

  const getLabelById = (id: string) => {
    return labels.find(label => label.id === id);
  };

  const getPlatformById = (id: string) => {
    return platforms.find(platform => platform.id === id);
  };

  // Apply filters to events
  const filteredEvents = events.filter(event => {
    // If no filters are set, show all events
    if (
      filters.platforms.length === 0 &&
      filters.clients.length === 0 &&
      filters.labels.length === 0
    ) {
      return true;
    }

    // Check if event matches platform filter
    const matchesPlatform = filters.platforms.length === 0 || 
      event.platforms.some(platformId => filters.platforms.includes(platformId));

    // Check if event matches client filter
    const matchesClient = filters.clients.length === 0 || 
      filters.clients.includes(event.clientId);

    // Check if event matches label filter
    const matchesLabel = filters.labels.length === 0 || 
      event.labels.some(labelId => filters.labels.includes(labelId));

    return matchesPlatform && matchesClient && matchesLabel;
  });

  const updateFilters = (filterType: 'platforms' | 'clients' | 'labels', values: string[]) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: values
    }));
  };

  return (
    <CalendarContext.Provider
      value={{
        events,
        platforms,
        clients,
        labels,
        addEvent,
        updateEvent,
        deleteEvent,
        addClient,
        deleteClient,
        addLabel,
        deleteLabel,
        getClientById,
        getLabelById,
        getPlatformById,
        filteredEvents,
        filters,
        updateFilters
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};