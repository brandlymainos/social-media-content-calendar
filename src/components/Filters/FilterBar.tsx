import { ChevronDown, Filter } from "lucide-react";
import React from "react";
import { useCalendar } from "../../context/CalendarContext";

const FilterBar: React.FC = () => {
  const { platforms, clients, labels, filters, updateFilters } = useCalendar();

  const handlePlatformFilter = (platformId: string) => {
    const newPlatformFilters = filters.platforms.includes(platformId)
      ? filters.platforms.filter((id) => id !== platformId)
      : [...filters.platforms, platformId];

    updateFilters("platforms", newPlatformFilters);
  };

  const handleClientFilter = (clientId: string) => {
    const newClientFilters = filters.clients.includes(clientId)
      ? filters.clients.filter((id) => id !== clientId)
      : [...filters.clients, clientId];

    updateFilters("clients", newClientFilters);
  };

  const handleLabelFilter = (labelId: string) => {
    const newLabelFilters = filters.labels.includes(labelId)
      ? filters.labels.filter((id) => id !== labelId)
      : [...filters.labels, labelId];

    updateFilters("labels", newLabelFilters);
  };

  const clearAllFilters = () => {
    updateFilters("platforms", []);
    updateFilters("clients", []);
    updateFilters("labels", []);
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
        {/* Platform filters dropdown */}
        <div className="relative">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Platforms</h4>
          <div className="dropdown">
            <button className="dropdown-toggle flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm">
              Select Platforms
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            <div className="dropdown-menu mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg">
              {platforms.map((platform) => (
                <label
                  key={platform.id}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.platforms.includes(platform.id)}
                    onChange={() => handlePlatformFilter(platform.id)}
                    className="mr-2"
                  />
                  {platform.name}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Client filters dropdown */}
        <div className="relative">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Clients</h4>
          <div className="dropdown">
            <button className="dropdown-toggle flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm">
              Select Clients
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            <div className="dropdown-menu mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg">
              {clients.map((client) => (
                <label
                  key={client.id}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.clients.includes(client.id)}
                    onChange={() => handleClientFilter(client.id)}
                    className="mr-2"
                  />
                  {client.name}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Label filters dropdown */}
        <div className="relative">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Labels</h4>
          <div className="dropdown">
            <button className="dropdown-toggle flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm">
              Select Labels
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            <div className="dropdown-menu mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg">
              {labels.map((label) => (
                <label
                  key={label.id}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.labels.includes(label.id)}
                    onChange={() => handleLabelFilter(label.id)}
                    className="mr-2"
                  />
                  {label.name}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
