import { Map, List } from 'immutable';
import { normalize } from 'normalizr';
import isEqual from 'lodash/isEqual';
import API from '../../api';
import { userSchema } from '../schemas';
import {
  destroyCallFactory,
  generatePromiseTypes,
  generateTypes,
  getPaginationDataFactory,
  resourceCallFactory,
} from './common';
import { getEntityFactory } from './entities';

const INITIAL_STATE = new Map({
  paginatedUsers: new Map({}),
  paginationMeta: undefined,
  paginationSearch: undefined,
});

export const TYPES = generateTypes('users', [
  'LOAD_LIST',
  'CREATE',
  'UPDATE',
  'DESTROY',
]);

export const PROMISE_TYPES = generatePromiseTypes(Object.values(TYPES));

export default function usersReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case PROMISE_TYPES.LOAD_LIST.PENDING: {
      const { paginationSearch } = payload;
      if (isEqual(paginationSearch, state.get('paginationSearch'))) {
        return state;
      }

      return state
        .set('paginatedUsers', INITIAL_STATE.get('paginatedUsers'))
        .set('paginationMeta', INITIAL_STATE.get('paginationMeta'))
        .set('paginationSearch', paginationSearch);
    }
    case PROMISE_TYPES.LOAD_LIST.FULFILLED: {
      const { pagination, result } = payload;
      return state
        .setIn(['paginatedUsers', String(pagination.page)], new List(result))
        .set('paginationMeta', pagination);
    }
    default:
      return state;
  }
}

export function loadUsers(organizationId, role, page) {
  return {
    type: TYPES.LOAD_LIST,
    payload: {
      promise: API.usersIndex(organizationId, role, page).then(
        ({ pagination, resources }) => ({
          pagination,
          ...normalize(resources, [userSchema]),
        }),
      ),
      data: { paginationSearch: { organizationId, role } },
    },
  };
}

export const createUser = resourceCallFactory(
  TYPES.CREATE,
  API.userCreate,
  userSchema,
);

export const updateUser = resourceCallFactory(
  TYPES.UPDATE,
  API.userUpdate,
  userSchema,
);

export const destroyUser = destroyCallFactory(TYPES.DESTROY, API.userDestroy);

const getUsersState = state => state.users;

export const getUsersPaginationData = getPaginationDataFactory(
  userSchema,
  getUsersState,
  'paginatedUsers',
);

export const getUserEntity = getEntityFactory(userSchema, 'userId');
