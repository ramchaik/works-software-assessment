import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

jest.mock("./App.css", () => ({
  css: "css",
}));

jest.mock("./components/NoteForm/NoteForm.css", () => ({
  css: "css",
}));

jest.mock("./components/NoteList/NoteList.css", () => ({
  css: "css",
}));
jest.mock("./components/NoteItem/NoteItem.css", () => ({
  css: "css",
}));

jest.mock("react-hot-toast", () => ({
  default: {
    error: jest.fn(),
    success: jest.fn(),
  },
  Toaster: () => <div>Toaster</div>,
}));

describe("App", () => {
  test("renders App component", () => {
    render(<App />);
    expect(screen.getByText("Note Taking App")).toBeInTheDocument();
  });

  test("adds a note", async () => {
    render(<App />);
    const noteTitleInput = screen.getByLabelText("note-title"); // Adjust the label text as per your form
    const noteContentInput = screen.getByLabelText("note-content"); // Adjust the label text as per your form

    const addButton = screen.getByText("Add Note");

    fireEvent.change(noteTitleInput, { target: { value: "New note-title" } });
    fireEvent.change(noteContentInput, {
      target: { value: "New note-content" },
    });

    fireEvent.click(addButton);

    expect(await screen.findByText("New note-title")).toBeInTheDocument();
    expect(await screen.findByText("New note-content")).toBeInTheDocument();
  });

  function addNote() {
      const noteTitleInput = screen.getByLabelText("note-title");
      const noteContentInput = screen.getByLabelText("note-content");
   
      fireEvent.change(noteTitleInput, { target: { value: "New note-title" } });
      fireEvent.change(noteContentInput, {
         target: { value: "New note-content" },
      });
   
      const addButton = screen.getByText("Add Note");
      fireEvent.click(addButton);
   }

  test("edits a note", async () => {
      render(<App />);
      addNote();

      const editButton = screen.getByText("Edit");

      fireEvent.click(editButton);
   
      const noteTitleInput = screen.getByLabelText("edit-note-title");
      const noteContentInput = screen.getByLabelText("edit-note-content");
   
      fireEvent.change(noteTitleInput, { target: { value: "Updated note-title" } });
      fireEvent.change(noteContentInput, {
         target: { value: "Updated note-content" },
      });
   
      const saveButton = screen.getByText("Save");

      fireEvent.click(saveButton);

      expect(await screen.findByText("Updated note-title")).toBeInTheDocument();
      expect(await screen.findByText("Updated note-content")).toBeInTheDocument();
   });

   test("deletes a note", async () => {
      render(<App />);
      addNote();
   
      const deleteButton = screen.getByText("Delete");
      fireEvent.click(deleteButton);
   
      expect(screen.queryByText("New note-title")).not.toBeInTheDocument();
      expect(screen.queryByText("New note-content")).not.toBeInTheDocument();
   });
});
