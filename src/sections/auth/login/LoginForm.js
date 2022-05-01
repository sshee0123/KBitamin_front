import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton, Alert, AlertTitle } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import MemberService from '../../../service/MemberService';

// mocks_
import account from '../../../_mock/account';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    id: Yup.string().required('Id is required'),
    password: Yup.string().required('Password is required'),
  });

  const [valueState, setValueState] = useState({ id: "", password: "", loading: false, message: ""});

  const formik = useFormik({
    initialValues: {
      id: '',
      password: '',
      remember: true,
      loading: false,
      message: ""
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      // navigate('/dashboard', { replace: true });
      MemberService.login(formik.values.id, formik.values.password).then(() => {
        // window.location.href = "/main-board";
        // 로그인 정보 저장
        handleUserMock();
        window.location.href = "/dashboard/app";
    },
    error => { const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      console.log('로그인 오류!');
      window.location.reload();
      
    });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
    
  };

  const handleUserMock = () => {
    alert(MemberService.getCurrentUser().id);
    account.displayName=MemberService.getCurrentUser().id;
    account.email=MemberService.getCurrentUser().email;
    console.log(MemberService.getCurrentUser().id);
    console.log(MemberService.getCurrentUser().email);    
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="Id"
            type="text"
            label="Id"
            value={formik.values.Id}
            {...getFieldProps('id')}
            error={Boolean(touched.id && errors.id)}
            helperText={touched.id && errors.id}
          />

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
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
