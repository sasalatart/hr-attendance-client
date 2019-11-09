import API from '../../api';
import { attendanceSchema } from '../schemas';
import { generateTypes, resourceCallFactory } from './common';

export const TYPES = generateTypes('attendances', ['CHECK_IN', 'CHECK_OUT']);

export const checkIn = resourceCallFactory(
  TYPES.CHECK_IN,
  API.attendancesCheckIn,
  attendanceSchema,
);

export const checkOut = resourceCallFactory(
  TYPES.CREATE,
  API.attendancesCheckOut,
  attendanceSchema,
);
