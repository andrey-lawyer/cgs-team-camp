import * as yup from 'yup';

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
