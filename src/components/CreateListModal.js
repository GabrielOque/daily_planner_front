import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { colors } from "@/utils/colors";
import Button from "@/components/Button";
import ModalWrapper from "@/components/ModalWrapper";
import ColorSelector from "@/components/ColorSelector";
import UnderlinedInput from "@/components/UnderlinedInput";
import { useSelector, useDispatch } from "react-redux";
import { createList } from "@/store/features/list/listThunks";
import { clearSuccess } from "@/store/features/list/listSlice";

const CreateListModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { success, error, isLoading } = useSelector((state) => state.lists);
  const [label, setLabel] = useState("");
  const [color, setColor] = useState("blue");

  const handleCreateList = () => {
    dispatch(
      createList({
        label: label,
        color: color,
      })
    );
  };

  useEffect(() => {
    if (error) {
      toast.error("Error al crear la lista, intenta nuevamente");
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success("Lista creada con éxito");
      onClose();
      dispatch(clearSuccess());
    }
  }, [success]);

  return (
    <ModalWrapper onClose={onClose} width="w-96" height="h-auto">
      <div className="w-full">
        <h1 className="font-semibold text-2xl">Crear nueva lista</h1>
        <div className="w-full mt-4">
          <UnderlinedInput
            height="h-8"
            disabled={isLoading}
            placeholder="Ejm: Lista de tareas (max 20 caracteres)"
            value={label}
            onChange={(e) => {
              if (e.target.value.length > 20) return;
              setLabel(e.target.value);
            }}
          />

          <p className="mt-4 font-semibold">Seleciona un color</p>
          <ColorSelector
            onClick={(color) => {
              setColor(color);
            }}
            colorSelected={color}
          />
          {label && (
            <div className="flex mt-3 items-center">
              <i
                className={`fas fa-folder text-xl rounded-sm`}
                style={{ color: colors[color] }}
              />
              <p className="text-textSecondary text-sm font-semibold pl-1">
                {label}
              </p>
            </div>
          )}
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
          <div className="w-24">
            <Button
              loading={isLoading}
              disabled={isLoading || !label}
              paddingY="py-1"
              paddingX={"px-4"}
              background="bg-primary"
              fontSize="text-sm"
              textColor="text-textContrast"
              onClick={handleCreateList}
            >
              Crear
            </Button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default CreateListModal;
