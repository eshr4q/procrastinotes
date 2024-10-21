// src/components/Note.tsx
import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";

interface NoteProps {
  id: string;
  title: string;
  content: string;
  creationDate: string;
  deadline: string;
  x: number;
  y: number;
  onDragStop: (id: string, x: number, y: number) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedTitle: string, updatedContent: string) => void;
}

const Note: React.FC<NoteProps> = ({
  id,
  title,
  content,
  creationDate,
  deadline,
  x,
  y,
  onDragStop,
  onDelete,
  onUpdate,
}) => {
  // const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [noteColor, setNoteColor] = useState("bg-yellow-200");

  // Check if the note is close to the deadline
  useEffect(() => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const timeDifference = deadlineDate.getTime() - now.getTime();
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds

    if (timeDifference < oneDay) {
      setNoteColor("bg-red-300"); // Change color if less than a day left
    } else {
      setNoteColor("bg-yellow-200"); // Default color
    }
  }, [deadline]);

  // const handleSave = () => {
  //   setEditMode(false);
  //   onUpdate(id, editedTitle, editedContent);
  // };

  // Handle title and content update when the inputs lose focus
  const handleBlur = () => {
    onUpdate(id, editedTitle, editedContent);
  };

  return (
    <Rnd
      default={{
        x,
        y,
        width: 200,
        height: 150,
      }}
      bounds="parent"
      onDragStop={(e, data) => {
        onDragStop(id, data.x, data.y);
      }}
      className={`${noteColor} p-3 rounded shadow-lg cursor-move`}
    >
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleBlur}
          className="border p-1 rounded w-full text-sm font-semibold bg-transparent focus:outline-none focus:border-blue-400"
        />
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          onBlur={handleBlur}
          className="border p-1 rounded w-full h-24 resize-none bg-transparent focus:outline-none focus:border-blue-400"
        />
        <div className="text-xs text-gray-600 mt-2">
          <p>Created: {creationDate}</p>
          <p>Deadline: {deadline}</p>
        </div>
        <button
          onClick={() => onDelete(id)}
          className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </Rnd>
  );
};

export default Note;
