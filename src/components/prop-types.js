import PropTypes from 'prop-types';

export const paginationMetaShape = PropTypes.shape({
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired,
});

export const organizationShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
});
