import { addMonths, format, subMonths } from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Tag,
  Users,
} from "lucide-react";
import FilterBar from "../Filters/FilterBar";

interface CalendarHeaderProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  onCreateEvent: () => void;
  onOpenClientModal: () => void;
  onOpenLabelModal: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  setCurrentDate,
  onCreateEvent,
  onOpenClientModal,
  onOpenLabelModal,
}) => {
  const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <h2 className="text-2xl font-bold text-gray-800">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <div className="flex items-center">
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
        </div>
        <button
          onClick={goToToday}
          className="flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 text-sm font-medium text-gray-700"
        >
          <CalendarIcon className="w-4 h-4 mr-1" />
          Today
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-full">
          <FilterBar />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenClientModal}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Users className="w-4 h-4 mr-1" />
            Clients
          </button>
          <button
            onClick={onOpenLabelModal}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Tag className="w-4 h-4 mr-1" />
            Labels
          </button>
          <button
            onClick={onCreateEvent}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 whitespace-nowrap"
          >
            <Plus className="w-4 h-4 mr-1" />
            New Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
