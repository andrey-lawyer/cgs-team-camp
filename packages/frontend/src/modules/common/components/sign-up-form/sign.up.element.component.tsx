import React, { FC } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { schemaUserRegistration } from '../../../services/validation';
import { useMutationUserRegister } from '../../../hooks/use.mutation.user.register';
import { notify } from '../../../services/toast';
import { Loader } from '../loader';
import { useNavigate } from 'react-router-dom';

export const SignUp: FC = () => {
  const {
    mutation: { mutate, data, isLoading, isError }
  } = useMutationUserRegister();

  const success = () => toast(' check your mail');

  if (data) success();

  if (isError) notify();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    validationSchema: schemaUserRegistration,
    onSubmit: (values) => {
      const user = { email: values.email, password: values.passwordConfirmation };
      mutate(user);
    }
  });
  return (
    <Box p="20px" mt="15x">
      {isLoading && <Loader />}
      <Box textAlign={'center'} mb="10px">
        <Typography variant="h4" component="h1">
          Sign Up
        </Typography>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Box border="1px solid" mb="5px" p="5px">
          <TextField
            fullWidth
            id="email"
            name="email"
            label="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>
        <Box border="1px solid" mb="15px" p="5px">
          <TextField
            fullWidth
            id="password"
            name="password"
            label="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Box>
        <Box border="1px solid" mb="15px" p="5px">
          <TextField
            fullWidth
            id="passwordConfirmation"
            name="passwordConfirmation"
            label="confirm password"
            type="password"
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
            error={
              formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)
            }
            helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
          />
        </Box>

        <Button color="primary" variant="contained" fullWidth type="submit">
          Sign Up
        </Button>
      </form>
    </Box>
  );
};
