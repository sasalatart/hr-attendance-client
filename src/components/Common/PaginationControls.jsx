import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import ReactPaginate from 'react-paginate';
import { paginationMetaShape } from '../prop-types';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    listStyle: 'none',
    padding: 0,
  },
  ellipsis: {
    cursor: 'pointer',
  },
  button: {
    cursor: 'pointer',
    margin: '5px',
    padding: '5px',
    borderWidth: 0,
    borderRadius: '4px',
    boxShadow: '0 1px 4px rgba(0, 0, 0, .6)',
    backgroundColor: 'white',
    transition: 'background-color .3s',
    '&:hover': {
      backgroundColor: '#EEEEEE',
    },
  },
  anchor: {
    outline: 0,
  },
  previous: {
    marginRight: '10px',
  },
  next: {
    marginLeft: '10px',
  },
  active: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function PaginationControls({
  onSetPage,
  paginationMeta: { page, totalPages, totalRecords },
}) {
  const { t } = useTranslation();
  const classes = useStyles();

  const handleChangePage = useCallback(
    ({ selected }) => onSetPage(selected + 1),
    [onSetPage],
  );

  if (totalRecords === 0 || totalPages <= 1) {
    return null;
  }

  return (
    <ReactPaginate
      previousLabel={t('pagination.previous')}
      nextLabel={t('pagination.next')}
      breakLabel="..."
      forcePage={page - 1}
      pageCount={totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handleChangePage}
      containerClassName={classes.container}
      pageClassName={classes.button}
      pageLinkClassName={classes.anchor}
      breakClassName={classes.ellipsis}
      previousClassName={classnames(classes.previous, classes.button)}
      previousLinkClassName={classes.anchor}
      nextClassName={classnames(classes.next, classes.button)}
      nextLinkClassName={classes.anchor}
      activeClassName={classes.active}
    />
  );
}

PaginationControls.propTypes = {
  onSetPage: PropTypes.func.isRequired,
  paginationMeta: paginationMetaShape.isRequired,
};
