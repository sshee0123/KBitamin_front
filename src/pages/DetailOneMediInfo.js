import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  CardHeader,
} from '@mui/material';
// components
import Grid from '@material-ui/core/Grid';
// MediService
import MediService from '../service/MedicineService';
import Page from '../components/Page';
import circle from "./Images/default_pill.png";


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

      // 약 이미지 없을 경우 defualt 이미지 sj
    const onErrorImg = (e) => {
      e.target.src = circle;
    }

    return(
        <Page title="DetailOneMediInfo">
        <Container>

          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
            { state }
            </Typography>

            </Stack>

            <Card>
            <CardHeader/>
            <TableContainer>
              <Table>
                <TableBody>

                  <TableRow>
                    <TableCell align='center' component="th" style={{minWidth:100, maxWidth:100}} >
                      <Typography variant="h5" gutterBottom>제품명</Typography>
                      </TableCell>
                    <TableCell>
                    <Typography variant="subtitle1" gutterBottom>{medicine.name}</Typography>
                    </TableCell>
                  </TableRow>

                <TableRow>
                    <TableCell align='center' component="th" style={{minWidth:100, maxWidth:100}}>
                      <Typography variant="h6" gutterBottom>이미지</Typography>
                      </TableCell>
                    <TableCell>
                    <img alt = {medicine.name} src = {medicine.imageUrl} onError={onErrorImg} height = "200px" width = "300px"/>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align='center' component="th" style={{minWidth:100, maxWidth:100}}>
                      <Typography variant="h6" gutterBottom>제형</Typography>
                      </TableCell>
                    <TableCell>
                    <Typography variant="subtitle1" gutterBottom>{medicine.formulation}</Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align='center' component="th" style={{minWidth:100, maxWidth:100}}>
                      <Typography variant="h6" gutterBottom>모양</Typography>
                      </TableCell>
                    <TableCell>
                    <Typography variant="subtitle1" gutterBottom>{medicine.shape}</Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align='center' component="th" style={{minWidth:100, maxWidth:100}}>
                      <Typography variant="h6" gutterBottom>제조업체</Typography>
                      </TableCell>
                    <TableCell>
                    <Typography variant="subtitle1" gutterBottom>{medicine.manufacturer}</Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align='center' component="th" style={{minWidth:100, maxWidth:100}}>
                      <Typography variant="h6" gutterBottom>유효성분</Typography>
                      </TableCell>
                    <TableCell>
                    <Typography variant="subtitle1" gutterBottom>{medicine.ingredient}</Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align='center' component="th" style={{minWidth:100, maxWidth:100}}>
                      <Typography variant="h6" gutterBottom>색상</Typography>
                      </TableCell>
                    <TableCell>
                    <Typography variant="subtitle1" gutterBottom>{medicine.color}</Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align='center' component="th" style={{minWidth:100, maxWidth:100}}>
                      <Typography variant="h6" gutterBottom>분할선</Typography>
                      </TableCell>
                    <TableCell>
                    <Typography variant="subtitle1" gutterBottom>{medicine.divideLine}</Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align='center' component="th" style={{minWidth:100, maxWidth:100}}>
                      <Typography variant="h6" gutterBottom>효능</Typography>
                      </TableCell>
                    <TableCell>
                    <Typography variant="subtitle1" gutterBottom>{medicine.efficacy}</Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align='center' component="th" style={{minWidth:100, maxWidth:100}}>
                      <Typography variant="h6" gutterBottom>용법</Typography>
                      </TableCell>
                    <TableCell>
                    <Typography variant="subtitle1" gutterBottom>{medicine.usage}</Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align='center' component="th" style={{minWidth:100, maxWidth:100}}>
                      <Typography variant="h6" gutterBottom>주의사항</Typography>
                      </TableCell>
                    <TableCell>
                    <Typography variant="subtitle1" gutterBottom>{medicine.caution}</Typography>
                    </TableCell>
                  </TableRow>
                   
                </TableBody>
              </Table>
              </TableContainer>
              </Card>

        </Container>
        </Page>


    );



}

