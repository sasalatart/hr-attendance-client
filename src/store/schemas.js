import { schema } from 'normalizr';
import keymirror from 'keymirror';

export const collections = keymirror({
  users: null,
});

export const userSchema = new schema.Entity(collections.users);
