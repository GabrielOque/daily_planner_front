"use client";
import { useState } from "react";
import { Switch, Listbox } from "@headlessui/react";
import CustomInput from "@/components/CustomInput";
import Button from "@/components/Button";

const reminderOptions = [
  { id: 1, label: "Cada día", value: "daily" },
  { id: 2, label: "Cada 3 días", value: "3days" },
  { id: 3, label: "Cada semana", value: "weekly" },
  { id: 4, label: "Nunca", value: "never" },
];

const Page = () => {
  const [imageSrc, setImageSrc] = useState("/defaultprofile.svg");
  const [notifyMeetings, setNotifyMeetings] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(reminderOptions[0]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageSrc(imageURL);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex items-center mb-4">
        <h1 className="text-2xl md:text-4xl font-bold text-textContrast">
          Configuración
        </h1>
      </div>
      <div className="border border-sideBar rounded-lg p-3 h-full">
        <p className="text-md md:text-xl font-bold text-textContrast pb-4">
          Perfil
        </p>
        <div className="w-full flex flex-col md:flex-row gap-x-4 justify-center">
          <div className="w-full md:w-1/2 flex items-center md:items-left flex-col">
            <p className="font-semibold text-textContrast mb-2">
              Foto de perfil
            </p>
            <div className="relative w-[200px] h-[200px] overflow-hidden rounded-lg group mb-4">
              <img
                src={imageSrc}
                alt="profile image"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center pointer-events-none">
                <p className="text-textPrimary">Cambiar imagen</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-20"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 flex items-left flex-col">
            <p className="font-semibold text-textContrast mb-2">Nombre</p>
            <CustomInput
              loading={false}
              value="Gabriel Oquendo"
              placeholder="Nombre"
              height="h-10 md:h-12"
              className="w-80 mt-4 bg-slate-600"
            />
            <p className="font-semibold text-textContrast mb-2 mt-4">
              Cambiar contraseña
            </p>
            <div className="mb-4">
              <CustomInput
                loading={false}
                value="Gabriel Oquendo"
                placeholder="Nueva contraseña"
                height="h-10 md:h-12"
                className="w-80 mt-4 bg-slate-600"
              />
              <CustomInput
                loading={false}
                value="Gabriel Oquendo"
                placeholder="Confirmar nueva contraseña"
                height="h-10 md:h-12 mt-2"
                className="w-80 mt-4 bg-slate-600"
              />
            </div>
            <Button
              paddingY="py-2"
              paddingX="px-2"
              background="bg-primary"
              border="border-2 border-gray-300"
              fontSize="text-sm md:text-md"
              textColor="text-textContrast"
            >
              Guardar
            </Button>
          </div>
        </div>
      </div>
      <div className="border border-sideBar rounded-lg p-3 h-full mt-6">
        <p className="text-md md:text-xl font-bold text-textContrast pb-4">
          Notificaciones
        </p>
        <div className="w-full flex flex-col gap-y-6">
          <div className="flex items-center justify-between gap-4 w-full">
            <label className="text-textContrast font-semibold flex-1">
              ¿Deseas recibir una notificación cuando seas invitado a una
              reunión?
            </label>
            <div className="shrink-0">
              <Switch
                checked={notifyMeetings}
                onChange={setNotifyMeetings}
                className={`${
                  notifyMeetings ? "bg-primary" : "bg-gray-300"
                } relative inline-flex h-8 w-14 items-center rounded-full transition-colors`}
              >
                <span
                  className={`${
                    notifyMeetings ? "translate-x-7" : "translate-x-1"
                  } inline-block h-6 w-6 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-textContrast font-semibold">
              ¿Con qué frecuencia deseas recibir recordatorios de tus tareas?
            </label>
            <Listbox value={selectedReminder} onChange={setSelectedReminder}>
              <div className="relative">
                <Listbox.Button className="bg-white text-textContrast px-4 py-2 rounded-md border border-sidebar w-40 md:w-48 text-center">
                  {selectedReminder.label}
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 bg-white text-textContrast border border-gray-300 rounded-md w-40 md:w-48 shadow-md z-10">
                  {reminderOptions.map((option) => (
                    <Listbox.Option
                      key={option.id}
                      value={option}
                      className="cursor-pointer hover:bg-gray-200 px-4 py-2"
                    >
                      {option.label}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
