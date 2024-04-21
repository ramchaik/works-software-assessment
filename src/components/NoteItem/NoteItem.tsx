import React, { useState } from "react";
import { Note, UpdatedNote } from "../../types";
import "./NoteItem.css";

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedNote: UpdatedNote) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedNote = {
      title: editedTitle,
      content: editedContent,
    };
    onEdit(note.id, updatedNote);
    setIsEditing(false);
  };

  const editNoteForm = () => (
    <div className="note-form">
      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
      />
    </div>
  );

  const renderNote = () => {
    return (
      <>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
      </>
    );
  }

  return (
    <div className="note-item">
      {isEditing ?  editNoteForm() : renderNote()}
      <div className="note-item-actions">
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
        <button onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    </div>
  );
};

export default NoteItem;
