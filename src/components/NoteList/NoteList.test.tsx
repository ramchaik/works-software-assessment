import { render, fireEvent, screen } from '@testing-library/react';
import NoteList from './NoteList';

jest.mock("./NoteList.css", () => ({
  noteItem: "noteItem",
}));

// Mock the types for simplicity
type Note = {
 id: string;
 title: string;
 content: string;
};

// Mock the NoteItem component to avoid testing it here
jest.mock('../NoteItem/NoteItem', () => () => <div>Mock NoteItem</div>);

describe.skip('NoteList', () => {
 const mockOnDelete = jest.fn();
 const mockOnEdit = jest.fn();

 const notes: Note[] = [
    {
      id: '1',
      title: 'Test Note 1',
      content: 'This is a test note 1.',
    },
    {
      id: '2',
      title: 'Test Note 2',
      content: 'This is a test note 2.',
    },
 ];

 const setup = () => {
    return render(
      <NoteList notes={notes} onDelete={mockOnDelete} onEdit={mockOnEdit} />
    );
 };

 it('renders the list of notes', () => {
    setup();
    // @ts-ignore
    expect(screen.getByText('Test Note 1')).toBeInTheDocument();
    // @ts-ignore
    expect(screen.getByText('Test Note 2')).toBeInTheDocument();
 });

 it('does not render the list if there are no notes', () => {
    render(<NoteList notes={[]} onDelete={mockOnDelete} onEdit={mockOnEdit} />);
    // @ts-ignore
    expect(screen.queryByText('My Notes')).not.toBeInTheDocument();
 });

 it('calls onDelete when the Delete button is clicked on a NoteItem', () => {
    setup();
    const deleteButton = screen.getByText('Delete').closest('button');
    fireEvent.click(deleteButton!);
    expect(mockOnDelete).toHaveBeenCalledWith('1');
 });

 it('calls onEdit with the updated note when the Edit button is clicked on a NoteItem', () => {
    setup();
    const editButton = screen.getByText('Edit').closest('button');
    fireEvent.click(editButton!);
    // Assuming the NoteItem component renders an input for editing the title
    const titleInput = screen.getByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    // Assuming the NoteItem component renders a textarea for editing the content
    const contentTextarea = screen.getByText('This is a test note.').closest('textarea');
    fireEvent.change(contentTextarea!, { target: { value: 'Updated content' } });
    const saveButton = screen.getByText('Save').closest('button');
    fireEvent.click(saveButton!);
    expect(mockOnEdit).toHaveBeenCalledWith('1', {
      title: 'Updated Title',
      content: 'Updated content',
    });
 });
});

