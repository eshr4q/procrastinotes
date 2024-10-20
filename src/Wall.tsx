// src/components/Wall.tsx
import React, { useState } from "react";
import Note from "./Note";
import AddNoteForm from "./AddNoteForm";

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
      x: Math.random() * 300, // Random x position
      y: Math.random() * 300, // Random y position
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
    <div
      className="p-4 max-w-4xl mx-auto bg-gray-100 relative"
      style={{ height: "80vh" }}
    >
      <h1 className="text-2xl font-bold mb-4 text-center">Wall</h1>
      <AddNoteForm onAddNote={addNote} />
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
  );
};

export default Wall;
