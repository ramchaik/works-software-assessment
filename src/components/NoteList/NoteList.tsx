import React, { useState } from "react";
import { Note, UpdatedNote } from "../../types";
import NoteItem from "../NoteItem/NoteItem";
import "./NoteList.css";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedNote: UpdatedNote) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onDelete, onEdit }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (notes.length === 0) {
    return null;
  }

  return (
    <div className="note-list-section">
      <strong>My Notes</strong>
      <input
        className="search-input"
        type="text"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="note-list">
        {filteredNotes.length === 0 && <div>No notes found</div>}
        {filteredNotes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default NoteList;
