import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import NoteItem from "./NoteItem";

jest.mock("./NoteItem.css", () => ({
  css: "css",
}));

type Note = {
  id: string;
  title: string;
  content: string;
};

describe("NoteItem", () => {
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  const note: Note = {
    id: "1",
    title: "Test Note",
    content: "This is a test note.",
  };

  const setup = () => {
    return render(
      <NoteItem note={note} onDelete={mockOnDelete} onEdit={mockOnEdit} />
    );
  };

  it("renders the note-title and content initially", () => {
    setup();
    expect(screen.getByText("Test Note")).toBeInTheDocument();
    expect(screen.getByText("This is a test note.")).toBeInTheDocument();
  });

  it("renders the edit form when the Edit button is clicked", () => {
    setup();
    fireEvent.click(screen.getByText("Edit"));
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByText("This is a test note.")).toBeInTheDocument();
  });

  it("calls onEdit with the updated note when the Save button is clicked", () => {
    setup();
    fireEvent.click(screen.getByText("Edit"));
    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Updated Title" },
    });
    fireEvent.change(screen.getByText("This is a test note."), {
      target: { value: "Updated content" },
    });
    fireEvent.click(screen.getByText("Save"));
    expect(mockOnEdit).toHaveBeenCalledWith("1", {
      title: "Updated Title",
      content: "Updated content",
    });
  });

  it("calls onDelete when the Delete button is clicked", () => {
    setup();
    fireEvent.click(screen.getByText("Delete"));
    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });
});
