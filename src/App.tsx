import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Note, UpdatedNote } from "./types";
import NoteList from "./components/NoteList/NoteList";
import NoteForm from "./components/NoteForm/NoteForm";
import "./App.css";

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (note: Note) => {
    if (!note.title || !note.content) {
      toast.error('Please fill in all fields!');
      return;
    }
    setNotes([...notes, note]);
    toast.success('Note added successfully!');
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    toast.success('Note deleted successfully!');
  };

  const onEdit = (id: string, updatedNote: UpdatedNote) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, ...updatedNote };
      }
      return note;
    });
    setNotes(updatedNotes);
    toast.success('Note updated successfully!');
  };

  return (
    <div>
      <h1>Note Taking App</h1>
      <NoteForm onAdd={addNote} />
      <NoteList notes={notes} onDelete={deleteNote} onEdit={onEdit} />
      <Toaster />
    </div>
  );
};

export default App;
