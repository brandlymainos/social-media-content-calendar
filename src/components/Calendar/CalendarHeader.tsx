import { addMonths, format, subMonths } from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React from "react";
import FilterBar from "../Filters/FilterBar";

interface CalendarHeaderProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  setCurrentDate,
}) => {
  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <div className="flex items-center space-x-1">
          <button
            onClick={goToPreviousMonth}
            className="p-1.5 rounded-full hover:bg-gray-100"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-1.5 rounded-full hover:bg-gray-100"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <button
          onClick={goToToday}
          className="flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 text-sm font-medium text-gray-700"
        >
          <CalendarIcon className="w-4 h-4 mr-1" />
          Today
        </button>
      </div>
      <div className="flex items-center space-x-2">
        {" "}
        {/* Sidebar */}
        <div className="w-full md:w-80">
          <FilterBar />
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
