import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';

const useStyles = makeStyles({
  button: {
    marginTop: '10px',
  },
  progress: {
    marginRight: '10px',
  },
});

export default function SubmitButton({
  textId,
  dirty,
  errors,
  isSubmitting,
  ...rest
}) {
  const { t } = useTranslation();
  const classes = useStyles();
  const disabled = !dirty || !isEmpty(errors) || isSubmitting;
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={disabled}
      className={classes.button}
      {...rest}
    >
      {isSubmitting && (
        <CircularProgress size={14} className={classes.progress} />
      )}
      <Typography variant="button">{t(textId)}</Typography>
    </Button>
  );
}

SubmitButton.propTypes = {
  textId: PropTypes.string,
  dirty: PropTypes.bool.isRequired,
  errors: PropTypes.shape({}),
  isSubmitting: PropTypes.bool.isRequired,
};

SubmitButton.defaultProps = {
  textId: 'forms.submit',
  errors: {},
};
