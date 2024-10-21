// src/components/AddNoteForm.tsx
import React, { useState } from "react";

interface AddNoteFormProps {
  onAddNote: (title: string, content: string, deadline: string) => void;
}

const AddNoteForm: React.FC<AddNoteFormProps> = ({ onAddNote }) => {
  // State for each field in the form
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Make sure all fields are filled before adding a note
    if (deadline) {
      // Call the parent function to add the note
      onAddNote(title, content, deadline);

      // Clear the form fields after submission
      setTitle("");
      setContent("");
      setDeadline("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2"
    >
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="border p-2 rounded w-full md:w-auto"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Note
      </button>
    </form>
  );
};

export default AddNoteForm;
