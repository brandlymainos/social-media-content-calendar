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
    <div className="flex gap-4">
      {/* Platform Dropdown */}
      <div className="platform-dropdown relative">
        <button
          onClick={() => setIsPlatformOpen(!isPlatformOpen)}
          className="inline-flex items-center justify-between px-3 py-2 bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-50 whitespace-nowrap"
        >
          {filters.platforms.length > 0 ? `${filters.platforms.length} selected` : "Platforms"}
          <ChevronDown className="w-4 h-4 ml-2" />
        </button>
        {isPlatformOpen && (
          <div className="absolute z-50 mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[120%] max-h-60 overflow-y-auto">
            {/* Dropdown content */}
          </div>
        )}
      </div>

      {/* Client Dropdown */}
      <div className="client-dropdown relative">
        <button
          onClick={() => setIsClientOpen(!isClientOpen)}
          className="inline-flex items-center justify-between px-3 py-2 bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-50 whitespace-nowrap"
        >
          {filters.clients.length > 0 ? `${filters.clients.length} selected` : "Clients"}
          <ChevronDown className="w-4 h-4 ml-2" />
        </button>
        {isClientOpen && (
          <div className="absolute z-50 mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[120%] max-h-60 overflow-y-auto">
            {/* Dropdown content */}
          </div>
        )}
      </div>

      {/* Label Dropdown */}
      <div className="label-dropdown relative">
        <button
          onClick={() => setIsLabelOpen(!isLabelOpen)}
          className="inline-flex items-center justify-between px-3 py-2 bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-50 whitespace-nowrap"
        >
          {filters.labels.length > 0 ? `${filters.labels.length} selected` : "Labels"}
          <ChevronDown className="w-4 h-4 ml-2" />
        </button>
        {isLabelOpen && (
          <div className="absolute z-50 mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[120%] max-h-60 overflow-y-auto">
            {/* Dropdown content */}
          </div>
        )}
      </div>
    </div>

    {hasActiveFilters && (
      <button
        onClick={clearAllFilters}
        className="text-sm text-blue-600 hover:text-blue-800 ml-auto"
      >
        Clear all
      </button>
    )}
  </div>
</div>
  );
};

export default FilterBar;
