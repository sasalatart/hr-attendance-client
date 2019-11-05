import { List } from 'immutable';
import { createSelector } from 'reselect';
import { normalize, denormalize } from 'normalizr';
import URI from 'urijs';
import keymirror from 'keymirror';
import { getEntities } from './entities';

export const PROMISE_TYPES_SUFFIXES = keymirror({
  PENDING: null,
  FULFILLED: null,
  REJECTED: null,
});

export function generateTypes(namespace, types) {
  return types.reduce(
    (acc, key) => ({
      ...acc,
      [key]: `${namespace}/${key}`,
    }),
    {},
  );
}

export function generatePromiseTypes(types) {
  return types.reduce((acc, type) => {
    const key = type.split('/').slice(-1);
    return {
      ...acc,
      [key]: {
        PENDING: `${type}_${PROMISE_TYPES_SUFFIXES.PENDING}`,
        FULFILLED: `${type}_${PROMISE_TYPES_SUFFIXES.FULFILLED}`,
        REJECTED: `${type}_${PROMISE_TYPES_SUFFIXES.REJECTED}`,
      },
    };
  }, {});
}

export function resourceCallFactory(type, callFn, schema) {
  return function cruOperation(...args) {
    return async dispatch => {
      let resource;
      await dispatch({
        type,
        payload: callFn(...args).then(response => {
          resource = response;
          return { ...normalize(response, schema), resource };
        }),
      });
      return resource;
    };
  };
}

export function destroyCallFactory(type, destroyFn) {
  return function destroyResource(resourceId) {
    return {
      type,
      payload: destroyFn(resourceId),
      meta: { id: resourceId },
    };
  };
}

const DEFAULT_PAGINATION_META = { pageSize: 25, totalPages: 1, total: 0 };

export function getPaginationDataFactory(
  schema,
  getResourceState,
  paginatedIdsName,
  paginationMetaName = 'paginationMeta',
) {
  const getPage = ({ router }) => {
    return +URI.parseQuery(router.location.search).page || 1;
  };

  const getIdsFromPage = createSelector(
    getPage,
    getResourceState,
    (page, resourceState) => {
      return resourceState.getIn([paginatedIdsName, String(page)], new List());
    },
  );

  const getPaginatedEntities = createSelector(
    getIdsFromPage,
    getEntities,
    (institutionsIds, entities) => {
      return denormalize(institutionsIds, [schema], entities).toJS();
    },
  );

  const getPaginationMeta = createSelector(
    getPage,
    getResourceState,
    (page, resourceState) => ({
      ...DEFAULT_PAGINATION_META,
      ...resourceState.get(paginationMetaName),
      page,
    }),
  );

  const getPaginationData = createSelector(
    getPaginatedEntities,
    getPaginationMeta,
    (resources, paginationMeta) => ({
      resources,
      paginationMeta,
    }),
  );

  return getPaginationData;
}
