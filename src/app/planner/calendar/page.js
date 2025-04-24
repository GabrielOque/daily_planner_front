"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useRef, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/components/styles/calendar.css";
import esLocale from "@fullcalendar/core/locales/es";
import ModalWrapper from "@/components/ModalWrapper";

const events = [
  // LUNES - 2025-04-21
  {
    id: 1,
    title: "Daily Standup",
    description: "Reunión corta para compartir el progreso diario.",
    coordinator: "Ana Gómez",
    participants: ["Todo el equipo"],
    start: "2025-04-21T09:00:00",
    end: "2025-04-21T11:20:00",
  },
  {
    id: 2,
    title: "Reunión de planificación de sprint",
    description: "Definición de objetivos y tareas de la semana.",
    coordinator: "Juan Pérez",
    participants: ["Equipo de desarrollo"],
    start: "2025-04-21T10:30:00",
    end: "2025-04-21T10:12:00",
  },
  {
    id: 3,
    title: "Call con proveedor",
    description: "Confirmación de entregables con el proveedor externo.",
    coordinator: "Luis Martínez",
    participants: ["Proveedor externo", "Líder de proyecto"],
    start: "2025-04-21T11:00:00",
    end: "2025-04-21T12:00:00",
  },
  {
    id: 4,
    title: "Revisión de pull requests",
    description: "Sesión colaborativa para revisar PRs abiertos.",
    coordinator: "Ana Gómez",
    participants: ["Frontend team"],
    start: "2025-04-21T13:00:00",
    end: "2025-04-21T14:00:00",
  },
  {
    id: 5,
    title: "One-on-One",
    description: "Reunión individual entre líder y miembro del equipo.",
    coordinator: "Juan Pérez",
    participants: ["Luis Martínez"],
    start: "2025-04-21T15:00:00",
    end: "2025-04-21T15:30:00",
  },
  {
    id: 6,
    title: "Demo interna de nuevas funcionalidades",
    description: "Presentación de avances del sprint al equipo.",
    coordinator: "María López",
    participants: ["Equipo completo"],
    start: "2025-04-21T16:00:00",
    end: "2025-04-21T17:00:00",
  },

  // MARTES - 2025-04-22
  {
    id: 7,
    title: "Daily Standup",
    description: "Actualización diaria rápida.",
    coordinator: "Ana Gómez",
    participants: ["Todo el equipo"],
    start: "2025-04-22T09:00:00",
    end: "2025-04-22T09:20:00",
  },
  {
    id: 8,
    title: "Sprint Sync Backend",
    description: "Sincronización de avances en el backend.",
    coordinator: "Luis Martínez",
    participants: ["Backend team"],
    start: "2025-04-22T10:00:00",
    end: "2025-04-22T11:00:00",
  },
  {
    id: 9,
    title: "Reunión con cliente",
    description: "Seguimiento de requerimientos y próximos pasos.",
    coordinator: "María López",
    participants: ["Cliente ACME", "Equipo de proyecto"],
    start: "2025-04-22T11:30:00",
    end: "2025-04-22T12:30:00",
  },
  {
    id: 10,
    title: "Capacitación UX",
    description: "Workshop sobre accesibilidad en diseño.",
    coordinator: "Juan Pérez",
    participants: ["Diseño UX", "Frontend"],
    start: "2025-04-22T14:00:00",
    end: "2025-04-22T15:30:00",
  },
  {
    id: 11,
    title: "Testing manual",
    description: "Sesión de QA para nuevas funcionalidades.",
    coordinator: "Ana Gómez",
    participants: ["QA", "Desarrolladores"],
    start: "2025-04-22T16:00:00",
    end: "2025-04-22T17:00:00",
  },
  {
    id: 12,
    title: "Feedback cliente",
    description: "Revisión de feedback recibido por el cliente.",
    coordinator: "Luis Martínez",
    participants: ["PM", "Diseño", "Dev"],
    start: "2025-04-22T17:15:00",
    end: "2025-04-22T18:00:00",
  },

  // MIÉRCOLES - 2025-04-23
  {
    id: 13,
    title: "Daily Standup",
    description: "Sincronización diaria rápida.",
    coordinator: "Ana Gómez",
    participants: ["Todo el equipo"],
    start: "2025-04-23T09:00:00",
    end: "2025-04-23T09:20:00",
  },
  {
    id: 14,
    title: "Refinamiento de backlog",
    description: "Revisión y reordenamiento del backlog.",
    coordinator: "Juan Pérez",
    participants: ["Scrum team"],
    start: "2025-04-23T10:00:00",
    end: "2025-04-23T11:30:00",
  },
  {
    id: 15,
    title: "Revisión de diseño",
    description: "Validación de los nuevos flujos de usuario.",
    coordinator: "María López",
    participants: ["UX", "Frontend"],
    start: "2025-04-23T13:00:00",
    end: "2025-04-23T14:00:00",
  },
  {
    id: 16,
    title: "Pruebas de integración",
    description: "Tests cruzados entre microservicios.",
    coordinator: "Luis Martínez",
    participants: ["DevOps", "Backend"],
    start: "2025-04-23T14:30:00",
    end: "2025-04-23T16:00:00",
  },
  {
    id: 17,
    title: "Mentoría interna",
    description: "Sesión de mentoría entre seniors y juniors.",
    coordinator: "Juan Pérez",
    participants: ["Luis", "Ana"],
    start: "2025-04-23T16:30:00",
    end: "2025-04-23T17:30:00",
  },
  {
    id: 18,
    title: "Brainstorming: nuevas funcionalidades",
    description: "Tormenta de ideas para el siguiente ciclo.",
    coordinator: "María López",
    participants: ["Equipo completo"],
    start: "2025-04-23T17:45:00",
    end: "2025-04-23T18:30:00",
  },

  // JUEVES - 2025-04-24
  {
    id: 19,
    title: "Daily Standup",
    description: "Sincronización breve de tareas y bloqueos.",
    coordinator: "Ana Gómez",
    participants: ["Todo el equipo"],
    start: "2025-04-24T09:00:00",
    end: "2025-04-24T09:20:00",
  },
  {
    id: 20,
    title: "Sprint Review",
    description: "Revisión de resultados del sprint actual.",
    coordinator: "Juan Pérez",
    participants: ["PM", "Stakeholders"],
    start: "2025-04-24T10:00:00",
    end: "2025-04-24T11:30:00",
  },
  {
    id: 21,
    title: "Reunión técnica",
    description: "Revisión de arquitectura del nuevo módulo.",
    coordinator: "Luis Martínez",
    participants: ["Arquitectura", "Backend"],
    start: "2025-04-24T13:00:00",
    end: "2025-04-24T14:30:00",
  },
  {
    id: 22,
    title: "Capacitación en seguridad",
    description: "Buenas prácticas para prevenir vulnerabilidades.",
    coordinator: "Ana Gómez",
    participants: ["Todo el equipo"],
    start: "2025-04-24T15:00:00",
    end: "2025-04-24T16:30:00",
  },
  {
    id: 23,
    title: "Feedback interno",
    description: "Espacio para compartir ideas y sugerencias.",
    coordinator: "María López",
    participants: ["Equipo completo"],
    start: "2025-04-24T16:45:00",
    end: "2025-04-24T17:30:00",
  },
  {
    id: 24,
    title: "Preparación de presentación",
    description: "Organización del demo de la próxima semana.",
    coordinator: "Juan Pérez",
    participants: ["Frontend", "PM"],
    start: "2025-04-24T17:45:00",
    end: "2025-04-24T18:30:00",
  },

  // VIERNES - 2025-04-25
  {
    id: 25,
    title: "Daily Standup",
    description: "Última daily de la semana.",
    coordinator: "Ana Gómez",
    participants: ["Todo el equipo"],
    start: "2025-04-25T09:00:00",
    end: "2025-04-25T09:20:00",
  },
  {
    id: 26,
    title: "Deploy a staging",
    description: "Liberación del sprint en ambiente de pruebas.",
    coordinator: "Luis Martínez",
    participants: ["DevOps", "QA"],
    start: "2025-04-25T10:00:00",
    end: "2025-04-25T11:00:00",
  },
  {
    id: 27,
    title: "Retrospectiva del sprint",
    description:
      "Evaluación de logros, dificultades y oportunidades de mejora.",
    coordinator: "María López",
    participants: ["Scrum team"],
    start: "2025-04-25T11:30:00",
    end: "2025-04-25T12:30:00",
  },
  {
    id: 28,
    title: "Revisión de KPIs",
    description: "Análisis de métricas de desempeño del equipo.",
    coordinator: "Juan Pérez",
    participants: ["PM", "Líderes de equipo"],
    start: "2025-04-25T14:00:00",
    end: "2025-04-25T15:00:00",
  },
  {
    id: 29,
    title: "After Office remoto 🎉",
    description: "Espacio informal para cerrar la semana.",
    coordinator: "Ana Gómez",
    participants: ["Todo el equipo"],
    start: "2025-04-25T16:00:00",
    end: "2025-04-25T17:00:00",
  },
  {
    id: 30,
    title: "Planificación de la próxima semana",
    description: "Identificar prioridades y bloqueos del próximo ciclo.",
    coordinator: "Luis Martínez",
    participants: ["Scrum Master", "Líderes"],
    start: "2025-04-25T17:30:00",
    end: "2025-04-25T18:30:00",
  },
];

