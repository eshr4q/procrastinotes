import React, { useState, useEffect } from "react";
import Note from "./Note";
import Header from "./Header";

interface NoteData {
  id: string;
  title: string;
  content: string;
  creationDate: string;
  deadline: string;
  x: number;
  y: number;
}

const Wall: React.FC = () => {
  const [notes, setNotes] = useState<NoteData[]>([]);

  useEffect(() => {
    const storedNotes = localStorage.getItem("stickyNotes");
    console.log("Loaded from localStorage:", storedNotes);
    if (storedNotes) {
      try {
        const parsedNotes = JSON.parse(storedNotes);
        if (Array.isArray(parsedNotes)) {
          setNotes(parsedNotes);
        } else {
          console.error("Stored data is not an array:", parsedNotes);
        }
      } catch (error) {
        console.error("Failed to parse stored notes:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      console.log("Saving to localStorage:", notes);
      localStorage.setItem("stickyNotes", JSON.stringify(notes));
    }
  }, [notes]);

  const updateNotePosition = (id: string, x: number, y: number) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, x, y } : note))
    );
  };

  const addNote = (title: string, content: string, deadline: string) => {
    const newNote: NoteData = {
      id: `note-${notes.length + 1}`,
      title,
      content,
      creationDate: new Date().toLocaleString(),
      deadline,
      x: Math.random() * 300,
      y: Math.random() * 300,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const updateNote = (
    id: string,
    updatedTitle: string,
    updatedContent: string
  ) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? { ...note, title: updatedTitle, content: updatedContent }
          : note
      )
    );
  };

  return (
    <div className="p-4 w-full lg:w-3/4 xl:w-2/3 h-3/4 mx-auto bg-gray-50 shadow-md rounded-md relative">
      <Header onAddNote={addNote} />
      <div
        className="p-4 bg-gray-50 shadow-md rounded-md relative"
        style={{ height: "80vh" }}
      >
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            creationDate={note.creationDate}
            deadline={note.deadline}
            x={note.x}
            y={note.y}
            onDragStop={updateNotePosition}
            onDelete={deleteNote}
            onUpdate={updateNote}
          />
        ))}
      </div>
    </div>
  );
};

export default Wall;
