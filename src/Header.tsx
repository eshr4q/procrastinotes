import React, { useState } from "react";

interface HeaderProps {
  onAddNote: (title: string, content: string, deadline: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onAddNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAddNote(title, content, deadline);

    setTitle("");
    setContent("");
    setDeadline("");
  };

  return (
    <header className="sticky top-0 bg-white shadow p-4 mb-4 z-10">
      <h1 className="text-xl mb-4 text-center text-black-600">
        Don’t give in to feel good,
        <br />
        take control with{" "}
        <span className="text-2xl italic font-bold">Procrastinotes</span>.
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mb-4 flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-2"
      >
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="border p-2 rounded w-full md:w-auto"
        />
        <button
          type="submit"
          className="bg-white border border-gray-400 text-gray-800 hover:border-black hover:text-black hover:font-bold p-2 rounded transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Add Note
        </button>
      </form>
    </header>
  );
};

export default Header;

// const handleSubmit = (e: React.FormEvent) => {
//   e.preventDefault();
//   if (deadline) {
//     onAddNote(title, content, deadline);
//     setTitle("");
//     setContent("");
//     setDeadline("");
//   }
// };
