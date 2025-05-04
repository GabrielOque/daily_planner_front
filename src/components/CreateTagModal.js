import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { colors } from "@/utils/colors";
import Button from "@/components/Button";
import ModalWrapper from "@/components/ModalWrapper";
import ColorSelector from "@/components/ColorSelector";
import UnderlinedInput from "@/components/UnderlinedInput";
import { useSelector, useDispatch } from "react-redux";
import { createTag } from "@/store/features/tag/tagThunks";
import { clearSuccess } from "@/store/features/tag/tagSlice";

const CreateTagModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { success, error, isLoading } = useSelector((state) => state.tags);
  const [label, setLabel] = useState("");
  const [color, setColor] = useState("blue");

  const handleCreateTag = () => {
    dispatch(
      createTag({
        label: label,
        color: color,
      })
    );
  };

  useEffect(() => {
    if (error) {
      toast.error("Error al crear el tag, intenta nuevamente");
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success("Tag creado con éxito");
      onClose();
      dispatch(clearSuccess());
    }
  }, [success]);

  return (
    <ModalWrapper onClose={onClose} width="w-96" height="h-auto">
      <div className="w-full">
        <h1 className="font-semibold text-2xl">Crear nuevo tag</h1>
        <div className="w-full mt-4">
          <UnderlinedInput
            height="h-8"
            disabled={isLoading}
            placeholder="Ejm: Tag de tareas (max 20 caracteres)"
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
              <div
                className={`text-white text-sm  px-2 py-1 rounded-md`}
                style={{
                  backgroundColor: colors[color],
                }}
              >
                {label}
              </div>
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
              onClick={handleCreateTag}
            >
              Crear
            </Button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default CreateTagModal;
