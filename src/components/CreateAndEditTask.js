import { useState, useEffect, useMemo } from "react";
import { colors } from "@/utils/colors";
import ModalWrapper from "@/components/ModalWrapper";
import UnderlinedInput from "@/components/UnderlinedInput";
import CustomTextArea from "@/components/CustomTextArea";
import CustomSelector from "@/components/CustomSelector";
import Button from "@/components/Button";
import { useSelector } from "react-redux";
import axios from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { NEXT_PUBLIC_API_URL } from "@/utils/envConfig";

const CreateAndEditTask = ({ onClose, selectedTask, getTasks }) => {
  const { lists } = useSelector((state) => state.lists);
  const { tags } = useSelector((state) => state.tags);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [list, setList] = useState({
    id: null,
    label: "",
    color: "",
  });
  const [tag, setTag] = useState({
    id: null,
    label: "",
    color: "",
  });

  const [file, setFile] = useState("");

  const [loadingCreateTask, setLoadingCreateTask] = useState(false);

  const handleCreateTask = async () => {
    if (!title || !description || !date) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }
    setLoadingCreateTask(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("list", list?.id ? list.id : null);
    formData.append("tag", tag?.id ? tag.id : null);
    formData.append("file", file ? file : null);

    try {
      await axios.post(`${NEXT_PUBLIC_API_URL}/task/create-task`, formData);
      toast.success("Tarea creada con éxito");
      setLoadingCreateTask(false);
      getTasks();
      onClose();
    } catch (error) {
      setLoadingCreateTask(false);
      toast.error("Error al crear la tarea, intenta nuevamente");
      console.error("Error creating task:", error);
    }
  };

  const handleEditTask = async () => {
    if (!title || !description || !date) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }
    setLoadingCreateTask(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("list", list?.id ? list.id : null);
    formData.append("tag", tag?.id ? tag.id : null);
    if (!file) {
      formData.append("file", null);
    } else if (file && typeof file === "string") {
      formData.append("file", "file_url");
    } else {
      formData.append("file", file);
    }

    try {
      await axios.put(
        `${NEXT_PUBLIC_API_URL}/task/update-task/${selectedTask.id}`,
        formData
      );
      toast.success("Tarea editada con éxito");
      setLoadingCreateTask(false);
      getTasks();
      onClose();
    } catch (error) {
      setLoadingCreateTask(false);
      toast.error("Error al editar la tarea, intenta nuevamente");
      console.error("Error editing task:", error);
    }
  };

  const onSubmit = () => {
    if (selectedTask?.id) {
      handleEditTask();
    } else {
      handleCreateTask();
    }
  };

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setDate(selectedTask.date);
      setList(selectedTask.list);
      setTag(selectedTask.tag);
      setFile(selectedTask.file);
    } else {
      setTitle("");
      setDescription("");
      setDate("");
      setList({ id: null, label: "", color: "" });
      setTag({ id: null, label: "", color: "" });
      setFile("");
    }
  }, [selectedTask]);

  return (
    <ModalWrapper
      onClose={onClose}
      width="w-full md:w-2/3  2xl:w-1/3"
      height="h-auto max-h-[100%] min-h-[400px]"
    >
      <div className="w-full">
        <div className="flex items-center flex-wrap gap-x-2">
          {selectedTask?.id ? (
            <h1 className="font-semibold text-2xl">Editar tarea</h1>
          ) : (
            <h1 className="font-semibold text-2xl">Crear Tarea</h1>
          )}
          {list?.id && (
            <div className="flex items-center">
              <i
                className={`fas fa-folder text-2xl rounded-sm`}
                style={{ color: colors[list.color] }}
              />
              <p className="text-textSecondary text-sm font-semibold pl-1">
                {list.label}
              </p>
            </div>
          )}
          {tag?.id && (
            <div className="flex items-center">
              <div
                className={`text-white text-sm  px-2 py-1 rounded-md`}
                style={{
                  backgroundColor: colors[tag.color],
                }}
              >
                {tag.label}
              </div>
            </div>
          )}
        </div>
        <section className="mt-3">
          <UnderlinedInput
            placeholder="Nombre de la tarea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="mt-2">
            <UnderlinedInput
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
          <div className="w-full mt-3">
            <CustomTextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="w-full flex md:flex-row flex-col md:gap-x-2 gap-x-2">
            <div className="w-1/2">
              <p className="mt-2">Lista opcional</p>
              <CustomSelector
                options={[
                  { id: null, label: "Ninguna", color: "" },
                  ...lists.map((list) => ({
                    id: list.id,
                    label: list.label,
                    color: list.color,
                  })),
                ]}
                value={list}
                onChange={(option) => setList(option)}
              />
            </div>
            <div className="w-1/2">
              <p className="mt-2">Etiqueta opcional</p>
              <CustomSelector
                options={[
                  { id: null, label: "Ninguna", color: "" },
                  ...tags.map((tag) => ({
                    id: tag.id,
                    label: tag.label,
                    color: tag.color,
                  })),
                ]}
                value={tag}
                onChange={(option) => setTag(option)}
              />
            </div>
          </div>
          <div className="w-full mt-3">
            <label className="flex flex-col items-center justify-center w-full h-16 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:border-blue-500 transition">
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  if (selectedFile) {
                    setFile(selectedFile);
                  }
                }}
              />
              {file ? (
                <p className="text-gray-600">1 archivo selecionado</p>
              ) : (
                <p className="text-gray-600">Sube un archivo</p>
              )}
            </label>
            {file && (
              <div className="flex items-center mt-1">
                <a
                  href={
                    typeof file === "string" ? file : URL?.createObjectURL(file)
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline pl-1"
                >
                  Ver archivo
                </a>
                <i
                  className="fas fa-trash-alt text-red-500 cursor-pointer pl-2"
                  onClick={() => setFile("")}
                />
              </div>
            )}
          </div>
          <div className="flex mt-6 gap-x-2 justify-center">
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
            <div className="w-24">
              <Button
                loading={loadingCreateTask}
                disabled={loadingCreateTask || !title || !description || !date}
                paddingY="py-1"
                paddingX={"px-4"}
                background="bg-primary"
                fontSize="text-sm"
                textColor="text-textContrast"
                onClick={onSubmit}
              >
                {selectedTask?.id ? "Editar" : "Crear"}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </ModalWrapper>
  );
};

export default CreateAndEditTask;
