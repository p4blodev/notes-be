import express from 'express';
import Note, { NoteType } from '../models/note';
import User from '../models/user';
import { authHandler } from '../utils/middleware';

const notesRouter = express.Router();

notesRouter.get('/', authHandler, (_req, res) => {
  Note.find({})
    .populate('user', { username: 1, name: 1 })
    .then((notes: NoteType[]) => {
      return res.json(notes);
    })
    .catch(() => res.status(500).json({ error: 'something went wrong' }));
});

notesRouter.get('/:id', authHandler, (req, res, next) => {
  const id = req.params.id;

  Note.findById(id)
    .then((note) => {
      note ? res.json(note) : res.status(404).end();
    })
    .catch((error) => next(error));
});

notesRouter.delete('/:id', authHandler, (req, res, next) => {
  const id = req.params.id;

  Note.findByIdAndDelete(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

notesRouter.post('/', authHandler, async (req, res, next) => {
  const note = req.body;

  const { content, important, userId } = note;

  let user;
  try {
    user = await User.findById(userId);
    if (user) {
      const newNote = new Note({
        content,
        date: new Date().toISOString(),
        important: important || false,
        user: user?.id,
      });

      const savedNote = await newNote.save();

      if (savedNote) {
        user.notes = user.notes.concat(savedNote.id);
        await user.save();
        res.status(201).json(savedNote);
      }
    }
  } catch (error) {
    next(error);
  }
});

notesRouter.put('/:id', authHandler, (req, res, next) => {
  const id = req.params.id;
  const note = req.body;

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'note.content is missing',
    });
  }

  const newNoteInfo = {
    content: note.content,
    important: note.important,
  };

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => next(error));
});

export default notesRouter;
