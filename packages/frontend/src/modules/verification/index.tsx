import { Box, Button, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import { useFormik } from 'formik';
import { schemaOnlyPassword } from '../services/validation';
import { useMutationVerificationPassword } from '../hooks/use.mutation.user.verification.password';
import { notify } from '../services/toast';
import { Loader } from '../common/components/loader';

const VerificationContainer = () => {
  const { verificationToken } = useParams();
  if (!verificationToken) return <div>is loading...</div>;

  const navigate = useNavigate();

  const {
    mutation: { mutate, data, isLoading, isError }
  } = useMutationVerificationPassword(verificationToken);

  if (data) {
    navigate(APP_KEYS.ROUTER_KEYS.TODOS);
  }
  if (isError) notify();

  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validationSchema: schemaOnlyPassword,
    onSubmit: (values) => {
      mutate({ password: values.password });
    }
  });
  return (
    <Box p="20px" mt="15x">
      {isLoading && <Loader />}
      <Box textAlign={'center'} mb="10px">
        <Typography variant="h4" component="h1">
          Verification page
        </Typography>
      </Box>
      <Box textAlign={'center'} mb="10px">
        <Typography variant="h6" component="h2">
          Enter new password
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
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

export default VerificationContainer;
