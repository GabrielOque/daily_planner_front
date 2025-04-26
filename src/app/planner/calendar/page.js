"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useRef, useState, useEffect, use } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/components/styles/calendar.css";
import esLocale from "@fullcalendar/core/locales/es";
import CreateAndEditEvent from "@/components/CreateAndEditEvent";
import axios from "@/utils/axiosInstance";
import { NEXT_PUBLIC_API_URL } from "@/utils/envConfig";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

// const events = [
//   // VIERNES - 2025-04-25
//   {
//     id: 1,
//     name: "Daily Standup",
//     description: "Última daily de la semana.",
//     coordinator: "oquendogabriel18@gmail.com",
//     participants: ["user1@gmai.com", "user2@gmail.com"],
//     startDate: "2025-04-25",
//     startTime: "09:00",
//     endTime: "11:20",
//   },
//   {
//     id: 2,
//     name: "Reunion de planeación",
//     description: "Reunión de planeación semanal.",
//     coordinator: "jaime@gmail.com",
//     participants: ["user1@gmai.com", "user2@gmail.com"],
//     startDate: "2025-04-25",
//     startTime: "12:00",
//     endTime: "15:20",
//   },
// ];

const Calendar = () => {
  const router = useRouter();
  const calendarRef = useRef(null);
  const [showPiker, setShowPicker] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [createNewEvent, setCreateNewEvent] = useState(false);
  const [preSelectDate, setPreSelectDate] = useState("");
  const [events, setEvents] = useState([]);
  const { user } = useSelector((state) => state.userAuth);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(date);
  };

  const handleEventClick = (info) => {
    const start = info.event.start;
    const end = info.event.end;

    const event = {
      id: parseInt(info.event.id),
      name: info.event.title,
      description: info.event.extendedProps.description,
      coordinator: info.event.extendedProps.coordinator,
      participants: info.event.extendedProps.participants,
      startDate: start.toISOString().split("T")[0],
      startTime: start.toTimeString().slice(0, 5),
      endTime: end.toTimeString().slice(0, 5),
      isArchived: info.event.extendedProps.isArchived,
      roomName: info.event.extendedProps.roomName,
    };

    setSelectedEvent(event);
  };

  const getEvents = async () => {
    try {
      const response = await axios.get(
        `${NEXT_PUBLIC_API_URL}/event/get-events/?email=${user.email}`
      );
      const events = response.data.map((event) => ({
        id: event._id,
        title: event.name,
        description: event.description,
        coordinator: event.coordinator,
        participants: event.participants,
        start: `${event.startDate}T${event.startTime}`,
        end: `${event.startDate}T${event.endTime}`,
        isArchived: event.isArchived,
        roomName: event.roomName,
      }));
      setEvents(events);
    } catch (error) {
      toast.error("Error al obtener los eventos");
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <div className="p-2 bg-white flex items-start overflow-hidden h-[calc(100vh-80px)] md:h-[calc(100vh-100px)] relative">
        <div className="hidden lg:flex flex-col justify-between items-center mb-4">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
          />
          <div className="pl-1.5 pr-8 w-full justify-center -mt-4">
            <Button
              paddingY="py-1"
              paddingX="px-2"
              background="bg-primary"
              fontSize="text-sm md:text-md"
              textColor="text-neutral"
              onClick={() => {
                setCreateNewEvent(true);
              }}
            >
              Nuevo evento
            </Button>
          </div>
        </div>

        <div className="w-full h-full">
          <div
            className="pb-1 flex items-center w-fit lg:hidden"
            onClick={() => setShowPicker(!showPiker)}
          >
            {showPiker ? (
              <i className="fas fa-chevron-down text-md pr-2 font-bold" />
            ) : (
              <i className="fas fa-chevron-right text-md pr-2 font-bold" />
            )}
            <span className="underline font-semibold">
              {new Date(selectedDate).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridDay"
            headerToolbar={{
              left: "prev,today,next",
              center: isLargeScreen ? "title" : "",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            weekends={true}
            locale={esLocale}
            events={events}
            height="100%"
            eventClick={handleEventClick}
            dateClick={(info) => {
              setPreSelectDate(info.dateStr.split("T")[0]);
              setCreateNewEvent(true);
            }}
          />
          {selectedEvent && (
            <CreateAndEditEvent
              onClose={() => setSelectedEvent(null)}
              selectedEvent={selectedEvent}
              getEvents={getEvents}
            />
          )}
        </div>
        {showPiker && (
          <div className="absolute top-8 left-2 z-50">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                handleDateChange(date);
                setShowPicker(false);
              }}
              inline
            />
            <div className="pl-1.5 pr-8 w-full -mt-6 justify-center">
              <Button
                paddingY="py-1"
                paddingX="px-2"
                background="bg-primary"
                fontSize="text-sm md:text-md"
                textColor="text-neutral"
                onClick={() => {
                  setCreateNewEvent(true);
                }}
              >
                Nuevo evento
              </Button>
            </div>
          </div>
        )}
      </div>
      {createNewEvent && (
        <CreateAndEditEvent
          onClose={() => {
            setCreateNewEvent(false);
            setPreSelectDate("");
          }}
          selectedEvent={null}
          preSelectDate={preSelectDate}
          getEvents={getEvents}
        />
      )}
    </>
  );
};

export default Calendar;
