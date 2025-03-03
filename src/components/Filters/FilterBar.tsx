import React from 'react';
import { useCalendar } from '../../context/CalendarContext';
import { Filter } from 'lucide-react';

const FilterBar: React.FC = () => {
  const { 
    platforms, 
    clients, 
    labels, 
    filters, 
    updateFilters 
  } = useCalendar();

  const handlePlatformFilter = (platformId: string) => {
    const newPlatformFilters = filters.platforms.includes(platformId)
      ? filters.platforms.filter(id => id !== platformId)
      : [...filters.platforms, platformId];
    
    updateFilters('platforms', newPlatformFilters);
  };

  const handleClientFilter = (clientId: string) => {
    const newClientFilters = filters.clients.includes(clientId)
      ? filters.clients.filter(id => id !== clientId)
      : [...filters.clients, clientId];
    
    updateFilters('clients', newClientFilters);
  };

  const handleLabelFilter = (labelId: string) => {
    const newLabelFilters = filters.labels.includes(labelId)
      ? filters.labels.filter(id => id !== labelId)
      : [...filters.labels, labelId];
    
    updateFilters('labels', newLabelFilters);
  };

  const clearAllFilters = () => {
    updateFilters('platforms', []);
    updateFilters('clients', []);
    updateFilters('labels', []);
  };

  const hasActiveFilters = 
    filters.platforms.length > 0 || 
    filters.clients.length > 0 || 
    filters.labels.length > 0;

  return (
    <div className="mb-6 bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium text-gray-800 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button 
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear all
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        {/* Platform filters */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Platforms</h4>
          <div className="flex flex-wrap gap-2">
            {platforms.map(platform => (
              <button
                key={platform.id}
                onClick={() => handlePlatformFilter(platform.id)}
                className={`px-3 py-1 text-xs rounded-full ${
                  filters.platforms.includes(platform.id)
                    ? 'bg-blue-100 text-blue-800 border-blue-300'
                    : 'bg-gray-100 text-gray-700 border-gray-200'
                } border`}
              >
                {platform.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Client filters */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Clients</h4>
          <div className="flex flex-wrap gap-2">
            {clients.map(client => (
              <button
                key={client.id}
                onClick={() => handleClientFilter(client.id)}
                className={`px-3 py-1 text-xs rounded-full ${
                  filters.clients.includes(client.id)
                    ? 'bg-blue-100 text-blue-800 border-blue-300'
                    : 'bg-gray-100 text-gray-700 border-gray-200'
                } border`}
                style={{
                  backgroundColor: filters.clients.includes(client.id) ? client.color + '33' : '',
                  borderColor: filters.clients.includes(client.id) ? client.color : '',
                  color: filters.clients.includes(client.id) ? client.color : ''
                }}
              >
                {client.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Label filters */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Labels</h4>
          <div className="flex flex-wrap gap-2">
            {labels.map(label => (
              <button
                key={label.id}
                onClick={() => handleLabelFilter(label.id)}
                className={`px-3 py-1 text-xs rounded-full ${
                  filters.labels.includes(label.id)
                    ? 'bg-blue-100 text-blue-800 border-blue-300'
                    : 'bg-gray-100 text-gray-700 border-gray-200'
                } border`}
                style={{
                  backgroundColor: filters.labels.includes(label.id) ? label.color + '33' : '',
                  borderColor: filters.labels.includes(label.id) ? label.color : '',
                  color: filters.labels.includes(label.id) ? label.color : ''
                }}
              >
                {label.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;