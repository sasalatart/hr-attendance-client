import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, withFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Typography } from '@material-ui/core';
import {
  formikSubmit,
  submitButtonProps,
  textFieldProps,
  valuesRequiredCheck,
} from '../lib/forms';
import { logIn } from '../store/ducks/sessions';
import { SubmitButton } from './Common';

const useStyles = makeStyles({
  paper: {
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '320px',
  },
});

function LogIn(props) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h3" align="center">
        {t('sessions.logIn')}
      </Typography>
      <Form>
        <TextField
          {...textFieldProps('email', props, t)}
          label={t('users.email')}
          fullWidth
        />
        <TextField
          {...textFieldProps('password', props, t)}
          label={t('users.password')}
          type="password"
          fullWidth
        />
        <SubmitButton
          {...submitButtonProps(props)}
          textId="sessions.logIn"
          fullWidth
        />
      </Form>
    </Paper>
  );
}

function mapPropsToValues() {
  return { email: '', password: '' };
}

const mapStateToProps = { onSubmit: logIn };

export default compose(
  connect(
    null,
    mapStateToProps,
  ),
  withFormik({
    mapPropsToValues,
    validate: valuesRequiredCheck,
    handleSubmit: formikSubmit,
  }),
)(LogIn);
