import { schema } from 'normalizr';
import keymirror from 'keymirror';

export const collections = keymirror({
  organizations: null,
  users: null,
});

export const organizationSchema = new schema.Entity(collections.organizations);
export const userSchema = new schema.Entity(collections.users);
