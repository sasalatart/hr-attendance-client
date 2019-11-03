import keymirror from 'keymirror';

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
