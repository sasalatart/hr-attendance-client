import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';

const useStyles = makeStyles({
  progress: {
    marginRight: '10px',
  },
});

export default function SubmitButton({
  dirty,
  errors,
  isSubmitting,
  text,
  textId,
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
      {...rest}
    >
      {isSubmitting && (
        <CircularProgress size={14} className={classes.progress} />
      )}
      <Typography variant="button">{text || t(textId)}</Typography>
    </Button>
  );
}

SubmitButton.propTypes = {
  dirty: PropTypes.bool.isRequired,
  errors: PropTypes.shape({}),
  isSubmitting: PropTypes.bool.isRequired,
  text: PropTypes.string,
  textId: PropTypes.string,
};

SubmitButton.defaultProps = {
  errors: {},
  text: undefined,
  textId: 'forms.submit',
};
