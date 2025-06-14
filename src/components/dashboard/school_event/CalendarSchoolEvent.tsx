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
        dayMaxEventRows={true}
        height="auto"
        eventContent={(eventInfo: EventContentArg) => (
          <div className="p-1 m-1 bg-gray-200 rounded-lg shadow text-gray-800 text-sm overflow-visible break-words whitespace-pre-wrap max-w-full">
          <div className="text-[16px] font-semibold leading-snug">
            <i>{eventInfo.event.title}</i>
          </div>
          <div className="border-b border-gray-300 my-1 w-full"></div>
          <div className="flex gap-1 items-center text-xs text-gray-600">
            <FaCalendarAlt />
            <i>{eventInfo.event.extendedProps.dateText}</i>
          </div>
          <div className="flex gap-1 items-center text-xs text-gray-600">
            <FaClock />
            <i>{eventInfo.event.extendedProps.timeText}</i>
          </div>
          <div className="mt-1 text-[13px] leading-tight">
            <i>{eventInfo.event.extendedProps.description}</i>
          </div>
        </div>
        )}
      />
    </div>
  );
};
