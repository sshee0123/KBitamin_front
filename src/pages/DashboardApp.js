import ReactDOM from 'react-dom';
import ReactApexChart from 'react-apexcharts'
import { faker } from '@faker-js/faker';
import React, { useState, useEffect } from 'react';
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
  CardHeader
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
// mocks_
import account from '../_mock/account';
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
  // { id: 'stDate', label: '복용 날짜', alignRight: false },
  // { id: 'enDate', label: '부작용', alignRight: false },
  // { id: 'status', label: '복용중', alignRight: false },
  // { id: 'sideEffectName', label: '부작용', alignRight: false },
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
      return res;
    })
  };

  // 부작용 있는 약
  const sideEffectMediFunc = async () => {
    await DashboardService.getSideEffectMediPerUser(MemberService.getCurrentUser().id).then((res) => {
      console.log('sideEffectMediFunc', res.data);
      setSideEffectMedicines(res.data);
      return res.data;
    })
  }


  useEffect(() => {
    fetchMediFunc();

    sideEffectMediFunc();

  }, []);


  const medicine = [];
  const thisdate = new Date();
  console.log(thisdate)
  for (let i = 0; i < takingMedicines.length; i += 1) {
    takingMedicines[i][1].toString();
    takingMedicines[i][2].toString();
    const stdate = takingMedicines[i][1].split('T')
    const endate = takingMedicines[i][2].split('T')
    const compareStdate = new Date(takingMedicines[i][1])
    const compareEndate = new Date(takingMedicines[i][2])

    if (thisdate >= compareStdate && thisdate <= compareEndate) {
      takingMedicines[i][3] = 'Yes'
    }
    else {
      takingMedicines[i][3] = 'No'
    }
    medicine.push({
      id: i,
      label: takingMedicines[i][0],
      start: stdate[0],
      end: endate[0],
      color: takingMedicines[i][3]
    })
  }

  console.log(medicine)
  useEffect(() => {
    // fetchMediFunc();
    recommendMediFunc();
  }, []);

  return (
    <Page title="Calendar">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome K-Bitamin
        </Typography>

        <Grid container spacing={3}>

          {/* 대시보드 페이지 맨 위 4가지 주석 */}

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="복용 일수" total={2} color="info" icon={'ant-design:calendar-outlined'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="오늘 복용할 약" total={6} icon={'icon-park-outline:medicine-bottle'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="남은 복용 일수" total={5} color="warning" icon={'ant-design:calendar-outlined'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="부작용이 발생한 약" total={3} color="error" icon={'jam:triangle-danger'} />
          </Grid>
          <Grid id='app' item xs={12} md={12} lg={4}>
            <LineChart />
          </Grid>
          <Grid id='app' item xs={12} md={12} lg={8}>
            <Spline />
          </Grid>
          {/* 멋진 차트 */}
          <Grid id='app' item xs={12} md={8} lg={8}>
            <ApexChart style={{ height: 500 }} />
          </Grid>

          <Grid className='first' item xs={12} md={4} lg={4}>
            {/* {
              medicine.map((med, index) => {
                <AppTasks list = {[ {id : index+1, label :  med[index]}]}/>
              })
            } */}
            <AppTasks
              list={[
                { id: '1', label: 'asdasd'},
                { id: '2', label: 'qweqwe' },
                { id: '3', label: '1234124'},
                { id: '4', label: '힙스브이파워정' },
                { id: '5', label: '휴니즈트라셋정' },

              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>

            <AppCurrentVisits
              title="이 약은 피하길"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.error.main,
                theme.palette.warning.main,
                theme.palette.text.secondary,
                theme.palette.text.disabled,
              ]}
            />
          </Grid>


          {<Grid item xs={12} md={6} lg={6}>

            {/* <AppNewsUpdate
              title="부작용 있는 약"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))
            } /> */}

            <Card>
            <CardHeader title= "부작용이 있는 약"/>
            &nbsp;
            <TableContainer sx={{ minWidth: 700 }}>
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

            </Grid>}
          

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="이 약은 피하세요!"
              chartData={[
                { label: 'America', value: 10 },
                { label: 'Asia', value: 5 },
                { label: 'Europe', value: 4 },
                { label: 'Africa', value: 2 },
              ]}
              chartColors={[
                theme.palette.error.main,
                theme.palette.warning.main,
                theme.palette.text.secondary,
                theme.palette.text.disabled,
              ]}
            />
          </Grid> */}

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="약을 먹은 기간"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="최근 이 약을 많이 먹어요"
              // subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid> */}


        </Grid>
      </Container>
    </Page>
  );
}