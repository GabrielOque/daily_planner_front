import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ModalWrapper from "@/components/ModalWrapper";
import UnderlinedInput from "@/components/UnderlinedInput";
import CustomTextArea from "@/components/CustomTextArea";
import Button from "@/components/Button";
import { useSelector } from "react-redux";
import axios from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { NEXT_PUBLIC_API_URL } from "@/utils/envConfig";

const CreateAndEditEvent = ({
  onClose,
  selectedEvent,
  preSelectDate = "",
  getEvents,
}) => {
  const router = useRouter();
  const { user } = useSelector((state) => state.userAuth);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [participants, setParticipants] = useState([]);
  const [searchParticipant, setSearchParticipant] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingCreateEvent, setLoadingCreateEvent] = useState(false);

  const handleSearchUser = async () => {
    setLoadingSearch(true);
    try {
      const { data } = await axios.get(
        `${NEXT_PUBLIC_API_URL}/user/search-user-from-event/?email=${searchParticipant}`
      );
      setLoadingSearch(false);
      setSearchParticipant("");
      setParticipants((prev) => [...prev, data.email]);
    } catch (error) {
      setLoadingSearch(false);
      if (error?.response?.data?.code === "USER_NOT_FOUND") {
        toast.error("El usuario no existe");
        return;
      }
      toast.error("Error al buscar el usuario");
    }
  };

  const handleCreateEvent = async () => {
    setLoadingCreateEvent(true);
    try {
      const eventData = {
        name,
        description,
        startDate,
        startTime,
        endTime,
        participants,
      };
      await axios.post(`${NEXT_PUBLIC_API_URL}/event/create-event`, {
        ...eventData,
        coordinator: user.email,
      });
      setLoadingCreateEvent(false);
      toast.success("Evento creado con éxito");
      getEvents();
      onClose();
    } catch (error) {
      setLoadingCreateEvent(false);
      toast.error("Error al crear el evento");
    }
  };

  const handleJoinEvent = () => {
    router.push(`/planner/join-meeting?roomName=${selectedEvent.roomName}`);
  };

  useEffect(() => {
    if (selectedEvent) {
      setName(selectedEvent.name || "");
      setDescription(selectedEvent.description || "");
      setStartDate(selectedEvent.startDate);
      setStartTime(selectedEvent.startTime || "");
      setEndTime(selectedEvent.endTime || "");
      setParticipants(selectedEvent.participants || []);
    } else {
      setName("");
      setDescription("");
      setStartDate(preSelectDate || "");
      setStartTime("");
      setEndTime("");
      setParticipants([]);
    }
  }, [selectedEvent]);

  return (
    <ModalWrapper
      onClose={onClose}
      width="w-full md:w-2/3  2xl:w-1/3"
      height="h-auto max-h-[100%] min-h-[400px]"
    >
      <div className="w-full p-2">
        {selectedEvent ? (
          <div className="flex items-center justify-start">
            <h1 className="font-semibold text-xl md:text-2xl whitespace-nowrap">
              Unirse al evento
            </h1>
            {selectedEvent && selectedEvent.coordinator === user.email && (
              <div className="w-20 pl-2">
                <Button
                  paddingY="py-1"
                  paddingX={"px-2"}
                  background="bg-primary"
                  fontSize="text-sm"
                  textColor="text-textContrast"
                >
                  Eliminar
                </Button>
              </div>
            )}
            {selectedEvent && (
              <div className="w-20 pl-2">
                <Button
                  paddingY="py-1"
                  paddingX={"px-2"}
                  background="bg-primary"
                  fontSize="text-sm"
                  textColor="text-textContrast"
                  onClick={handleJoinEvent}
                >
                  Unirse
                </Button>
              </div>
            )}
          </div>
        ) : (
          <h1 className="font-semibold text-2xl">Crear Evento</h1>
        )}
        <section className="mt-3">
          <UnderlinedInput
            disabled={selectedEvent && selectedEvent.coordinator !== user.email}
            placeholder="Nombre del evento"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="md:flex-row flex-col flex mt-4 items-center gap-y-1 md:gap-y-0  gap-x-0 md:gap-x-8">
            <div className="md:w-1/3 w-full md:flex-col flex-row ">
              <label className="text-md text-textSecondary font-semibold ">
                Fecha
              </label>
              <UnderlinedInput
                disabled={
                  selectedEvent && selectedEvent.coordinator !== user.email
                }
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
              />
            </div>
            <div className="md:w-1/3 w-full md:flex-col flex-row ">
              <label className="text-md text-textSecondary font-semibold ">
                Hora de inicio
              </label>
              <UnderlinedInput
                disabled={
                  selectedEvent && selectedEvent.coordinator !== user.email
                }
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                type="time"
              />
            </div>
            <div className="md:w-1/3 w-full md:flex-col flex-row ">
              <label className="text-md text-textSecondary font-semibold ">
                Hora de fin
              </label>
              <UnderlinedInput
                disabled={
                  selectedEvent && selectedEvent.coordinator !== user.email
                }
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                type="time"
              />
            </div>
          </div>
          <div className="w-full mt-3">
            <CustomTextArea
              disabled={
                selectedEvent && selectedEvent.coordinator !== user.email
              }
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {(!selectedEvent || selectedEvent?.coordinator === user.email) && (
            <div className="flex  w-full justify-between items-center relative">
              <div className="w-full">
                <UnderlinedInput
                  disabled={
                    selectedEvent && selectedEvent.coordinator !== user.email
                  }
                  placeholder="oquendogabriel18@gmail.com"
                  value={searchParticipant}
                  onChange={(e) => setSearchParticipant(e.target.value)}
                />
              </div>
              <div className="w-20 absolute right-0">
                <Button
                  loading={loadingSearch}
                  disabled={
                    !searchParticipant || searchParticipant === user.email
                  }
                  paddingY="py-1"
                  paddingX={"px-2"}
                  background="bg-primary"
                  fontSize="text-sm"
                  textColor="text-textContrast"
                  onClick={handleSearchUser}
                >
                  Agregar
                </Button>
              </div>
            </div>
          )}
          <div className="w-full mt-3 flex flex-col gap-y-2 max-h-36 md:max-h-96 overflow-y-auto pr-2 scroll-custom">
            {participants.map((participant, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
              >
                <span className="truncate">{participant}</span>
                {(!selectedEvent ||
                  selectedEvent?.coordinator === user.email) && (
                  <button
                    onClick={() =>
                      setParticipants((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                  >
                    <i className="fas fa-times text-red-500"></i>
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="flex mt-4 gap-x-2 justify-center">
            <div className="w-24">
              <Button
                paddingY="py-1"
                paddingX={"px-4"}
                background="bg-gray-300"
                fontSize="text-sm"
                textColor="text-textContrast"
                onClick={onClose}
              >
                Cancelar
              </Button>
            </div>
            {!selectedEvent && (
              <div className="w-24">
                <Button
                  loading={loadingCreateEvent}
                  disabled={!name || !startDate || !startTime || !endTime}
                  paddingY="py-1"
                  paddingX={"px-4"}
                  background="bg-primary"
                  fontSize="text-sm"
                  textColor="text-textContrast"
                  onClick={handleCreateEvent}
                >
                  Guardar
                </Button>
              </div>
            )}
            {selectedEvent && selectedEvent?.coordinator === user.email && (
              <div className="w-24">
                <Button
                  paddingY="py-1"
                  paddingX={"px-4"}
                  background="bg-primary"
                  fontSize="text-sm"
                  textColor="text-textContrast"
                >
                  Editar
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </ModalWrapper>
  );
};

export default CreateAndEditEvent;
