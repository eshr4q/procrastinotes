import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import "./App.css";

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
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [noteColorClass, setNoteColorClass] = useState("note-yellow");
  const [noteWidth, setNoteWidth] = useState(300);
  const [noteHeight, setNoteHeight] = useState(200);
  const [isFocused, setIsFocused] = useState(false);

  //deadline check
  useEffect(() => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const timeDifference = deadlineDate.getTime() - now.getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    if (timeDifference < oneDay) {
      setNoteColorClass("note-red");
    } else {
      setNoteColorClass("note-yellow");
    }
  }, [deadline]);

  const handleBlur = () => {
    onUpdate(id, editedTitle, editedContent);
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <Rnd
      default={{
        x,
        y,
        width: noteWidth,
        height: noteHeight,
      }}
      bounds="parent"
      onDragStop={(e, data) => {
        onDragStop(id, data.x, data.y);
      }}
      onResize={(e, direction, ref, delta, position) => {
        setNoteWidth(ref.offsetWidth);
        setNoteHeight(ref.offsetHeight);
      }}
      minWidth={200}
      minHeight={200}
      maxWidth={400}
      maxHeight={400}
      className={`note-container ${noteColorClass} p-3 rounded shadow-lg cursor-move`}
      onBlur={handleBlur}
      onFocus={handleFocus}
    >
      <div
        className={`flex flex-col space-y-2 relative ${
          isFocused ? "" : "text-gray-400"
        }`}
        style={{ height: "100%" }}
      >
        <button onClick={() => onDelete(id)} className="note-delete-btn">
          &times;
        </button>
        <input
          type="text"
          placeholder="Title"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className="p-1 rounded w-full text-sm font-semibold bg-transparent focus:outline-none"
        />
        <textarea
          value={editedContent}
          placeholder="Content"
          onChange={(e) => setEditedContent(e.target.value)}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className="note-textarea p-1 rounded resize-none bg-transparent focus:outline-none"
          style={{
            width: "100%",
            height: `${noteHeight - 100}px`,
          }}
        />
        <div className="text-xs text-gray-600 mt-2">
          <p>Created: {creationDate}</p>
          <p>Deadline: {deadline}</p>
        </div>
      </div>
    </Rnd>
  );
};

export default Note;
