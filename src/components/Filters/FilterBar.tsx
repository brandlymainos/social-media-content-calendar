import { ChevronDown } from "lucide-react";
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
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear all
            </button>
          )}
          {/* Platform Dropdown */}
          <div className="platform-dropdown relative">
            <button
              onClick={() => setIsPlatformOpen(!isPlatformOpen)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-between"
              style={{ minWidth: "120px" }}
            >
              <span>
                {filters.platforms.length > 0
                  ? `${filters.platforms.length} selected`
                  : "Platforms"}
              </span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            {isPlatformOpen && (
              <div className="absolute z-50 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
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
            <button
              onClick={() => setIsClientOpen(!isClientOpen)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-between"
              style={{ minWidth: "120px" }}
            >
              <span>
                {filters.clients.length > 0
                  ? `${filters.clients.length} selected`
                  : "Clients"}
              </span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            {isClientOpen && (
              <div className="absolute z-50 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
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
            <button
              onClick={() => setIsLabelOpen(!isLabelOpen)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-between"
              style={{ minWidth: "120px" }}
            >
              <span>
                {filters.labels.length > 0
                  ? `${filters.labels.length} selected`
                  : "Labels"}
              </span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            {isLabelOpen && (
              <div className="absolute z-50 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
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
    </div>
  );
};

export default FilterBar;
