import { Plus, Tag, Users } from "lucide-react";
import { useState } from "react";
import CalendarGrid from "./components/Calendar/CalendarGrid";
import CalendarHeader from "./components/Calendar/CalendarHeader";
import FilterBar from "./components/Filters/FilterBar";
import ClientModal from "./components/Modals/ClientModal";
import EventModal from "./components/Modals/EventModal";
import LabelModal from "./components/Modals/LabelModal";
import { CalendarProvider } from "./context/CalendarContext";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">(
    "view"
  );
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isLabelModalOpen, setIsLabelModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setModalMode("view");
    setIsEventModalOpen(true);
  };

  const handleCreateEvent = () => {
    setSelectedEventId(null);
    setModalMode("create");
    setIsEventModalOpen(true);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedEventId(null);
    setModalMode("create");
    setIsEventModalOpen(true);
  };

  return (
    <CalendarProvider>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Main Calendar Section */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  Social Media Calendar
                </h1>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsClientModalOpen(true)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Users className="w-4 h-4 mr-1" />
                    Clients
                  </button>
                  <button
                    onClick={() => setIsLabelModalOpen(true)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Tag className="w-4 h-4 mr-1" />
                    Labels
                  </button>
                  <button
                    onClick={handleCreateEvent}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    New Event
                  </button>
                </div>
              </div>

              <CalendarHeader
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
              />

              <CalendarGrid
                currentDate={currentDate}
                onEventClick={handleEventClick}
                onDateClick={handleDateClick}
              />
            </div>

            {/* Sidebar */}
            <div className="w-full md:w-80">
              <FilterBar />
            </div>
          </div>
        </div>

        {/* Modals */}
        <EventModal
          isOpen={isEventModalOpen}
          onClose={() => {
            setIsEventModalOpen(false);
            setSelectedDate(null);
          }}
          eventId={selectedEventId}
          mode={modalMode}
          setMode={setModalMode}
          selectedDate={selectedDate}
        />

        <ClientModal
          isOpen={isClientModalOpen}
          onClose={() => setIsClientModalOpen(false)}
        />

        <LabelModal
          isOpen={isLabelModalOpen}
          onClose={() => setIsLabelModalOpen(false)}
        />
      </div>
    </CalendarProvider>
  );
}

export default App;
