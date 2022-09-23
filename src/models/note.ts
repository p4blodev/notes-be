import { InferSchemaType, model, Schema, Types } from 'mongoose';

const noteSchema = new Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  important: Boolean,
  user: {
    type: Types.ObjectId,
    ref: 'User',
  },
});

noteSchema.set('toJSON', {
  transform: (_document, returnedDocument) => {
    returnedDocument.id = returnedDocument._id;
    delete returnedDocument._id;
    delete returnedDocument.__v;
  },
});

const Note = model('Note', noteSchema);

export type NoteType = InferSchemaType<typeof noteSchema>;
export default Note;
