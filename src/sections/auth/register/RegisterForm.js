import * as Yup from 'yup';
import React, { useState, Component } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// 라디오 버튼
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
// // --- Material Ui Imports --- //
import { Typography, Container, Button, Box } from '@material-ui/core';
// --- Material Ui Picker Imports --- //
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
// component
import Iconify from '../../../components/Iconify';
import MemberService from '../../../service/MemberService';
// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    Id: Yup.string().min(5, 'Too Short!').max(20, 'Too Long!').required('name required'),
    Name: Yup.string().min(3, 'Too Short!').max(20, 'Too Long!').required('name required'),
    birth: Yup.date(),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().min(6, 'Too Short!').required('Password is required'),
  });
  const [values, setValues] = useState({ Id: '', Name: '', email: '', password: '', sex: '' });

  const formik = useFormik({
    initialValues: {
      Id: '',
      Name: '',
      email: '',
      password: '',
      sex: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard/app', { replace: true });
      console.log('성별 뭐야 ? ',formik.values.sex);
      // 함수 인자 참고 register(id, email, password, username, birthDate, phone, sex), 폰 추후 없애야함
      MemberService.register(formik.values.Id,formik.values.email, formik.values.password, formik.values.Name, new Date("1999-11-06")
      , "010-0000-0000", 'F'
      );
    },
  });
  // 남, 녀 선택 위한 코드 currencies
  const currencies = [
    {
      value: 'M',
      label: 'Male',
    },
    {
      value: 'F',
      label: 'Female',
    },
  ];

  {/*
  남, 녀 선택 위한 코드 currencies
  const currencies = [
    {
      value: 'M',
      label: 'Male',
    },
    {
      value: 'F',
      label: 'Female',
    },
    {
      value: 'N',
      label: 'Secret',
    }
  ];
*/}
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

  // 남, 녀 선택 위한 코드 이하 5줄
  const [currency, setCurrency] = React.useState('M');
  // const handleChange = (event) => {
  //   setValues(event.target.value);
  // };

  const handleSexChange = (event) => {
    setValues({sex:event.target.value});
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}> */}

          {/* id */}
          <TextField
              fullWidth
              label="id"
              value={formik.values.Id}
              {...getFieldProps('Id')}
              error={Boolean(touched.Id && errors.Id)}
              helperText={touched.Id && errors.Id}
            />

          {/* password */}
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            value={formik.values.password}
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          {/* name 성명 */}
            <TextField
              fullWidth
              label="name"
              value={formik.values.Name}
              {...getFieldProps('Name')}
              error={Boolean(touched.Name && errors.Name)}
              helperText={touched.Name && errors.Name}
            />

          {/* email address */}
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            value={formik.values.email}
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
            {/* 성별 선택 UI */}
            <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-select-currency"
              select
              // label="Select"
              label="sex"
              // value={currency}
              value={formik.values.sex}
              onChange={handleSexChange}
              helperText="Please select your gender"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup aria-label="sex" name="gender1" 
              value={formik.values.sex}
              {...getFieldProps('sex')} 
              onChange={handleChange}>
                <FormControlLabel value="X" control={<Radio />} label="Female" />
                <FormControlLabel value="Y" control={<Radio />} label="Male" />
              </RadioGroup>
          
          </FormControl> */}
          {/* <TextField>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">성별</FormLabel>
              <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>
          </TextField> */}

          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              label="Material Date Picker"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider> */}

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
