import express, {Request, Response} from 'express';
import {saveNote, findAllNotes, updateNote, deleteNote, fetchNoteById} from '../model/note';
import {handleError} from '../utils/error';
import {HTTP_CODES} from '../utils/http';

const router = express.Router();
/**
 * @api {get} /notes Get all notes
 * @apiName GetNotes
 * @apiGroup Notes
 *
 * @apiSuccess {Object[]} notes Array of note objects.
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const notes = await findAllNotes();
        res.json(notes);
    } catch (error) {
        return handleError(res, error as Error);
    }
});


/**
 * @api {get} /notes/:id Get a note by ID
 * @apiName GetNote
 * @apiGroup Notes
 *
 * @apiParam {String} id Note ID.
 *
 * @apiSuccess {Object} note Note object.
 */
router.get('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    if (!id) {
        return handleError(res, new Error("Note ID is required"), HTTP_CODES.BAD_REQUEST);
    }

    try {
        const note = await fetchNoteById(id);
        if (!note) {
            return handleError(res, new Error("Note not found"), HTTP_CODES.NOT_FOUND);
        }
        res.json(note);
    } catch (error) {
        handleError(res, error as Error, HTTP_CODES.BAD_REQUEST);
    }
});

/**
 * @api {post} /notes Create a new note
 * @apiName CreateNote
 * @apiGroup Notes
 *
 * @apiParam {String} title Title of the note.
 * @apiParam {String} content Content of the note.
 *
 * @apiSuccess {Object} note Newly created note object.
 */
router.post('/', async (req: Request, res: Response) => {
    const {title, content} = req.body;
    if (!title || !content) {
        return handleError(res, new Error("Title and content are required"), HTTP_CODES.BAD_REQUEST);
    }

    try {
        const note = await saveNote(title, content);
        res.status(HTTP_CODES.CREATED).json(note);
    } catch (error) {
        handleError(res, error as Error, HTTP_CODES.BAD_REQUEST);
    }
});

/**
 * @api {put} /notes/:id Update a note
 * @apiName UpdateNote
 * @apiGroup Notes
 *
 * @apiParam {String} id Note ID.
 * @apiParam {String} title Updated title of the note.
 * @apiParam {String} content Updated content of the note.
 *
 * @apiSuccess {Object} note Updated note object.
 */
router.put('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    if (!id) {
        return handleError(res, new Error("Note ID is required"), HTTP_CODES.BAD_REQUEST);
    }

    const {title, content} = req.body;
    if (!title || !content) {
        return handleError(res, new Error("Title and content are required"), HTTP_CODES.BAD_REQUEST);
    }

    try {
        const updatedNote = await updateNote(id, title, content);
        if (!updatedNote) {
            return handleError(res, new Error("Note not found"), HTTP_CODES.NOT_FOUND);
        }
        res.json(updatedNote);
    } catch (error) {
        handleError(res, error as Error, HTTP_CODES.BAD_REQUEST);
    }
});

/**
 * @api {delete} /notes/:id Delete a note
 * @apiName DeleteNote
 * @apiGroup Notes
 *
 * @apiParam {String} id Note ID.
 *
 * @apiSuccess {String} message Success message.
 */
router.delete('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    if (!id) {
        return handleError(res, new Error("Note ID is required"), HTTP_CODES.BAD_REQUEST);
    }

    try {
        const deletedNote = await deleteNote(id);
        if (!deletedNote) {
            return handleError(res, new Error("Note not found"), HTTP_CODES.NOT_FOUND);
        }
        res.json({message: 'Note deleted successfully'});
    } catch (error) {
        handleError(res, error as Error, HTTP_CODES.BAD_REQUEST);
    }
});

export default router;