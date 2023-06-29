import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { schemaOnlyEmail } from '../services/validation';
import { useMutationUserForgotPassword } from '../hooks/use.mutation.user.forgot.password';
import { useNavigate } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import { notify } from '../services/toast';
import { Loader } from '../common/components/loader';

const ForgetPasswordContainer = () => {
  const navigate = useNavigate();
  const {
    mutation: { mutate, data, isLoading, isError }
  } = useMutationUserForgotPassword();
  if (data) {
    navigate(APP_KEYS.ROUTER_KEYS.VERIFICATION);
  }
  if (isError) notify();
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: schemaOnlyEmail,
    onSubmit: (values) => {
      mutate({ email: values.email });
    }
  });
  return (
    <Box p="20px" mt="15x">
      {isLoading && <Loader />}
      <Box textAlign={'center'} mb="10px">
        <Typography variant="h4" component="h1">
          Have you forgotten your password?
        </Typography>
      </Box>
      <Box textAlign={'center'} mb="10px">
        <Typography variant="h4" component="h2">
          Enter your email
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

        <Button color="primary" variant="contained" fullWidth type="submit">
          Send
        </Button>
      </form>
    </Box>
  );
};

export default ForgetPasswordContainer;
