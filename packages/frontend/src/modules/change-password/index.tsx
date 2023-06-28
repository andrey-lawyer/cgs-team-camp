import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { useMutationUserChangePassword } from '../hooks/use.mutation.user.change.password';
import { schemaUserLogin } from '../services/validation';
import { useNavigate } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import { notify } from '../services/toast';
import { Loader } from '../common/components/loader';

const ChangePasswordContainer = () => {
  const navigate = useNavigate();
  const {
    mutation: { mutate, data, isLoading, isError }
  } = useMutationUserChangePassword();

  if (data) {
    navigate(APP_KEYS.ROUTER_KEYS.VERIFICATION);
  }
  if (isError) notify();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: schemaUserLogin,
    onSubmit: (values) => {
      mutate(values);
    }
  });
  return (
    <Box p="20px" mt="15x">
      {isLoading && <Loader />}
      <Box textAlign={'center'} mb="10px">
        <Typography variant="h4" component="h1">
          Please fill out this form to change your password
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

        <Button color="primary" variant="contained" fullWidth type="submit">
          Send
        </Button>
      </form>
    </Box>
  );
};

export default ChangePasswordContainer;
