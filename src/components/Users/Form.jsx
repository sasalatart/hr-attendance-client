import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import identity from 'lodash/identity';
import mapValues from 'lodash/mapValues';
import pickBy from 'lodash/pickBy';
import snakeCase from 'lodash/snakeCase';
import { formikSubmit, textFieldProps } from '../../lib/forms';
import { createUser, updateUser } from '../../store/ducks/users';
import { newUserSchema, updateUserSchema } from '../../lib/formik-schemas';
import { roleShape, userShape } from '../prop-types';
import { DialogForm } from '../Common';

const DEFAULT_VALUES = {
  email: '',
  name: '',
  surname: '',
  secondSurname: '',
  password: '',
  passwordConfirmation: '',
};

const useStyles = makeStyles({
  field: {
    margin: '5px 0',
  },
});

function UserForm({ resource, ...rest }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const title = t(resource ? 'users.edit' : 'users.create');

  const propsFor = fieldName => ({
    ...textFieldProps(fieldName, rest, t),
    className: classes.field,
    fullWidth: true,
    label: t(`users.${fieldName}`),
  });

  return (
    <DialogForm {...rest} title={title}>
      <TextField {...propsFor('email')} />
      <TextField {...propsFor('name')} />
      <TextField {...propsFor('surname')} />
      <TextField {...propsFor('secondSurname')} />
      <TextField {...propsFor('password')} type="password" />
      <TextField {...propsFor('passwordConfirmation')} type="password" />
    </DialogForm>
  );
}

UserForm.propTypes = {
  role: roleShape.isRequired,
  organizationId: PropTypes.string.isRequired,
  resource: userShape,
  onClose: PropTypes.func.isRequired,
};

UserForm.defaultProps = {
  resource: undefined,
};

function mapDispatchToProps(dispatch, ownProps) {
  const { organizationId, resource, onClose, onCreated } = ownProps;

  if (!resource) {
    const onSubmit = values => {
      const finalValues = pickBy(values, identity);
      return dispatch(createUser(organizationId, finalValues)).then(onCreated);
    };
    return { onSubmit };
  }

  const onSubmit = values => {
    const finalValues = mapValues(values, value => value || null);

    if (!finalValues.password) {
      delete finalValues.password;
      delete finalValues.passwordConfirmation;
    }

    return dispatch(updateUser(resource.id, finalValues)).then(onClose);
  };
  return { onSubmit };
}

function mapPropsToValues({ organizationId, role, resource }) {
  return {
    ...DEFAULT_VALUES,
    role: snakeCase(role),
    organizationId,
    ...pickBy(resource, identity),
  };
}

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withFormik({
    mapPropsToValues,
    validationSchema: ({ resource }) => {
      return resource ? updateUserSchema : newUserSchema;
    },
    handleSubmit: formikSubmit,
    enableReinitialize: true,
  }),
)(UserForm);
