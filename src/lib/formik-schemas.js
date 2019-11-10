import * as Yup from 'yup';
import snakeCase from 'lodash/snakeCase';
import { roles } from '../constants';

const MIN_PASSWORD_LENGTH = 6;

Yup.setLocale({
  mixed: {
    required: 'validations.required',
  },
  string: {
    email: 'validations.email',
    max: 'validations.stringMax',
    min: 'validations.stringMin',
  },
});

const baseUserSchema = {
  email: Yup.string()
    .email()
    .required(),
  name: Yup.string().required(),
  surname: Yup.string().required(),
  secondSurname: Yup.string(),
};

export const newUserSchema = Yup.object().shape({
  ...baseUserSchema,
  role: Yup.string()
    .required()
    .oneOf(Object.keys(roles).map(snakeCase)),
  organizationId: Yup.string().required(),
  password: Yup.string()
    .required()
    .min(MIN_PASSWORD_LENGTH),
  passwordConfirmation: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'validations.passwordsDoNotMatch'),
});

export const updateUserSchema = Yup.object().shape({
  ...baseUserSchema,
  password: Yup.string().min(MIN_PASSWORD_LENGTH),
  passwordConfirmation: Yup.string().test(
    'passwords-must-match',
    'validations.passwordsDoNotMatch',
    function passwordsMustMatch(value) {
      const { password } = this.parent;
      return !password || value === password;
    },
  ),
});

export const attendanceSchema = Yup.object().shape({
  enteredAt: Yup.date()
    .required()
    .max(new Date(), 'validations.mayNotBeInTheFuture'),
  leftAt: Yup.date().min(
    Yup.ref('enteredAt'),
    'validations.mustBeAfterEnteredAt',
  ),
});
