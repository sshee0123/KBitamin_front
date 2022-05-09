import * as Yup from 'yup';
import React, { useState, Component, useEffect} from 'react';
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

// datapicker
import isWeekend from 'date-fns/isWeekend';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

// // --- Material Ui Imports --- //
import { Typography, Container, Button, Box } from '@material-ui/core';
// --- Material Ui Picker Imports --- //
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
// component
import Iconify from '../../../components/Iconify';
import MemberService from '../../../service/MemberService';
import UserService from '../../../service/UserService';
// mocks_
import account from '../../../_mock/account';
// ----------------------------------------------------------------------

export default function ProfileForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const ProfileSchema = Yup.object().shape({
    Id: Yup.string().min(5, 'Too Short!').max(20, 'Too Long!').required('name required'),
    Name: Yup.string().min(3, 'Too Short!').max(20, 'Too Long!').required('name required'),
    birth: Yup.date(),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().min(6, 'Too Short!').required('Password is required'),
  });
  const [values, setValues] = useState({ Id: '', Name: '', email: '', password: '', sex: '', loading: false, message: "", successful: false });


  const history = useNavigate();
  const formik = useFormik({
    
    initialValues: {
      Id: '',
      Name: '',
      email: '',
      password: '',
      birthDate: "",
      sex: '',
    },
    validationSchema: ProfileSchema,
    onSubmit: () => {
      const user = {
        username: formik.values.Name,
        email: formik.values.email,
        password: formik.values.password,
        sex: formik.values.sex,
        birthDate: formik.values.birthDate
      };
      console.log(user.username, user.email, user.sex);
      // 함수 인자 참고 register(id, email, password, username, birthDate, phone, sex), 폰 추후 없애야함
      UserService.updateUserInfo(formik.values.Id,user).then( response => {
        // history.push({
        // pathname: "/set_account",
        //  state: { message: response.data.message, successful: true }
        // })

        MemberService.logout();

        handleUserMock();
        
        alert('회원정보 수정완료');
    }, 
    error =>{
        alert('회원정보 수정 오류!');
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        // history.push({
        // pathname: "/set_account",
        // state: { message: resMessage, successful: false }
        // })
      }
    );

    navigate('/dashboard/app', { replace: true });

    },

  });

  const handleUserMock = () => {
    account.email=formik.values.email;
    console.log('account.email', account.email);  
    console.log('formik.values.email', formik.values.email);  
    
  };
  useEffect(() => {
    UserService.getUserInfo(MemberService.getCurrentUser().id).then((res) => {
      formik.values.Id = res.data.id;
      formik.values.email = res.data.email;
      formik.values.Name = res.data.username;
      formik.values.sex = res.data.sex;
      formik.values.birthDate = res.data.birthDate;
      
      // var bir = res.data.birthDate.split("-");
      // this.setState({birY: bir[0], birM: bir[1], birD: bir[2]});
    }); 
  }, []);
  


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

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

  // 남, 녀 선택 위한 코드 이하 4줄
  const handleSexChange = (event) => {
    formik.values.sex = event.target.value;
    setValues({sex:event.target.value});
  };
    
  // Datepicker 코드 
  const [value, setValue] = React.useState(new Date());

  const handleBirthChange = (newValue) => {
    setValue(newValue);
    formik.values.birthDate = newValue;
  };
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}> */}

          {/* id */}
          <TextField
              fullWidth
              label="Id"
              value={formik.values.Id}
              {...getFieldProps('Id')}
              InputProps={{
                readOnly: true,
              }}
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
            <Stack className='gdBr'>
            <TextField
              id="outlined-select-currency"
              select
              // label="Select"
              label="Gender"
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

          <LocalizationProvider dateAdapter={AdapterDateFns}>

                <DesktopDatePicker
                  id='datepicker'
                  label="Birth"
                  inputFormat="MM/dd/yyyy"
                  value={formik.values.birthDate}
                  onChange={handleBirthChange}
                  renderInput={(params) => <TextField {...params} />}
                />

              </LocalizationProvider>
              </Stack>
          </Box>
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Update
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
