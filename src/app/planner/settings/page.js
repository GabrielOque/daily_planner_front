"use client";
import { useState, useEffect, use } from "react";
import axios from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Button from "@/components/Button";
import CustomInput from "@/components/CustomInput";
import { setToken } from "@/utils/auth";
import { setUserAuth } from "@/store/features/user/userSlice";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Switch,
} from "@headlessui/react";

const reminderOptions = [
  { id: 1, label: "Un dia antes", value: "1day" },
  { id: 2, label: "Dos dias antes", value: "2days" },
  { id: 3, label: "Una semana antes", value: "1week" },
  { id: 4, label: "Nunca", value: "never" },
];

const Page = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth);
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [file, setFile] = useState(null);
  const [notifyMeetings, setNotifyMeetings] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState({
    id: 1,
    label: "Un dia antes",
    value: "1day",
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [name, setName] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageSrc(imageURL);
      setFile(file);
    }
  };

  const validateForm = () => {
    if (!name) {
      alert("Por favor, ingresa tu nombre.");
      return false;
    }
    if (password && password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return false;
    }
    return true;
  };

  const hasChanged = () => {
    if (user.name !== name) return true;
    if (file) return true;
    return false;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    if (file) {
      formData.append("image", file);
    }
    if (password) {
      formData.append("password", password);
    }
    try {
      const response = await axios.put("/user/update-user", formData);
      if (response.status === 200) {
        setToken(response.data.token);
        dispatch(setUserAuth(response.data));
        toast.success("Perfil actualizado correctamente.");
      }
      setLoading(false);
    } catch (error) {
      toast.error("Error al actualizar el perfil.");
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("user", user);
    setName(user.name);
    setFile(null);
    setImageSrc(user?.image?.secure_url || "/defaultprofile.svg");
  }, []);

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
              loading={loading}
              value={name}
              placeholder="Nombre"
              height="h-10 md:h-12"
              className="w-80 mt-4 bg-slate-600"
              onChange={(e) => setName(e.target.value)}
            />
            <p className="font-semibold text-textContrast mb-2 mt-4">
              Cambiar contraseña
            </p>
            <div className="mb-4">
              <CustomInput
                loading={loading}
                value={password}
                placeholder="Nueva contraseña"
                height="h-10 md:h-12"
                className="w-80 mt-4 bg-slate-600"
                onChange={(e) => setPassword(e.target.value)}
              />
              <CustomInput
                loading={loading}
                value={confirmPassword}
                placeholder="Confirmar nueva contraseña"
                height="h-10 md:h-12 mt-2"
                className="w-80 mt-4 bg-slate-600"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button
              loading={loading}
              disabled={loading || !hasChanged()}
              paddingY="py-2"
              paddingX="px-2"
              background="bg-primary"
              border="border-2 border-gray-300"
              fontSize="text-sm md:text-md"
              textColor="text-textContrast"
              onClick={handleSave}
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
          <div className="flex md:flex-row flex-col  md:items-center items-start justify-between">
            <label className="text-textContrast font-semibold">
              ¿Con cuanto tiempo deseas recibir un recordatorio de la reunión?
            </label>
            <Menu as="div" className="relative inline-block text-left w-48">
              <MenuButton
                as="button"
                className="w-full bg-white border border-gray-300 px-4 py-2 rounded-md text-left"
              >
                {selectedReminder.label}
              </MenuButton>
              <MenuItems className="absolute z-10 mt-2 w-full bg-white shadow-md rounded-md border border-gray-200">
                {reminderOptions.map((option) => (
                  <MenuItem
                    key={option.id}
                    as="div"
                    className={` rounded-xl m-1 ${
                      selectedReminder.id === option.id ? "bg-gray-200" : ""
                    }`}
                  >
                    <button
                      onClick={() => setSelectedReminder(option)}
                      className={`w-full text-left px-3 py-1`}
                    >
                      {option.label}
                    </button>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
