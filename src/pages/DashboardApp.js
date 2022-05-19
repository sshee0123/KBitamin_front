import ReactDOM from 'react-dom';
import ReactApexChart from 'react-apexcharts'
import { faker } from '@faker-js/faker';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// @mui
import { useTheme } from '@mui/material/styles';
import { 
  Grid, 
  Container, 
  Typography, 
  Button, 
  Card,
  Table,
  Stack,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  CardHeader,
  FormControlLabel
} from '@mui/material';
// navigate
import { useNavigate } from 'react-router-dom';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu, Selectbox } from '../sections/@dashboard/user';
// sections 
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
  ApexChart,
  Spline,
  LineChart
} from '../sections/@dashboard/app';
// Service
import MediService from '../service/MedicineService';
import MemberService from '../service/MemberService';
import CalendarService from '../service/CalendarService';
import DashboardService from '../service/DashboardService';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: '의약품', alignRight: false },
  { id: 'sideEffect_name', label: '부작용', alignRight: false },
  { id: '' },
];

export default function Calendar() {
  const theme = useTheme();

  const navigate = useNavigate();

  // ------<약 정보 가져오기> 랜더링 될 때 한 번만 실행--------

  const [takingMedicines, setTakingMedicines] = useState([]);
  // 약 리스트 개수
  const [takingMedicineCnt, setTakingMedicineCnt] = useState(0);
  
  // 부작용 있는 약 배열
  const [sideEffectMedicines, setSideEffectMedicines] = useState([]);  
  // 부작용 있는 약 개수
  const [sideEffectMedicineCnt, setSideEffectMedicineCnt] = useState(0);

  // 피해야 할 약 배열
  const [avoidMedicines, setAvoidMedicines] = useState([]);

  // 비동기 처리로 다시 약 정보 가져오기
  const fetchMediFunc = async () => {
    await CalendarService.getTakingPerUser(MemberService.getCurrentUser().id).then((res) => {
      setTakingMedicineCnt(takingMedicineCnt + 1);
      setTakingMedicines(res.data);
      return res.data;
    })
  };
  
  // 피해야 할 약 리스트
  const recommendMediFunc = async () => {
    await DashboardService.getRecommendMedi(MemberService.getCurrentUser().id).then((res) => {
      console.log('recommendMediFunc', res);
      setAvoidMedicines(res);
      return res;
    })
  };
  // 부작용 있는 약
  const sideEffectMediFunc = async () => {
    await DashboardService.getSideEffectMediPerUser(MemberService.getCurrentUser().id).then((res) => {
      setSideEffectMedicineCnt(sideEffectMedicineCnt + 1);
      console.log("부작용 발생한 약" , sideEffectMedicineCnt)
      setSideEffectMedicines(res.data);
      return res.data;
    })
  }

  useEffect(() => {
    recommendMediFunc();
    fetchMediFunc();
    sideEffectMediFunc();

  }, []);


  const medicine = [];
  const thisdate = new Date();
  for (let i = 0; i < takingMedicines.length; i += 1) {
    takingMedicines[i][1].toString();
    takingMedicines[i][2].toString();
    const stdate = takingMedicines[i][1].split('T')
    const endate = takingMedicines[i][2].split('T')
    const compareStdate = new Date(stdate[0])
    const compareEndate = new Date(endate[0])

    if (thisdate >= compareStdate && thisdate <= compareEndate) {
      takingMedicines[i][3] = 'Yes'
    }
    else {
      takingMedicines[i][3] = 'No'
    }
    if (takingMedicines[i][3] == 'Yes'){
      medicine.push({
        id: i + 1,
        label: takingMedicines[i][0],
      })
    }
  }


  return (
    <Page title="Calendar">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome K-Bitamin
        </Typography>

        <Grid container spacing={3}>

{/* 4가지 카드 */}

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="복용 일수" total={1} color="info" icon={'ant-design:calendar-outlined'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="오늘 복용할 약" total={5} icon={'icon-park-outline:medicine-bottle'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="남은 복용 일수" total={5} color="warning" icon={'ant-design:calendar-outlined'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="부작용이 발생한 약" total={6} color="error" icon={'jam:triangle-danger'} />
          </Grid>

{/* 부작용이 있는 약 대시보드 */}
{<Grid item xs={12} md={6} lg={6}>
            <Card>
            <CardHeader title= "부작용이 있는 약"/>
            &nbsp;
            <TableContainer>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                />
                <TableBody>
                  {sideEffectMedicines.map((sideEffectMedi) => {
                    /* eslint-disable camelcase */
                    const { title, sideEffect_name} = sideEffectMedi;

                    return (
                      <TableRow
                        hover
                        key = {title}
                        tabIndex={-1}
                        role="checkbox"
                      >
                        <TableCell>   </TableCell>
                        <TableCell component="th" scope="row" padding="none" 
                        
                        onClick={() => {
                          // 약 상세 페이지로 push
                          navigate(`/dashboard/medicine/detailOneMediInfo`,
                              {state: title}
                          )
                      }}
                      >

                      <Typography variant="subtitle2" noWrap>
                        {title}
                      </Typography>
                        </TableCell>

                        <TableCell align="left">
                        <Typography variant="subtitle2" noWrap>
                          {sideEffect_name}
                          </Typography>
                          </TableCell>

                      </TableRow>
                    );
                  })}
                </TableBody>

              </Table>
              </TableContainer>
              </Card>
            </Grid>
            }

          {/* 챙겨드셨나요? 대시보드 */}
          <Grid className='first' item xs={12} md={6} lg={6}>
            <AppTasks
              list=
              {medicine}
            />

          </Grid>


        {/* 첫 번째 대시보드 그래프 */}
        <Grid id='app' item xs={12} md={15} lg={15}>
            <LineChart avoidMedicines={avoidMedicines}/>
          </Grid>


            {/* 각 나이별 진료 횟수 통계 그래프 */}
            <Grid id='app' item xs={12} md={15} lg={15}>
            <Spline />
          </Grid>

              {/* 최근 이 약을 많이 먹어요 대시보드 */}
              <Grid item xs={12} md={15} lg={15}>
            <AppConversionRates
              title="최근 이 약을 많이 먹어요"
              // subheader="(+43%) than last year"
              chartData={[
                { label: '경동니자티딘', value: 40 },
                { label: '벤포큐정', value: 43 },
                { label: '지니펜정', value: 48 },
                { label: '펜제로정', value: 47 },
                { label: '유디스캡슐', value: 54 },
                { label: '가비스정', value: 58 },
                { label: '테라빅정', value: 69 },
                { label: '위펜스정', value: 110 },
                { label: '비타콤보정', value: 120 },
                { label: '아노덱스골드정', value: 138 },
              ]}
            />

          </Grid>

         {/* 연령층별 특정 질병 보유 통계 그래프 */}
         <Grid id='app' item xs={12} md={15} lg={15}>
            <ApexChart style={{ height: 500 }} />
          </Grid>

            </Grid>


      </Container>
    </Page>
  );
}

TaskItem.propTypes = {
  formik: PropTypes.object,
  checked: PropTypes.bool,
  task: PropTypes.object,
};

function TaskItem({ formik, task, checked, ...other }) {
  const { getFieldProps } = formik;

  const [open, setOpen] = useState(null);

  const handleCloseMenu = () => {
    setOpen(null);
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