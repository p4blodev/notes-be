import { InferSchemaType, model, Schema, Types } from 'mongoose';

import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
    unique: true,
    uniqueCaseInsensitive: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: [
    {
      type: Types.ObjectId,
      ref: 'Note',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (_document, returnedDocument) => {
    returnedDocument.id = returnedDocument._id.toString();
    delete returnedDocument._id;
    delete returnedDocument.__v;
    delete returnedDocument.password;
  },
});

userSchema.plugin(uniqueValidator);

const User = model('User', userSchema);

export type UserType = InferSchemaType<typeof userSchema>;
export default User;
