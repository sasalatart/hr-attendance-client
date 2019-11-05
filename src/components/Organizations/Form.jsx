import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withFormik } from 'formik';
import { TextField } from '@material-ui/core';
import pick from 'lodash/pick';
import {
  formikSubmit,
  textFieldProps,
  valuesRequiredCheck,
} from '../../lib/forms';
import {
  createOrganization,
  updateOrganization,
} from '../../store/ducks/organizations';
import { organizationShape } from '../prop-types';
import { DialogForm } from '../Common';

const DEFAULT_VALUES = { name: '' };
const VALUE_NAMES = Object.keys(DEFAULT_VALUES);

function OrganizationForm({ resource, ...rest }) {
  const { t } = useTranslation();
  const title = t(resource ? 'organizations.edit' : 'organizations.create');
  return (
    <DialogForm {...rest} title={title} destroyOnClose>
      <TextField
        {...textFieldProps('name', rest, t)}
        label={t('organizations.name')}
        fullWidth
      />
    </DialogForm>
  );
}

OrganizationForm.propTypes = {
  resource: organizationShape,
  onClose: PropTypes.func.isRequired,
};

OrganizationForm.defaultProps = {
  resource: undefined,
};

function mapDispatchToProps(dispatch, ownProps) {
  const { resource, onClose, onCreated } = ownProps;
  return {
    onSubmit: resource
      ? values =>
          dispatch(updateOrganization(resource.id, values)).then(onClose)
      : values => dispatch(createOrganization(values)).then(onCreated),
  };
}

function mapPropsToValues({ resource }) {
  return pick(resource || DEFAULT_VALUES, VALUE_NAMES);
}

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withFormik({
    mapPropsToValues,
    validate: valuesRequiredCheck,
    handleSubmit: formikSubmit,
    enableReinitialize: true,
  }),
)(OrganizationForm);
