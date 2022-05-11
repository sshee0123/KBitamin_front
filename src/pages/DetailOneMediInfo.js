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
import Modal from '@mui/material/Modal';
// MediService
import MediService from '../service/MedicineService';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
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
            { state } DetailOneMediInfo
            </Typography>

            </Stack>


          <Stack direction="row" alignItems="center" mb={5}>
            <img alt = {medicine.name} src = {medicine.imageUrl} height = "300px" widtn = "400px"/>
            </Stack>

            <Stack alignItems="left" mb={5}>
            <h3>제품명</h3>
            <div>{medicine.name}</div>
            <h3>제형</h3>
            <div>{medicine.formulation}</div>
            <h3>모양</h3>
            <div>{medicine.shape}</div>
            <h3>제조업체</h3>
            <div>{medicine.manufacturer}</div>
            <h3>유효성분</h3>
            <div>{medicine.ingredient}</div>
            <h3>효능</h3>
            <div>{medicine.efficacy}</div>
            <h3>색상</h3>
            <div>{medicine.color}</div>
            <h3>분할선</h3>
            <div>{medicine.divideLine}</div>

            <h3>usage</h3>
            <div>{medicine.usage}</div>

            <h3>caution</h3>
            <div>{medicine.caution}</div>


            </Stack>




    
        </Container>
        </Page>


    );



}

