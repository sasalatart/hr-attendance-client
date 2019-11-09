import { schema } from 'normalizr';
import keymirror from 'keymirror';

export const collections = keymirror({
  attendances: null,
  organizations: null,
  users: null,
});

export const attendanceSchema = new schema.Entity(collections.attendances);
export const organizationSchema = new schema.Entity(collections.organizations);
export const userSchema = new schema.Entity(collections.users);
