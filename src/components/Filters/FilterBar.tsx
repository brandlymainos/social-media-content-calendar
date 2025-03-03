import { ChevronDown, Filter } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useCalendar } from "../../context/CalendarContext";

const FilterBar: React.FC = () => {
  const { platforms, clients, labels, filters, updateFilters } = useCalendar();

  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const [isClientOpen, setIsClientOpen] = useState(false);
  const [isLabelOpen, setIsLabelOpen] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest(".platform-dropdown")) setIsPlatformOpen(false);
      if (!target.closest(".client-dropdown")) setIsClientOpen(false);
      if (!target.closest(".label-dropdown")) setIsLabelOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        {/* Platform Dropdown */}
        <div className="platform-dropdown relative">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Platforms</h4>
          <button
            onClick={() => setIsPlatformOpen(!isPlatformOpen)}
            className="w-full text-left px-4 py-2 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-between"
          >
            <span>
              {filters.platforms.length > 0
                ? `${filters.platforms.length} selected`
                : "Select platforms"}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>
          {isPlatformOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  onClick={() => handlePlatformFilter(platform.id)}
                  className={`px-4 py-2 cursor-pointer ${
                    filters.platforms.includes(platform.id)
                      ? "bg-blue-100 text-blue-800"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {platform.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Client Dropdown */}
        <div className="client-dropdown relative">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Clients</h4>
          <button
            onClick={() => setIsClientOpen(!isClientOpen)}
            className="w-full text-left px-4 py-2 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-between"
          >
            <span>
              {filters.clients.length > 0
                ? `${filters.clients.length} selected`
                : "Select clients"}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>
          {isClientOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {clients.map((client) => (
                <div
                  key={client.id}
                  onClick={() => handleClientFilter(client.id)}
                  className={`px-4 py-2 cursor-pointer ${
                    filters.clients.includes(client.id)
                      ? "border-l-4"
                      : "hover:bg-gray-50"
                  }`}
                  style={{
                    borderColor: filters.clients.includes(client.id)
                      ? client.color
                      : "transparent",
                    backgroundColor: filters.clients.includes(client.id)
                      ? `${client.color}33`
                      : "transparent",
                    color: filters.clients.includes(client.id)
                      ? client.color
                      : "inherit",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: client.color }}
                    />
                    <span>{client.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Label Dropdown */}
        <div className="label-dropdown relative">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Labels</h4>
          <button
            onClick={() => setIsLabelOpen(!isLabelOpen)}
            className="w-full text-left px-4 py-2 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-between"
          >
            <span>
              {filters.labels.length > 0
                ? `${filters.labels.length} selected`
                : "Select labels"}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>
          {isLabelOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {labels.map((label) => (
                <div
                  key={label.id}
                  onClick={() => handleLabelFilter(label.id)}
                  className={`px-4 py-2 cursor-pointer ${
                    filters.labels.includes(label.id)
                      ? "border-l-4"
                      : "hover:bg-gray-50"
                  }`}
                  style={{
                    borderColor: filters.labels.includes(label.id)
                      ? label.color
                      : "transparent",
                    backgroundColor: filters.labels.includes(label.id)
                      ? `${label.color}33`
                      : "transparent",
                    color: filters.labels.includes(label.id)
                      ? label.color
                      : "inherit",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: label.color }}
                    />
                    <span>{label.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
