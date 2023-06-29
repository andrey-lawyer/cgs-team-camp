import * as yup from 'yup';
import { regexPassword } from '../regex-variables/regex.variables';

export let schemaUpdate = yup.object().shape({
  title: yup.string().min(2, 'Title is too short').max(10, 'Title is too long'),
  description: yup.string().min(2, 'description is too short').max(100, 'description is too long')
});

export let schemaAdd = yup.object().shape({
  title: yup.string().min(2, 'Title is too short').max(10, 'Title is too long').required(),
  description: yup
    .string()
    .min(2, 'description is too short')
    .max(100, 'description is too long')
    .required()
});

export let schemaUserRegistration = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().matches(regexPassword, 'Password invalid').required(),
  passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match')
});

export let schemaUserLogin = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().matches(regexPassword, 'Password invalid').required()
});

export let schemaOnlyEmail = yup.object().shape({
  email: yup.string().email().required()
});

export let schemaOnlyPassword = yup.object().shape({
  password: yup.string().matches(regexPassword, 'Password invalid').required()
});
