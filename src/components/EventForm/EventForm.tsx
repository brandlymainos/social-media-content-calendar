import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCalendar } from '../../context/CalendarContext';
import { CalendarEvent, RepeatSettings } from '../../types';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Video, 
  Youtube, 
  Pin,
  X,
  Plus,
  Image as ImageIcon
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface EventFormProps {
  event?: CalendarEvent;
  initialDate?: Date | null;
  onSubmit: (event: Omit<CalendarEvent, 'id'>) => void;
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, initialDate, onSubmit, onCancel }) => {
  const { platforms, clients, labels } = useCalendar();
  
  // Form state
  const [title, setTitle] = useState(event?.title || '');
  const [description, setDescription] = useState(event?.description || '');
  const [startDate, setStartDate] = useState<Date>(initialDate || event?.startDate || new Date());
  const [endDate, setEndDate] = useState<Date>(initialDate || event?.endDate || new Date());
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(event?.platforms || []);
  const [clientId, setClientId] = useState<string>(event?.clientId || (clients[0]?.id || ''));
  const [selectedLabels, setSelectedLabels] = useState<string[]>(event?.labels || []);
  const [images, setImages] = useState<string[]>(event?.images || []);
  
  // Repeat settings
  const [enableRepeat, setEnableRepeat] = useState(!!event?.repeat);
  const [repeatFrequency, setRepeatFrequency] = useState<number>(event?.repeat?.frequency || 1);
  const [repeatIntervalType, setRepeatIntervalType] = useState<'day' | 'week' | 'month' | 'year'>(
    event?.repeat?.intervalType || 'week'
  );
  const [repeatCount, setRepeatCount] = useState<number>(event?.repeat?.count || 4);
  
  // Handle image uploads
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      // In a real app, you would upload these files to a server
      // For this demo, we'll create object URLs
      const newImages = acceptedFiles.map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  });
  
  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      images.forEach(image => {
        if (image.startsWith('blob:')) {
          URL.revokeObjectURL(image);
        }
      });
    };
  }, [images]);
  
  const removeImage = (index: number) => {
    const newImages = [...images];
    const removedImage = newImages.splice(index, 1)[0];
    
    // Revoke object URL if it's a blob
    if (removedImage.startsWith('blob:')) {
      URL.revokeObjectURL(removedImage);
    }
    
    setImages(newImages);
  };
  
  const togglePlatform = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter(id => id !== platformId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };
  
  const toggleLabel = (labelId: string) => {
    if (selectedLabels.includes(labelId)) {
      setSelectedLabels(selectedLabels.filter(id => id !== labelId));
    } else {
      setSelectedLabels([...selectedLabels, labelId]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create repeat settings if enabled
    let repeatSettings: RepeatSettings | null = null;
    if (enableRepeat) {
      repeatSettings = {
        frequency: repeatFrequency,
        intervalType: repeatIntervalType,
        count: repeatCount
      };
    }
    
    onSubmit({
      title,
      description,
      startDate,
      endDate,
      platforms: selectedPlatforms,
      clientId,
      labels: selectedLabels,
      images,
      repeat: repeatSettings,
      ...(event?.parentEventId ? { parentEventId: event.parentEventId } : {})
    });
  };
  
  // Render platform icon
  const renderPlatformIcon = (iconName: string, selected: boolean) => {
    const iconProps = { 
      className: `w-5 h-5 ${selected ? 'text-white' : 'text-gray-500'}` 
    };
    
    switch (iconName) {
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
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title & Description */}
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Event title"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Event description"
          />
        </div>
      </div>
      
      {/* Date & Time */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date & Time
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date & Time
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            minDate={startDate}
          />
        </div>
      </div>
      
      {/* Platform Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Platforms
        </label>
        <div className="flex flex-wrap gap-2">
          {platforms.map(platform => {
            const isSelected = selectedPlatforms.includes(platform.id);
            return (
              <button
                key={platform.id}
                type="button"
                onClick={() => togglePlatform(platform.id)}
                className={`flex items-center px-3 py-2 rounded-md ${
                  isSelected 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {renderPlatformIcon(platform.icon, isSelected)}
                <span className="ml-2 text-sm">{platform.name}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Client Selection */}
      <div>
        <label htmlFor="client" className="block text-sm font-medium text-gray-700">
          Client
        </label>
        <select
          id="client"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          {clients.map(client => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>
      
      {/* Labels */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Labels
        </label>
        <div className="flex flex-wrap gap-2">
          {labels.map(label => {
            const isSelected = selectedLabels.includes(label.id);
            return (
              <button
                key={label.id}
                type="button"
                onClick={() => toggleLabel(label.id)}
                className={`px-3 py-1 rounded-full text-sm ${
                  isSelected ? 'text-white' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: isSelected ? label.color : undefined
                }}
              >
                {label.name}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Images
        </label>
        
        {/* Image preview */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img 
                  src={image} 
                  alt={`Upload ${index + 1}`} 
                  className="h-24 w-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {/* Dropzone */}
        <div 
          {...getRootProps()} 
          className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:bg-gray-50 cursor-pointer"
        >
          <input {...getInputProps()} />
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">
            Drag & drop images here, or click to select files
          </p>
        </div>
      </div>
      
      {/* Repeat Settings */}
      <div>
        <div className="flex items-center mb-4">
          <input
            id="enable-repeat"
            type="checkbox"
            checked={enableRepeat}
            onChange={(e) => setEnableRepeat(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="enable-repeat" className="ml-2 block text-sm font-medium text-gray-700">
            Repeat this event
          </label>
        </div>
        
        {enableRepeat && (
          <div className="pl-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="repeat-frequency" className="block text-sm font-medium text-gray-700">
                  Repeat every
                </label>
                <input
                  type="number"
                  id="repeat-frequency"
                  min="1"
                  value={repeatFrequency}
                  onChange={(e) => setRepeatFrequency(parseInt(e.target.value) || 1)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="repeat-interval" className="block text-sm font-medium text-gray-700">
                  Interval
                </label>
                <select
                  id="repeat-interval"
                  value={repeatIntervalType}
                  onChange={(e) => setRepeatIntervalType(e.target.value as any)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="day">Day(s)</option>
                  <option value="week">Week(s)</option>
                  <option value="month">Month(s)</option>
                  <option value="year">Year(s)</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="repeat-count" className="block text-sm font-medium text-gray-700">
                Repeat count
              </label>
              <input
                type="number"
                id="repeat-count"
                min="1"
                value={repeatCount}
                onChange={(e) => setRepeatCount(parseInt(e.target.value) || 1)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <p className="mt-1 text-sm text-gray-500">
                Event will repeat {repeatCount} times
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {event ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );
};

export default EventForm;