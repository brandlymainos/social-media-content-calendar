import React from 'react';
import { Dialog } from '@headlessui/react';
import { X, Trash2, Edit, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { useCalendar } from '../../context/CalendarContext';
import { CalendarEvent } from '../../types';
import EventForm from '../EventForm/EventForm';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string | null;
  mode: 'view' | 'edit' | 'create';
  setMode: (mode: 'view' | 'edit' | 'create') => void;
  selectedDate?: Date | null;
}

const EventModal: React.FC<EventModalProps> = ({ 
  isOpen, 
  onClose, 
  eventId, 
  mode,
  setMode,
  selectedDate
}) => {
  const { 
    events, 
    updateEvent, 
    deleteEvent, 
    addEvent,
    getClientById,
    getLabelById,
    getPlatformById
  } = useCalendar();
  
  // Find the event by ID
  const event = eventId ? events.find(e => e.id === eventId) : null;
  
  if (!isOpen) return null;
  
  const handleDelete = () => {
    if (event) {
      // Ask if user wants to delete all repeated events
      const deleteRepeats = event.repeat || event.parentEventId ? 
        window.confirm('Delete all repeated instances of this event?') : 
        false;
      
      deleteEvent(event.id, deleteRepeats);
      onClose();
    }
  };
  
  const handleUpdate = (updatedEventData: Omit<CalendarEvent, 'id'>) => {
    if (event) {
      updateEvent({
        ...updatedEventData,
        id: event.id
      });
      setMode('view');
    }
  };
  
  const handleCreate = (newEventData: Omit<CalendarEvent, 'id'>) => {
    addEvent(newEventData);
    onClose();
  };
  
  // Render platform names
  const renderPlatforms = () => {
    if (!event) return null;
    
    return (
      <div className="flex flex-wrap gap-1">
        {event.platforms.map(platformId => {
          const platform = getPlatformById(platformId);
          return platform ? (
            <span 
              key={platformId}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
            >
              {platform.name}
            </span>
          ) : null;
        })}
      </div>
    );
  };
  
  // Render labels
  const renderLabels = () => {
    if (!event) return null;
    
    return (
      <div className="flex flex-wrap gap-1">
        {event.labels.map(labelId => {
          const label = getLabelById(labelId);
          return label ? (
            <span 
              key={labelId}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
              style={{ 
                backgroundColor: `${label.color}33`,
                color: label.color
              }}
            >
              {label.name}
            </span>
          ) : null;
        })}
      </div>
    );
  };
  
  // Render client
  const renderClient = () => {
    if (!event) return null;
    
    const client = getClientById(event.clientId);
    if (!client) return null;
    
    return (
      <span 
        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
        style={{ 
          backgroundColor: `${client.color}33`,
          color: client.color
        }}
      >
        {client.name}
      </span>
    );
  };
  
  // Render repeat info
  const renderRepeatInfo = () => {
    if (!event || (!event.repeat && !event.parentEventId)) return null;
    
    // If this is a child event
    if (event.parentEventId) {
      return (
        <div className="text-sm text-gray-500">
          <Calendar className="inline-block w-4 h-4 mr-1" />
          Part of a recurring event series
        </div>
      );
    }
    
    // If this is a parent event
    if (event.repeat) {
      const { frequency, intervalType, count } = event.repeat;
      return (
        <div className="text-sm text-gray-500">
          <Calendar className="inline-block w-4 h-4 mr-1" />
          Repeats every {frequency} {intervalType}(s), {count} times
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setMode('view');
        onClose();
      }}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        
        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>
        
        <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          {/* Header */}
          <div className="flex justify-between items-start">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              {mode === 'create' ? 'Create Event' : 
               mode === 'edit' ? 'Edit Event' : 
               event?.title || 'Event Details'}
            </Dialog.Title>
            <button
              type="button"
              onClick={() => {
                setMode('view');
                onClose();
              }}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Content */}
          <div className="mt-4">
            {mode === 'view' && event && (
              <div className="space-y-4">
                <p className="text-sm text-gray-500">{event.description}</p>
                
                <div className="border-t border-b py-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-medium text-gray-500 uppercase">Start</h4>
                      <p className="text-sm">
                        {format(new Date(event.startDate), 'MMM d, yyyy h:mm a')}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-gray-500 uppercase">End</h4>
                      <p className="text-sm">
                        {format(new Date(event.endDate), 'MMM d, yyyy h:mm a')}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase mb-1">Platforms</h4>
                    {renderPlatforms()}
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase mb-1">Client</h4>
                    {renderClient()}
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase mb-1">Labels</h4>
                    {renderLabels()}
                  </div>
                  
                  {renderRepeatInfo()}
                </div>
                
                {/* Images */}
                {event.images.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Images</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {event.images.map((image, index) => (
                        <img 
                          key={index}
                          src={image}
                          alt={`Event image ${index + 1}`}
                          className="h-24 w-full object-cover rounded-md"
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('edit')}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                </div>
              </div>
            )}
            
            {mode === 'edit' && event && (
              <EventForm 
                event={event} 
                onSubmit={handleUpdate} 
                onCancel={() => setMode('view')} 
              />
            )}
            
            {mode === 'create' && (
              <EventForm 
                initialDate={selectedDate}
                onSubmit={handleCreate} 
                onCancel={onClose} 
              />
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default EventModal;