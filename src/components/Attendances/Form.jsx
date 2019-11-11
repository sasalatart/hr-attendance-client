import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { DateTimePicker } from '@material-ui/pickers';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';
import { utcToZonedTime } from 'date-fns-tz';
import parseISO from 'date-fns/parseISO';
import { attendanceSchema } from '../../lib/formik-schemas';
import { dateTimePickerProps, formikSubmit } from '../../lib/forms';
import {
  createAttendance,
  updateAttendance,
} from '../../store/ducks/attendances';
import { attendanceShape } from '../prop-types';
import config from '../../config';
import { DialogForm } from '../Common';

const DEFAULT_VALUES = {
  enteredAt: new Date().toString(),
  leftAt: new Date().toString(),
  timezone: config.defaultTimezone,
};
const VALUE_NAMES = Object.keys(DEFAULT_VALUES);

const useStyles = makeStyles({
  picker: {
    display: 'block',
    margin: '15px 0',
  },
});

function AttendanceForm({ resource, ...rest }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const title = t(resource ? 'attendances.edit' : 'attendances.create');

  const propsFor = fieldName => ({
    ...dateTimePickerProps(fieldName, rest, t),
    ampm: false,
    className: classes.picker,
    fullWidth: true,
    label: t(`attendances.${fieldName}`),
  });

  return (
    <DialogForm {...rest} title={title}>
      <DateTimePicker {...propsFor('enteredAt')} />
      <DateTimePicker {...propsFor('leftAt')} />
    </DialogForm>
  );
}

AttendanceForm.propTypes = {
  resource: attendanceShape,
  onClose: PropTypes.func.isRequired,
};

AttendanceForm.defaultProps = {
  resource: undefined,
};

function mapDispatchToProps(dispatch, ownProps) {
  const { employeeId, resource, onClose, onCreated } = ownProps;

  const onSubmit = values => {
    const finalValues = mapValues(values, value => value || null);
    return resource
      ? dispatch(updateAttendance(resource.id, finalValues)).then(onClose)
      : dispatch(createAttendance(employeeId, finalValues)).then(onCreated);
  };

  return { onSubmit };
}

function mapPropsToValues({ resource }) {
  const toZoned = value => {
    return utcToZonedTime(parseISO(value), resource.timezone).toString();
  };

  const timezonedAttendance = resource && {
    enteredAt: toZoned(resource.enteredAt),
    leftAt: resource.leftAt && toZoned(resource.leftAt),
    timezone: config.defaultTimezone,
  };

  return pick(timezonedAttendance || DEFAULT_VALUES, VALUE_NAMES);
}

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withFormik({
    mapPropsToValues,
    validationSchema: attendanceSchema,
    handleSubmit: formikSubmit,
    enableReinitialize: true,
  }),
)(AttendanceForm);
