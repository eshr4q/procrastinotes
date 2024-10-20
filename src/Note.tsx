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
  const [editMode, setEditMode] = useState(false);
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

  const handleSave = () => {
    setEditMode(false);
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
      className={`${noteColor} p-2 rounded shadow-md cursor-move`}
    >
      {editMode ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="border p-1 mb-2 w-full"
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="border p-1 mb-2 w-full"
          />
          <button onClick={handleSave} className="bg-green-500 text-white p-1">
            Save
          </button>
        </div>
      ) : (
        <div>
          <h3 className="font-bold">{editedTitle}</h3>
          <p>{editedContent}</p>
          <p className="text-xs text-gray-500">Created: {creationDate}</p>
          <p className="text-xs text-gray-500">Deadline: {deadline}</p>
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 text-white p-1 mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(id)}
            className="bg-red-500 text-white p-1"
          >
            Delete
          </button>
        </div>
      )}
    </Rnd>
  );
};

export default Note;
