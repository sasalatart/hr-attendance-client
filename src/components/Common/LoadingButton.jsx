import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress, IconButton } from '@material-ui/core';

const useStyles = makeStyles({
  progress: {
    marginRight: '10px',
  },
});

export default function LoadingButton({
  children,
  disabled,
  Icon,
  loading,
  variant,
  ...rest
}) {
  const classes = useStyles();
  const buttonProps = { variant, disabled: loading || disabled, ...rest };
  const progress = loading && (
    <CircularProgress size={14} className={classes.progress} />
  );

  if (Icon) {
    return <IconButton {...buttonProps}>{progress || <Icon />}</IconButton>;
  }

  return (
    <Button {...buttonProps}>
      {progress}
      {children}
    </Button>
  );
}

LoadingButton.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  Icon: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  variant: PropTypes.string,
};

LoadingButton.defaultProps = {
  disabled: false,
  Icon: undefined,
  variant: 'contained',
};
