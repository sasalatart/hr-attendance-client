import { Map, List } from 'immutable';
import { normalize } from 'normalizr';
import isEqual from 'lodash/isEqual';
import API from '../../api';
import { attendanceSchema } from '../schemas';
import {
  destroyCallFactory,
  fulfilledType,
  generateTypes,
  getPaginationDataFactory,
  pendingType,
  resourceCallFactory,
} from './common';

const INITIAL_STATE = new Map({
  paginatedAttendances: new Map({}),
  paginationMeta: undefined,
  paginationSearch: undefined,
});

export const TYPES = generateTypes('attendances', [
  'CHECK_IN',
  'CHECK_OUT',
  'CREATE',
  'DESTROY',
  'LOAD_FROM_EMPLOYEE',
  'LOAD_FROM_ORGANIZATION',
  'UPDATE',
]);

export default function attendancesReducer(
  state = INITIAL_STATE,
  { type, payload },
) {
  switch (type) {
    case pendingType(TYPES.LOAD_FROM_ORGANIZATION):
    case pendingType(TYPES.LOAD_FROM_EMPLOYEE): {
      const { paginationSearch } = payload;
      return isEqual(paginationSearch, state.get('paginationSearch'))
        ? state
        : INITIAL_STATE.set('paginationSearch', paginationSearch);
    }
    case fulfilledType(TYPES.LOAD_FROM_ORGANIZATION):
    case fulfilledType(TYPES.LOAD_FROM_EMPLOYEE): {
      const { pagination, result } = payload;
      return state
        .setIn(
          ['paginatedAttendances', String(pagination.page)],
          new List(result),
        )
        .set('paginationMeta', pagination);
    }
    default:
      return state;
  }
}

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

export function loadAttendancesFromOrganization(organizationId, page) {
  return {
    type: TYPES.LOAD_FROM_ORGANIZATION,
    payload: {
      promise: API.attendancesFromOrganization(organizationId, page).then(
        ({ pagination, resources }) => ({
          pagination,
          ...normalize(resources, [attendanceSchema]),
        }),
      ),
      data: { paginationSearch: { organizationId } },
    },
  };
}

export function loadAttendancesFromEmployee(employeeId, page) {
  return {
    type: TYPES.LOAD_FROM_EMPLOYEE,
    payload: {
      promise: API.attendancesFromEmployee(employeeId, page).then(
        ({ pagination, resources }) => ({
          pagination,
          ...normalize(resources, [attendanceSchema]),
        }),
      ),
      data: { paginationSearch: { employeeId } },
    },
  };
}

export const createAttendance = resourceCallFactory(
  TYPES.CREATE,
  API.attendanceCreate,
  attendanceSchema,
);

export const updateAttendance = resourceCallFactory(
  TYPES.UPDATE,
  API.attendanceUpdate,
  attendanceSchema,
);

export const destroyAttendance = destroyCallFactory(
  TYPES.DESTROY,
  API.attendanceDestroy,
);

const getAttendancesState = state => state.attendances;

export const getAttendancesPaginationData = getPaginationDataFactory(
  attendanceSchema,
  getAttendancesState,
  'paginatedAttendances',
);
