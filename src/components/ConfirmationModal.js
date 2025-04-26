import Button from "@/components/Button";
import ModalWrapper from "@/components/ModalWrapper";

const ConfirmationModal = ({
  onClose,
  title,
  description,
  loading,
  onConfirm,
}) => {
  return (
    <ModalWrapper onClose={onClose} width="w-96" height="h-44">
      <div className="w-full p-2">
        <h1 className="font-semibold text-2xl">{title}</h1>
        <p className="text-md text-textSecondary mt-2">{description}</p>
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
              loading={loading}
              paddingY="py-1"
              paddingX={"px-4"}
              background="bg-primary"
              fontSize="text-sm"
              textColor="text-textContrast"
              onClick={onConfirm}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ConfirmationModal;
