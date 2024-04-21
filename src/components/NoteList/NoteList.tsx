import React from "react";
import { Note, UpdatedNote } from "../../types";
import NoteItem from "../NoteItem/NoteItem";
import "./NoteList.css";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedNote: UpdatedNote) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onDelete, onEdit }) => {
  if (notes.length === 0) {
    return;
  }

  return (
    <div className="note-list-section">
      <strong>My Notes</strong>
      <div className="note-list">
        {notes.map((note) => (
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
