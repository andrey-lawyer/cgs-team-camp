import React, { FC } from 'react';
import { Button, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useFormik } from 'formik';
import { schemaSearch } from '../../../services/validation';
import TextField from '@material-ui/core/TextField';
import { Box, Typography } from '@material-ui/core';
import { ISearchProps } from '../../types/props.types';
import { APP_KEYS } from '../../consts';
import { initialValueSearch } from '../../../variables/initial.variables';

export const SearchForm: FC<ISearchProps> = ({ setQueryString }) => {
  const formik = useFormik({
    initialValues: initialValueSearch,
    validationSchema: schemaSearch,
    onSubmit: (values) => {
      const queryString = `${APP_KEYS.QUERY_KEYS.TODOS}?search=${values.title}&status=${values.complete}&access=${values.access}`;
      setQueryString(queryString);
      values.complete = '';
      values.access = '';
      values.title = '';
    }
  });
  return (
    <>
      <Box border="1px solid blue" p="10px" mt="10px" textAlign={'center'}>
        <Typography variant="inherit" component="h2">
          Todo search form
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box border="1px solid" mb="10px" p="5px">
            <TextField
              fullWidth
              id="title"
              name="title"
              label="title"
              type="text"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Box>
          <Box display={'flex'} justifyContent={'space-evenly'} mb="10px" mt="10px">
            <RadioGroup
              onChange={formik.handleChange}
              name="complete"
              value={formik.values.complete}
            >
              <Box border="1px solid" mb="5px" p="5px" pl="15px" textAlign={'center'}>
                <Typography variant="inherit" component="p">
                  Complete
                </Typography>

                <FormControlLabel value="done" control={<Radio size="small" />} label="Done" />
                <FormControlLabel
                  value="in_progress"
                  control={<Radio size="small" />}
                  label="In progress"
                />
              </Box>
            </RadioGroup>

            <RadioGroup onChange={formik.handleChange} name="access" value={formik.values.access}>
              <Box border="1px solid" mb="5px" p="5px" pl="15px" textAlign={'center'}>
                <Typography variant="inherit" component="p">
                  Access
                </Typography>
                <FormControlLabel
                  value="private"
                  control={<Radio size="small" />}
                  label="Private"
                />
                <FormControlLabel value="public" control={<Radio size="small" />} label="Public" />
              </Box>
            </RadioGroup>
          </Box>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Search
          </Button>
        </form>
      </Box>
    </>
  );
};
