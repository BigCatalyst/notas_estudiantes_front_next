import { EventsTable } from "@/components/dashboard/school_event/EventsTable";
import React from "react";

const SchoolEvents = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Eventos Escolares</h1>
      <EventsTable />
    </div>
  );
};

export default SchoolEvents;
