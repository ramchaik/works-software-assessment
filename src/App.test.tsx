import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import toast from 'react-hot-toast';

jest.mock("./App.css", () => ({
    noteItem: "noteItem",
  }));

  jest.mock("./components/NoteItem/NoteItem.css", () => ({
    noteItem: "noteItem",
  }));

  jest.mock("./components/NoteList/NoteList.css", () => ({
    noteItem: "noteItem",
  }));

  jest.mock("./components/NoteForm/NoteForm.css", () => ({
    noteItem: "noteItem",
  }));

// Mock toast to avoid actual toast notifications during tests
jest.mock('react-hot-toast', () => ({
 toast: {
    error: jest.fn(),
    success: jest.fn(),
 },
}));

describe.skip('App', () => {
 it('renders the Note Taking App title', () => {
    render(<App />);
    // @ts-ignore
    expect(screen.getByText('Note Taking App')).toBeInTheDocument();
 });

 it('adds a note when the form is submitted with valid input', () => {
    render(<App />);
    const titleInput = screen.getByPlaceholderText('Title');
    const contentTextarea = screen.getByPlaceholderText('Content');
    const submitButton = screen.getByText('Add Note');

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(contentTextarea, { target: { value: 'Test Content' } });
    fireEvent.click(submitButton);

    expect(toast.success).toHaveBeenCalledWith('Note added successfully!');
 });

 it('shows an error toast when the form is submitted with invalid input', () => {
    render(<App />);
    const submitButton = screen.getByText('Add Note');

    fireEvent.click(submitButton);

    expect(toast.error).toHaveBeenCalledWith('Please fill in all fields!');
 });

 it('deletes a note when the delete button is clicked', () => {
    render(<App />);
    // Assuming you have a way to add a note first, for example:
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByPlaceholderText('Content'), { target: { value: 'Test Content' } });
    fireEvent.click(screen.getByText('Add Note'));

    // Simulate deleting a note
    const deleteButton = screen.getByText('Delete'); // Adjust the selector based on your actual implementation
    userEvent.click(deleteButton);

    expect(toast.success).toHaveBeenCalledWith('Note deleted successfully!');
    // Optionally, check that the note is no longer rendered
    // expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
 });

 it('edits a note when the edit button is clicked', () => {
    render(<App />);
    // Assuming you have a way to add a note first, similar to the delete test

    // Simulate editing a note
    const editButton = screen.getByText('Edit'); // Adjust the selector based on your actual implementation
    userEvent.click(editButton);

    // Assuming you have inputs for editing, fill them out
    const titleInput = screen.getByPlaceholderText('Edit Title');
    const contentTextarea = screen.getByPlaceholderText('Edit Content');
    userEvent.type(titleInput, 'Updated Title');
    userEvent.type(contentTextarea, 'Updated Content');

    // Simulate submitting the edit form
    const submitEditButton = screen.getByText('Submit Edit'); // Adjust the selector based on your actual implementation
    userEvent.click(submitEditButton);

    expect(toast.success).toHaveBeenCalledWith('Note updated successfully!');
    // Optionally, check that the note is updated in the UI
    // expect(screen.getByText('Updated Title')).toBeInTheDocument();
 });

});
