import React from 'react';
import { format } from 'date-fns';
import { useCalendar } from '../../context/CalendarContext';
import { CalendarEvent } from '../../types';
import { Facebook, Instagram, Linkedin, Twitter, Video, Youtube, Pin } from 'lucide-react';

interface EventCellProps {
  event: CalendarEvent;
  isFirstDay: boolean;
  isLastDay: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const EventCell: React.FC<EventCellProps> = ({ 
  event, 
  isFirstDay,
  isLastDay,
  onClick 
}) => {
  const { getClientById, getPlatformById } = useCalendar();
  const client = getClientById(event.clientId);
  
  // Get platform icons
  const renderPlatformIcon = (platformId: string) => {
    const platform = getPlatformById(platformId);
    if (!platform) return null;
    
    const iconProps = { className: "w-3 h-3 text-white" };
    
    switch (platform.icon) {
      case 'facebook':
        return <Facebook {...iconProps} />;
      case 'instagram':
        return <Instagram {...iconProps} />;
      case 'linkedin':
        return <Linkedin {...iconProps} />;
      case 'twitter':
        return <Twitter {...iconProps} />;
      case 'video':
        return <Video {...iconProps} />;
      case 'youtube':
        return <Youtube {...iconProps} />;
      case 'pin':
        return <Pin {...iconProps} />;
      default:
        return null;
    }
  };

  // Style based on client color
  const cellStyle = {
    backgroundColor: client?.color || '#6B7280',
    borderRadius: isFirstDay && isLastDay ? '4px' : 
                  isFirstDay ? '4px 0 0 4px' : 
                  isLastDay ? '0 4px 4px 0' : '0',
    marginLeft: !isFirstDay ? '-1px' : '0',
    marginRight: !isLastDay ? '-1px' : '0',
    zIndex: isFirstDay || isLastDay ? 10 : 5,
    position: 'relative' as const
  };

  return (
    <div 
      className="text-white text-xs mb-1 cursor-pointer hover:opacity-90 transition-opacity"
      style={cellStyle}
      onClick={onClick}
    >
      <div className="p-1 truncate">
        {/* Platform icons */}
        <div className="flex space-x-1 mb-0.5">
          {event.platforms.slice(0, 3).map(platformId => (
            <span key={platformId}>
              {renderPlatformIcon(platformId)}
            </span>
          ))}
          {event.platforms.length > 3 && (
            <span className="text-xs">+{event.platforms.length - 3}</span>
          )}
        </div>
        
        {/* Event title */}
        <div className="font-medium truncate">{event.title}</div>
        
        {/* Only show time on the first day */}
        {isFirstDay && (
          <div className="text-xs opacity-90">
            {format(new Date(event.startDate), 'h:mm a')}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCell;