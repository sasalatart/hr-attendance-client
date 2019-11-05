import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography } from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';

const useStyles = makeStyles({
  spinner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  absolute: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
});

export default function DataPlaceholder({
  loading,
  resource,
  children,
  fullScreen,
}) {
  const { t } = useTranslation();
  const classes = useStyles();

  if (!loading && isEmpty(resource)) {
    return <Typography>{t('nothingHereYet')}</Typography>;
  }

  if (loading) {
    return (
      <div
        className={classnames(classes.spinner, fullScreen && classes.absolute)}
      >
        <CircularProgress size={50} />
      </div>
    );
  }

  return typeof children === 'function' ? children() : children;
}

DataPlaceholder.propTypes = {
  children: PropTypes.func,
  fullScreen: PropTypes.bool,
  loading: PropTypes.bool,
  resource: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({}),
  ]),
};

DataPlaceholder.defaultProps = {
  children: undefined,
  fullScreen: false,
  loading: false,
  resource: undefined,
};
