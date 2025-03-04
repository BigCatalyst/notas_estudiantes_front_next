/* eslint-disable prefer-const */
"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";
import {
  EventContentArg,
  EventInput,
  EventSourceInput,
} from "@fullcalendar/core/index.js";
import { useEffect, useState } from "react";
import ApiService from "@/services/ApiService";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

export const CalendarSchoolEvent = () => {
  const [events, setEvents] = useState<EventSourceInput | undefined>([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await ApiService.eventsAll("");
        if (res) {
          let eventsRes: EventInput[] = [];

          res.forEach((val) => {
            eventsRes.push({
              title: val.title,
              description: val.description,
              date: val.date.split("T")[0],
              dateText: val.date.split("T")[0],
              timeText: val.date.split("T")[1].split("Z")[0],
              color: "transparent",
            });
          });

          setEvents(eventsRes);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        locale={esLocale}
        eventContent={(eventInfo: EventContentArg) => (
          <div className="flex flex-col items-center justify-center gap-1 p-1 bg-gray-200 rounded-lg shadow-lg m-1 text-gray-700">
            <span className="text-[17px] font-bold">
              <i>{eventInfo.event.title}</i>
            </span>
            <span className="border-b-1 border-b-gray-300 w-full"></span>
            <span className="inline-flex gap-1 items-center justify-start">
              <FaCalendarAlt />
              <i>{eventInfo.event.extendedProps.dateText}</i>
            </span>
            <span className="inline-flex gap-1 items-center justify-start">
              <FaClock />
              <i>{eventInfo.event.extendedProps.timeText}</i>
            </span>
            <span>
              <i>{eventInfo.event.extendedProps.description}</i>
            </span>
          </div>
        )}
      />
    </div>
  );
};
