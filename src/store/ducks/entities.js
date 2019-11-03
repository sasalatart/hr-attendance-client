import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import get from 'lodash/get';
import isAfter from 'date-fns/isAfter';
import isEqual from 'date-fns/isEqual';

const INITIAL_STATE = new Map({});

function merger(oldVal, newVal) {
  if (!oldVal.updatedAt || !newVal.updatedAt) return newVal;
  if (isEqual(newVal.updatedAt, oldVal.updatedAt)) return newVal;

  return isAfter(newVal.updatedAt, oldVal.updatedAt) ? newVal : oldVal;
}

export default function entitiesReducer(state = INITIAL_STATE, action) {
  const entities = get(action.payload, 'entities');

  if (!entities) return state;

  return Object.keys(entities).reduce((newState, entityName) => {
    const mappedEntities = new Map(entities[entityName]);
    return newState.set(
      entityName,
      newState.get(entityName)
        ? newState.get(entityName).mergeWith(merger, mappedEntities)
        : mappedEntities,
    );
  }, state);
}

export const getEntities = state => state.entities;

export function getEntityFactory(schema, idName) {
  return createSelector(
    (_, params) => params[idName],
    getEntities,
    (id, entities) => denormalize(id, schema, entities),
  );
}
