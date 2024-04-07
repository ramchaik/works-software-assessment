import request from 'supertest';
import express, { Express } from 'express';

import router from '../../routes/notes';
import { saveNote, findAllNotes, updateNote, deleteNote, fetchNoteById } from '../../model/note';
import mocked = jest.mocked;

jest.mock('../../model/note');

describe('Note API endpoints', () => {
    let app: Express;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.use('/api/v1/notes', router);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('GET /notes - should get all notes', async () => {
        const mockNotes = [{ id: '1', title: 'Note 1', content: 'Content 1' }, { id: '2', title: 'Note 2', content: 'Content 2' }];
        // @ts-ignore
        mocked(findAllNotes).mockResolvedValue(mockNotes);

        const response = await request(app).get('/api/v1/notes');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockNotes);
    });

    it('GET /notes/:id - should get a note by ID', async () => {
        const noteId = '1';
        const mockNote = { id: noteId, title: 'Note 1', content: 'Content 1' };

        // @ts-ignore
        mocked(fetchNoteById).mockResolvedValue(mockNote);

        const response = await request(app).get(`/api/v1/notes/${noteId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockNote);
    });

    it('POST /notes - should create a new note', async () => {
        const newNote = { title: 'New Note', content: 'New Content' };
        const createdNote = { id: '1', ...newNote };
        // @ts-ignore
        mocked(saveNote).mockResolvedValue(createdNote);

        const response = await request(app).post('/api/v1/notes').send(newNote);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(createdNote);
    });

    it('PUT /notes/:id - should update a note', async () => {
        const updatedNote = { title: 'Updated Note', content: 'Updated Content' };
        const noteId = '1';
        const updatedNoteWithId = { id: noteId, ...updatedNote };
        // @ts-ignore
        mocked(updateNote).mockResolvedValue(updatedNoteWithId);

        const response = await request(app).put(`/api/v1/notes/${noteId}`).send(updatedNote);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedNoteWithId);
    });

    it('DELETE /notes/:id - should delete a note', async () => {
        const noteId = '1';
        // @ts-ignore
        mocked(deleteNote).mockResolvedValue(true);

        const response = await request(app).delete(`/api/v1/notes/${noteId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Note deleted successfully' });
    });
});
