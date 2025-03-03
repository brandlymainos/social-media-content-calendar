import { useState } from "react";
import CalendarGrid from "./components/Calendar/CalendarGrid";
import CalendarHeader from "./components/Calendar/CalendarHeader";
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
            <div className="flex-1">
              <CalendarHeader
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                onCreateEvent={handleCreateEvent}
                onOpenClientModal={() => setIsClientModalOpen(true)}
                onOpenLabelModal={() => setIsLabelModalOpen(true)}
              />

              <CalendarGrid
                currentDate={currentDate}
                onEventClick={handleEventClick}
                onDateClick={handleDateClick}
              />
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
