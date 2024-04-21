import { render, fireEvent, screen } from '@testing-library/react';
import NoteList from './NoteList';
import "@testing-library/jest-dom";

type Note = {
  id: string;
  title: string;
  content: string;
};

jest.mock("./NoteList.css", () => ({
   css: "css",
}));

jest.mock('../NoteItem/NoteItem', () => {
   return {
      default: ({note}: {note: Note}) => <div>
         <h3>{note.title}</h3>
         <p>{note.content}</p>
      </div>,
   };
});

describe('NoteList', () => {
 const notes = [
    { id: '1', title: 'First Note', content: 'This is the first note.' },
    { id: '2', title: 'Second Note', content: 'This is the second note.' },
 ];

 const onDelete = jest.fn();
 const onEdit = jest.fn();

 it('renders the list of notes', () => {
    render(<NoteList notes={notes} onDelete={onDelete} onEdit={onEdit} />);
    expect(screen.getByText('First Note')).toBeInTheDocument();
    expect(screen.getByText('Second Note')).toBeInTheDocument();
 });

 it('filters notes based on the search query', () => {
    render(<NoteList notes={notes} onDelete={onDelete} onEdit={onEdit} />);
    const searchInput = screen.getByPlaceholderText('Search notes...');

    fireEvent.change(searchInput, { target: { value: 'First' } });
    expect(screen.getByText('First Note')).toBeInTheDocument();
    expect(screen.queryByText('Second Note')).not.toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'Second' } });
    expect(screen.queryByText('First Note')).not.toBeInTheDocument();
    expect(screen.getByText('Second Note')).toBeInTheDocument();
 });

 it('shows "No notes found" when no notes match the search query', () => {
    render(<NoteList notes={notes} onDelete={onDelete} onEdit={onEdit} />);
    const searchInput = screen.getByPlaceholderText('Search notes...');

    fireEvent.change(searchInput, { target: { value: 'Nonexistent' } });
    expect(screen.getByText('No notes found')).toBeInTheDocument();
 });
});
