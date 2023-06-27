import React from 'react';
import { Button, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useFormik } from 'formik';
import { IModalProps } from '../../types/props.types';
import { ModalWindow } from './modal.form.styled';
import { schemaAdd, schemaUpdate } from '../../../services/validation';
import TextField from '@material-ui/core/TextField';
import { Box, Typography } from '@material-ui/core';
import { onSubmitUpdate } from '../../../services/submit-update';
import { onSubmitAdd } from '../../../services/submit-add';
import { useMutationUpdate } from '../../../hooks/use.mutation.update';
import { useMutationAdd } from '../../../hooks/use.mutation.add';

export const ModalForm = ({ onClose, todo, type }: IModalProps) => {
  const {
    mutation: { mutate }
  } = type === 'update' ? useMutationUpdate() : useMutationAdd();

  const nameButton = type === 'update' ? 'Update' : 'Add';
  const completed = todo?.complete ? 'done' : 'in progress';
  const schema = type === 'update' ? schemaUpdate : schemaAdd;

  const formik = useFormik({
    initialValues: {
      title: todo ? todo.title : '',
      description: todo ? todo.description : '',
      access: todo ? todo.access : '',
      complete: todo ? completed : ''
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (type === 'update' && todo) {
        onSubmitUpdate(values, todo, onClose, mutate);
      } else onSubmitAdd(values, onClose, mutate);
    }
  });
  return (
    <ModalWindow>
      <form onSubmit={formik.handleSubmit}>
        <Box border="1px solid" mb="5px" p="5px">
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
        <Box border="1px solid" mb="5px" p="5px">
          <TextField
            fullWidth
            id="description"
            name="description"
            label="description"
            type="text"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
        </Box>
        <Box border="1px solid" mb="5px" p="5px">
          <RadioGroup onChange={formik.handleChange} name="complete" value={formik.values.complete}>
            <Typography variant="inherit" component="p">
              Complete
            </Typography>

            <FormControlLabel value="done" control={<Radio size="small" />} label="Done" />
            <FormControlLabel
              value="in progress"
              control={<Radio size="small" />}
              label="In progress"
            />
          </RadioGroup>
        </Box>
        <Box border="1px solid" mb="5px" p="5px">
          <RadioGroup onChange={formik.handleChange} name="access" value={formik.values.access}>
            <Typography variant="inherit" component="p">
              Access
            </Typography>
            <FormControlLabel value="private" control={<Radio size="small" />} label="Private" />
            <FormControlLabel value="public" control={<Radio size="small" />} label="Public" />
          </RadioGroup>
        </Box>

        <Button color="primary" variant="contained" fullWidth type="submit">
          {nameButton}
        </Button>
      </form>
    </ModalWindow>
  );
};
