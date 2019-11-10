import { Map, List } from 'immutable';
import { normalize } from 'normalizr';
import isEqual from 'lodash/isEqual';
import API from '../../api';
import { userSchema } from '../schemas';
import {
  destroyCallFactory,
  fulfilledType,
  generateTypes,
  getPaginationDataFactory,
  pendingType,
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

export default function usersReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case pendingType(TYPES.LOAD_LIST): {
      const { paginationSearch } = payload;
      return isEqual(paginationSearch, state.get('paginationSearch'))
        ? state
        : INITIAL_STATE.set('paginationSearch', paginationSearch);
    }
    case fulfilledType(TYPES.LOAD_LIST): {
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

export const loadUser = resourceCallFactory(
  TYPES.LOAD,
  API.userShow,
  userSchema,
);

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
