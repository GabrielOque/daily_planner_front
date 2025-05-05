"use client";

import { useState, useEffect, use } from "react";
import { DateTime } from "luxon";
import { NEXT_PUBLIC_API_URL } from "@/utils/envConfig";
import CustomInput from "@/components/CustomInput";
import ColorSelector from "@/components/ColorSelector";
import DataNotFound from "@/components/DataNotFound";

import axios from "@/utils/axiosInstance";

import FlipNoteCard from "@/components/FlipNoteCard";
import { toast } from "react-toastify";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [displayColors, setDisplayColors] = useState(false);
  const [color, setColor] = useState("red");

  const hasNoneId = notes.some((note) => note._id === "none");

  const handleAddTempNote = () => {
    setDisplayColors(true);
    setNotes([
      {
        _id: "none",
        text: "",
        color: color,
        date: DateTime.now().toFormat("LLL dd, yyyy"),
      },
      ...notes,
    ]);
  };

  const getNotes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${NEXT_PUBLIC_API_URL}/note/get-notes`);
      setNotes(response.data);
    } catch (error) {
      toast.error("Error al cargar las notas");
    } finally {
      setLoading(false);
    }
  };

  const onSuccess = (note, _id) => {
    setNotes((prevNotes) =>
      prevNotes.map((n) => {
        if (n._id === _id) {
          return note;
        }
        return n;
      })
    );
    setDisplayColors(false);
    setColor("red");
    toast.success("Nota guardada con éxito");
  };
  const handleDelete = (_id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== _id));
    toast.success("Nota eliminada con éxito");
    setDisplayColors(false);
    setColor("red");
  };

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    if (color) {
      setNotes((prevNotes) =>
        prevNotes.map((note) => {
          if (note._id === "none") {
            return { ...note, color: color };
          }
          return note;
        })
      );
    }
  }, [color]);

  return (
    <div className="w-full h-full">
      <div className="w-full flex items-center mb-4">
        <h1 className="text-2xl md:text-4xl font-bold text-neutral">Notas</h1>
        <div className="border border-sideBar rounded-lg h-10 md:h-12 flex items-center justify-center ml-2 md:ml-4 md:px-4 px-2 text-xl font-bold">
          {notes.length}
        </div>
      </div>
      <div className="w-full flex items-center gap-x-4 mb-3">
        <div className="w-[80%] md:w-1/2 xl:w-1/3">
          <CustomInput
            height="h-10"
            placeholder="Buscar tarea"
            border="border-gray-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            if (hasNoneId) {
              toast.error("Ya tienes una nota en edición");
              return;
            }
            handleAddTempNote();
          }}
          className={`p-2 bg-black rounded-full text-white w-10 h-10 ${
            hasNoneId ? "cursor-not-allowed opacity-30" : ""
          }`}
        >
          <i className="fas fa-plus text-xs"></i>
        </button>
      </div>
      {displayColors && (
        <ColorSelector
          onClick={(color) => {
            setColor(color);
          }}
          colorSelected={color}
        />
      )}
      <div className="flex flex-wrap gap-4 mt-4 overflow-y-auto h-[calc(100vh-200px)] scroll-custom px-2 content-start">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <i className="fas fa-spinner animate-spin text-2xl" />
          </div>
        ) : notes.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <DataNotFound text="No hay notas" />
          </div>
        ) : (
          <>
            {notes
              .filter((note) => {
                if (search === "") return true;
                return note.text.toLowerCase().includes(search.toLowerCase());
              })
              .map((note) => (
                <FlipNoteCard
                  key={note._id}
                  text={note.text}
                  color={note.color}
                  date={note.date}
                  _id={note._id}
                  onSuccess={onSuccess}
                  onRemove={handleDelete}
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Notes;
