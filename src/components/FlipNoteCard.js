import { useState } from "react";
import { colors } from "@/utils/colors";
import { toast } from "react-toastify";
import { NEXT_PUBLIC_API_URL } from "@/utils/envConfig";
import axios from "@/utils/axiosInstance";
import Button from "@/components/Button";

const FlipNoteCard = ({
  date,
  color,
  text: firstTest,
  _id,
  onSuccess,
  onRemove,
}) => {
  const [isFlipped, setIsFlipped] = useState(_id === "none" ? true : false);
  const [text, setText] = useState(firstTest);
  const [tempText, setTempText] = useState(text);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    let note;
    setLoading(true);
    try {
      if (_id === "none") {
        note = await axios.post(`${NEXT_PUBLIC_API_URL}/note/create-note`, {
          text: tempText,
          color,
          date,
        });
      } else {
        note = await axios.put(
          `${NEXT_PUBLIC_API_URL}/note/update-note/${_id}`,
          {
            text: tempText,
          }
        );
      }
      onSuccess(note.data, _id);
    } catch (error) {
      toast.error("Error al guardar la nota");
    } finally {
      setText(tempText);
      setIsFlipped(false);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (_id === "none") {
      setText("");
      setIsFlipped(false);
      onRemove(_id);
    } else {
      setLoading(true);
      try {
        await axios.delete(`${NEXT_PUBLIC_API_URL}/note/delete-note/${_id}`);
        onRemove(_id);
      } catch (error) {
        toast.error("Error al eliminar la nota");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="sm:w-[250px] w-full h-[250px] [perspective:1000px]">
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div
          className="absolute w-full h-full rounded-xl p-4 flex flex-col justify-between [backface-visibility:hidden]"
          style={{ backgroundColor: colors[color] }}
        >
          <div className="text-black whitespace-pre-line overflow-y-auto overflow-x-hidden pr-1 h-[85%] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {text}
          </div>
          <div className="flex justify-between items-end pt-2">
            <span className="text-sm text-black font-semibold italic">
              {date}
            </span>
            <div className="flex gap-x-2">
              <button
                onClick={() => {
                  setTempText(text);
                  setIsFlipped(true);
                }}
                className="p-2 bg-black rounded-full text-white w-10 h-10"
              >
                <i className="fas fa-pen text-xs" />
              </button>
              {loading ? (
                <div className="w-10 h-10 flex items-center justify-center">
                  <i className="fas fa-spinner animate-spin text-xs" />
                </div>
              ) : (
                <button
                  onClick={handleDelete}
                  className="p-2 bg-black rounded-full text-white w-10 h-10"
                >
                  <i className="fas fa-trash text-xs" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div
          className="absolute w-full h-full rounded-xl p-4 [transform:rotateY(180deg)] [backface-visibility:hidden]"
          style={{ backgroundColor: colors[color] }}
        >
          <textarea
            className="w-full h-[80%] bg-transparent placeholder:text-black placeholder:opacity-30 outline-none resize-none text-black text-lg overflow-y-auto overflow-x-hidden pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            value={tempText}
            onChange={(e) => setTempText(e.target.value)}
            placeholder="Escribe aquí tu nota"
          />
          <div className="flex justify-center mt-2 gap-x-4">
            <Button
              disabled={loading}
              paddingY="py-1"
              paddingX={"px-2"}
              background="bg-gray-300"
              fontSize="text-sm"
              textColor="text-black "
              onClick={() => {
                setIsFlipped(false);
                setTempText(text);
              }}
            >
              Volver
            </Button>
            <Button
              loading={loading}
              disabled={loading || tempText === ""}
              paddingY="py-1"
              paddingX={"px-2"}
              background="bg-black"
              fontSize="text-sm"
              textColor="text-white"
              onClick={handleSave}
            >
              Guardar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipNoteCard;
