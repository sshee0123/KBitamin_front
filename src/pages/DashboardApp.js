import ReactDOM from 'react-dom';
import ReactApexChart from 'react-apexcharts'
import { faker } from '@faker-js/faker';
import React, { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// mocks_
import account from '../_mock/account';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
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
  ApexChart
} from '../sections/@dashboard/app';
// MediService
import MediService from '../service/MedicineService';
import MemberService from '../service/MemberService';
import CalendarService from '../service/CalendarService';
import DashboardService from '../service/DashboardService';

// ----------------------------------------------------------------------

export default function Calendar() {
  const theme = useTheme();

        // ------<약 정보 가져오기> 랜더링 될 때 한 번만 실행--------

        const [takingMedicines, setTakingMedicines] = useState([]);
        // 약 리스트 개수
        const [takingMedicineCnt, setTakingMedicineCnt] = useState(0);
    
        // 비동기 처리로 다시 약 정보 가져오기
        const fetchMediFunc = async () => {
          await CalendarService.getTakingPerUser(MemberService.getCurrentUser().id).then((res) => {
            setTakingMedicineCnt(takingMedicineCnt+1);
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
      
        useEffect(() => {
          // fetchMediFunc();
          recommendMediFunc();
        },[]);

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

          <Grid item xs={12} md={6} lg={6}>
            <AppTasks
              title="챙겨드셨나요?"
                
              list={[
                { id: '1', label: '가나릴정(이토프리드염산염)' },
                { id: '2', label: '가나슨캡슐' },
                { id: '3', label: '가로틴캡슐100밀리그램(가바펜틴)' },
                { id: '4', label: '힙스브이파워정' },
                { id: '5', label: '휴니즈트라셋정' },
                { id: '6', label: '다펜-큐연질캡슐(이부프로펜)' },
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="방문자 수"
              subheader="전일대비 증감 (+5%)"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid> */}
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
          
          {/* 멋진 차트 */}
          <Grid  id = 'app' item xs={12} md={12} lg={12}>
            <ApexChart />
          </Grid>
        

          {<Grid item xs={12} md={6} lg={6}>
            <AppNewsUpdate
              title="부작용 있는 약"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
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

          <Grid item xs={12} md={6} lg={6}>
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

          {/* <Grid item xs={12} md={6} lg={12}>
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
          </Grid> */}

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