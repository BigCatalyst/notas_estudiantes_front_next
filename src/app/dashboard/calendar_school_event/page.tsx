import { CalendarSchoolEvent } from "@/components/dashboard/school_event/CalendarSchoolEvent";
import React from "react";

const CalendarEvent = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Calendario de Eventos Escolares
      </h1>
      <CalendarSchoolEvent />
    </div>
  );
};

export default CalendarEvent;