const Calendar = () => {
  const router = useRouter();
  const calendarRef = useRef(null);
  const [showPiker, setShowPicker] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    handleResize(); // Ejecutar al montar
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(date);
  };

  return (
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
              console.log("Nuevo evento clickeado");
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
          eventClick={(info) => {
            console.log("Evento seleccionado:", info.event);
            setSelectedEvent(info.event.extendedProps);
          }}
          dateClick={(info) => {
            console.log("Fecha clickeada:", info.dateStr);
          }}
        />
        {selectedEvent && (
          <ModalWrapper onClose={() => setSelectedEvent(null)}>
            <h2 className="text-lg font-bold mb-2">{selectedEvent.title}</h2>
            <p className="text-sm mb-1 text-gray-600">
              <strong>Coordinador:</strong> {selectedEvent.coordinator}
            </p>
            <p className="text-sm mb-1 text-gray-600">
              <strong>Descripción:</strong> {selectedEvent.description}
            </p>
            <p className="text-sm mb-2 text-gray-600">
              <strong>Participantes:</strong>{" "}
              {selectedEvent.participants?.join(", ")}
            </p>
            <div className="w-full">
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition duration-200"
                onClick={() => {
                  router.push(
                    "/planner/join-meeting/?roomName=room-8283&userName=anfitrion"
                  );
                  setSelectedEvent(null);
                }}
              >
                Unirse a la reunión
              </button>
            </div>
          </ModalWrapper>
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
                console.log("Nuevo evento clickeado desde el picker");
              }}
            >
              Nuevo evento
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
