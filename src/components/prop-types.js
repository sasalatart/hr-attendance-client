import PropTypes from 'prop-types';
import { roles } from '../constants';

export const paginationMetaShape = PropTypes.shape({
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired,
});

const entityAttributes = {
  id: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export const organizationShape = PropTypes.shape({
  ...entityAttributes,
  name: PropTypes.string.isRequired,
});

export const roleShape = PropTypes.oneOf(Object.keys(roles));

export const userShape = PropTypes.shape({
  ...entityAttributes,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  secondSurname: PropTypes.string,
});
