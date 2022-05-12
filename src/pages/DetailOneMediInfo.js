import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box
} from '@mui/material';
// components
import Grid from '@material-ui/core/Grid';
// MediService
import MediService from '../service/MedicineService';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';

export default function DetailOneMediInfo(){

    // mediInfo 에서 보낸 props: name
    const { state } = useLocation();
    MediService.getMedicineByName(state);
    
    // ------<약 정보 가져오기> 랜더링 될 때 한 번만 실행--------

    const [medicine, setMedicine] = useState([]);

    // 비동기 처리로 다시 약 정보 가져오기
    const fetchMediFunc = async () => {
        await MediService.getMedicineByName(state).then((res) => {
            setMedicine(res.data);
            console.log(res.data);
            return res.data;
        })
    }

    useEffect(() => {
        fetchMediFunc()
    }, []);

    return(
        <Page title="DetailOneMediInfo">
        <Container>

          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
            { state }
            </Typography>

            </Stack>

          <Stack direction="row" alignItems="center" mb={5}>
            <img alt = {medicine.name} src = {medicine.imageUrl} height = "200px" widtn = "300px"/>
            </Stack>


            <Scrollbar>

            <Stack alignItems="left" mb={5}>
            
            <Typography variant="h5" gutterBottom>제품명</Typography>
            <Typography variant="subtitle1" gutterBottom>{medicine.name}</Typography>
            <Typography variant="h5" gutterBottom>제형</Typography>
            <Typography variant="subtitle1" gutterBottom>{medicine.formulation}</Typography>
            <Typography variant="h5" gutterBottom>모양</Typography>
            <Typography variant="subtitle1" gutterBottom>{medicine.shape}</Typography>
            <Typography variant="h5" gutterBottom>제조업체</Typography>
            <Typography variant="subtitle1" gutterBottom>{medicine.manufacturer}</Typography>
            <Typography variant="h5" gutterBottom>유효성분</Typography>
            <Typography variant="subtitle1" gutterBottom>{medicine.ingredient}</Typography>
            <Typography variant="h5" gutterBottom>색상</Typography>
            <Typography variant="subtitle1" gutterBottom>{medicine.color}</Typography>
            <Typography variant="h5" gutterBottom>분할선</Typography>
            <Typography variant="subtitle1" gutterBottom>{medicine.divideLine}</Typography>
            <Typography variant="h5" gutterBottom>용법</Typography>
            <Typography variant="subtitle1" gutterBottom>{medicine.usage}</Typography>
            <Typography variant="h5" gutterBottom>효능</Typography>
            <Typography variant="subtitle1" gutterBottom>{medicine.efficacy}</Typography>
            <Typography variant="h5" gutterBottom>주의사항</Typography>
            <Typography variant="subtitle1" gutterBottom>{medicine.caution}</Typography>

            </Stack>

            </Scrollbar>

        </Container>
        </Page>


    );



}

