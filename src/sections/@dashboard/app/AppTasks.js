import PropTypes from 'prop-types';
import { useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// @mui
import { Card, Stack, Divider, Checkbox, MenuItem, IconButton, CardHeader, FormControlLabel } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/MenuPopover';

// ----------------------------------------------------------------------

AppTasks.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppTasks({ title, subheader, list, ...other }) {
  const formik = useFormik({
    initialValues: {
      checked: false
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { values, handleSubmit } = formik;

  return (
    <Card {...other} sx = {{ width : 300, height : 400}}>
      <CardHeader title='챙겨드셨나요?' subheader={subheader} />

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          {list.map((task) => (
            <TaskItem key={task.id} task={task} formik={formik} />
          ))}
        </Form>
      </FormikProvider>
    </Card>
  );
}

// ----------------------------------------------------------------------

TaskItem.propTypes = {
  formik: PropTypes.object,
  checked: PropTypes.bool,
  task: PropTypes.object,
};

function TaskItem({ formik, task, checked, ...other }) {
  const { getFieldProps } = formik;

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleMarkComplete = () => {
    handleCloseMenu();
    console.log('MARK COMPLETE', task);
  };

  const handleShare = () => {
    handleCloseMenu();
    console.log('SHARE', task);
  };

  const handleEdit = () => {
    handleCloseMenu();
    console.log('EDIT', task);
  };

  const handleDelete = () => {
    handleCloseMenu();
    console.log('DELETE', task);
  };

  return (
    <Stack
      direction="row"
      sx={{
        px: 2,
        py: 0.75,
        ...(checked && {
          color: 'text.disabled',
          textDecoration: 'line-through',
        }),
      }}
    >
      <FormControlLabel
        control={<Checkbox {...getFieldProps('checked')} value={task.id} checked={checked} {...other} />}
        label={task.label}
        sx={{ flexGrow: 1, m: 0 }}
      />
    </Stack>
  );
}
