import omit from 'lodash/omit';
import pick from 'lodash/pick';

export function formikSubmit(values, { props, setSubmitting }) {
  return props
    .onSubmit(values)
    .catch(() => setTimeout(() => setSubmitting(false), 2000));
}

function baseFieldProps(name, { values, errors }, t) {
  return {
    id: name,
    name,
    value: values[name],
    error: !!errors[name],
    helperText: t(errors[name]),
  };
}

export function textFieldProps(name, { values, errors, handleChange }, t) {
  return {
    ...baseFieldProps(name, { values, errors }, t),
    onChange: handleChange,
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
