import React, { useState } from "react";
import { Note } from "../../types";
import "./NoteForm.css";

interface NoteFormProps {
  onAdd: (note: Note) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ id: Date.now().toString(), title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea        
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteForm;
