import { schema } from 'normalizr';
import keymirror from 'keymirror';
import compact from 'lodash/compact';

export const collections = keymirror({
  attendances: null,
  organizations: null,
  users: null,
});

export const attendanceSchema = new schema.Entity(collections.attendances);
export const organizationSchema = new schema.Entity(collections.organizations);

export const userSchema = new schema.Entity(
  collections.users,
  {},
  {
    processStrategy: value => ({
      ...value,
      fullname: compact(
        ['name', 'surname', 'secondSurname'].map(attribute => value[attribute]),
      ).join(' '),
    }),
  },
);
