import omit from 'lodash/omit';
import pick from 'lodash/pick';

export function formikSubmit(values, { props, resetForm, setSubmitting }) {
  return props
    .onSubmit(values)
    .then(resetForm)
    .catch(() => setTimeout(() => setSubmitting(false), 2000));
}

function baseFieldProps(name, { values, errors, touched, handleBlur }, t) {
  return {
    id: name,
    name,
    value: values[name],
    error: touched[name] ? !!errors[name] : undefined,
    helperText: touched[name] ? t(errors[name]) : undefined,
    onBlur: handleBlur,
  };
}

export function textFieldProps(name, { handleChange, ...rest }, t) {
  return {
    ...baseFieldProps(name, rest, t),
    onChange: handleChange,
  };
}

export function dateTimePickerProps(name, { setFieldValue, ...rest }, t) {
  return {
    ...baseFieldProps(name, rest, t),
    onChange: value => setFieldValue(name, value.toString()),
  };
}

export function selectProps(name, { setFieldValue, values }) {
  return {
    name,
    value: values[name],
    onChange: ({ value }) => setFieldValue(name, value),
  };
}

export function submitButtonProps(props) {
  return pick(props, ['dirty', 'errors', 'isSubmitting']);
}

export function valuesRequiredCheck(values, blacklist = []) {
  const errors = {};
  Object.keys(omit(values, blacklist)).forEach(key => {
    if (!values[key] && values[key] !== false) {
      errors[key] = 'validations.required';
    }
  });
  return errors;
}
