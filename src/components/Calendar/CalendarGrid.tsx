import React from 'react';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  format, 
  isSameMonth, 
  isToday,
  isSameDay,
  isWithinInterval
} from 'date-fns';
import { useCalendar } from '../../context/CalendarContext';
import EventCell from './EventCell';

interface CalendarGridProps {
  currentDate: Date;
  onEventClick: (eventId: string) => void;
  onDateClick: (date: Date) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate, onEventClick, onDateClick }) => {
  const { filteredEvents } = useCalendar();
  
  // Get days for the calendar grid
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  
  // Group days into weeks
  const weeks: Date[][] = [];
  let week: Date[] = [];
  
  days.forEach((day) => {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });
  
  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return filteredEvents.filter(event => {
      // Check if the day is within the event's date range
      return isWithinInterval(day, { 
        start: new Date(event.startDate), 
        end: new Date(event.endDate) 
      });
    });
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Calendar header with weekday names */}
      <div className="grid grid-cols-7 border-b">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div 
            key={index} 
            className="py-2 text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 grid-rows-6 h-[800px]">
        {weeks.flat().map((day, i) => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          
          return (
            <div 
              key={i} 
              className={`border-b border-r min-h-[100px] ${
                !isCurrentMonth ? 'bg-gray-50' : ''
              } ${isToday(day) ? 'bg-blue-50' : ''} cursor-pointer`}
              onClick={() => onDateClick(day)}
            >
              <div className="p-1 sticky top-0 bg-inherit z-10">
                <span className={`text-sm font-medium ${
                  !isCurrentMonth ? 'text-gray-400' : 'text-gray-700'
                } ${isToday(day) ? 'text-blue-600' : ''}`}>
                  {format(day, 'd')}
                </span>
              </div>
              
              <div className="px-1 pb-1 overflow-y-auto max-h-[120px]">
                {dayEvents.map(event => (
                  <EventCell 
                    key={`${event.id}-${format(day, 'yyyy-MM-dd')}`}
                    event={event}
                    isFirstDay={isSameDay(day, new Date(event.startDate))}
                    isLastDay={isSameDay(day, new Date(event.endDate))}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event.id);
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;