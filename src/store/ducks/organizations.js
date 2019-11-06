import { Map, List } from 'immutable';
import { normalize } from 'normalizr';
import API from '../../api';
import { organizationSchema } from '../schemas';
import {
  destroyCallFactory,
  generatePromiseTypes,
  generateTypes,
  getPaginationDataFactory,
  resourceCallFactory,
} from './common';
import { getEntityFactory } from './entities';

const INITIAL_STATE = new Map({
  paginatedOrganizations: new Map({}),
  paginationMeta: undefined,
});

export const TYPES = generateTypes('organizations', [
  'LOAD_LIST',
  'LOAD',
  'CREATE',
  'UPDATE',
  'DESTROY',
]);

export const PROMISE_TYPES = generatePromiseTypes(Object.values(TYPES));

export default function organizationsReducer(
  state = INITIAL_STATE,
  { type, payload },
) {
  switch (type) {
    case PROMISE_TYPES.LOAD_LIST.FULFILLED: {
      const { pagination, result } = payload;
      return state
        .setIn(
          ['paginatedOrganizations', String(pagination.page)],
          new List(result),
        )
        .set('paginationMeta', pagination);
    }
    default:
      return state;
  }
}

export function loadOrganizations(page) {
  return {
    type: TYPES.LOAD_LIST,
    payload: API.organizationsIndex(page).then(({ pagination, resources }) => ({
      pagination,
      ...normalize(resources, [organizationSchema]),
    })),
  };
}

export const loadOrganization = resourceCallFactory(
  TYPES.LOAD,
  API.organizationShow,
  organizationSchema,
);

export const createOrganization = resourceCallFactory(
  TYPES.CREATE,
  API.organizationCreate,
  organizationSchema,
);

export const updateOrganization = resourceCallFactory(
  TYPES.UPDATE,
  API.organizationUpdate,
  organizationSchema,
);

export const destroyOrganization = destroyCallFactory(
  TYPES.DESTROY,
  API.ogranizationDestroy,
);

const getOrganizationsState = state => state.organizations;

export const getOrganizationsPaginationData = getPaginationDataFactory(
  organizationSchema,
  getOrganizationsState,
  'paginatedOrganizations',
);

export const getOrganizationEntity = getEntityFactory(
  organizationSchema,
  'organizationId',
);
