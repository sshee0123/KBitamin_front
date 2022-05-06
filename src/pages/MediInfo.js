import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
import { LoadingButton } from '@mui/lab';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import LaptopIcon from '@material-ui/icons/Laptop';
import TvIcon from '@material-ui/icons/Tv';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import MEDICINELIST from '../_mock/medicine';

// MediService
import MediService from '../service/MedicineService';
// import { id } from 'date-fns/locale';
import './MediInfo.css';
import circle from './Images/circle.png';
import diamond from './Images/diamond.png';
import fillcolor from './Images/fillcolor.png';
import halfcircle from './Images/halfcircle.png';
import hexa from './Images/hexa.png';
import jangbang from './Images/jangbang.png';
import jeongjae from './Images/jeongjae.png';
import kyungjil from './Images/kyungjil.png';
import minus from './Images/minus.png';
import nothing from './Images/nothing.png';
import othershape from './Images/othershape.png';
import oval from './Images/oval.png';
import penta from './Images/penta.png';
import plusplus from './Images/plusplus.png';
import square from './Images/square.png';
import triangle from './Images/triangle.png';
import yeonjil from './Images/yeonjil.png';
import brown from './color/brown.png';
import green from './color/green.png';
import lightgreen from './color/lightgreen.png';
import orange from './color/orange.png';
import pink from './color/pink.png';
import red from './color/red.png';
import teal from './color/teal.png';
import white from './color/white.png'
import yellow from './color/yellow.png';




// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'medicineName', label: '의약품', alignRight: false },
  { id: 'shape', label: '외형정보', alignRight: false },
  { id: 'efficacy', label: '효능', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.medicineName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function MediInfo() {

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('medicineName');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);


  // ------<약 정보 가져오기> 랜더링 될 때 한 번만 실행--------

  const [inputData, setInputData] = useState([{
    name: '',
    shape: '',
    efficacy: ''
  }])

  useEffect(() => {
    MediService.getAllMedicineInfo().then((res) => {
      // const medicines = [...Array(24)].map((_, index) => ({
      //   id:0,
      //   medicineName:res.name

      //   }));
      console.log(res.data) // String
      console.log('JSON : ', JSON.stringify(res.data));
      console.log('efficacy : ', res.data.efficacy);
    });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = MEDICINELIST.map((n) => n.medicineName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleCellClick = (event) => {
    console.log("cell clicked")
  }

  // Toggle function
  const useStyles = makeStyles((theme) => ({
    toggleContainer: {
      margin: theme.spacing(2, 0),
    },
  }));

  const [alignment, setAlignment] = useState('left');
  const [formats, setFormats] = useState(() => ['phone']);

  const handleFormat = (event, newFormats) => {
    console.log(newFormats);
    if (newFormats.length) {
      setFormats(newFormats);
    }
  };

  const handleAlignment = (event, newAlignment) => {
    console.log(newAlignment);
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const classes = useStyles();

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - MEDICINELIST.length) : 0;

  const filteredUsers = applySortFilter(MEDICINELIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="MediInfo">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Medicine Information
          </Typography>

        </Stack>

        {/* <Grid container direction="column" spacing={2}>
      <Grid item sm={10} md={6}>
        <div className={classes.toggleContainer}>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="all" aria-label="left aligned">
            <Avatar src={'/static/mock-images/avatars/avatar_default.jpg'} alt="photoURL" />
            </ToggleButton>
            <ToggleButton value="yellow" aria-label="centered">
            <Avatar sx={{ bgcolor: yellow[500], fontSize: "0.8rem"}}>노랑</Avatar>
            </ToggleButton>
            <ToggleButton value="orange" aria-label="centered">
            <Avatar sx={{ bgcolor: deepOrange[500], fontSize: "0.8rem"}}>주황</Avatar>
            </ToggleButton>
            <ToggleButton value="pink" aria-label="centered">
            <Avatar sx={{ bgcolor: pink[200], fontSize: "0.8rem"}}>분홍</Avatar>
            </ToggleButton>
            <ToggleButton value="red" aria-label="centered">
            <Avatar sx={{ bgcolor: red[500], fontSize: "0.8rem"}}>빨강</Avatar>
            </ToggleButton>
            <ToggleButton value="green" aria-label="right aligned">
            <Avatar sx={{ bgcolor: green[500] , fontSize: "0.8rem"}}>초록</Avatar>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Grid>
      
      <Grid item sm={12} md={6}>
        <div className={classes.toggleContainer}>
          <ToggleButtonGroup value={formats} onChange={handleFormat} aria-label="device">
            <ToggleButton value="laptop" aria-label="laptop">
              <LaptopIcon />
            </ToggleButton>
            <ToggleButton value="tv" aria-label="tv">
              <TvIcon />
            </ToggleButton>
            <ToggleButton value="phone" aria-label="phone">
              <PhoneAndroidIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Grid>
    </Grid> */}


        {/* Medicine 검색 조건 */}
        <Card id='cardInMediInfo'>

          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          </Stack>
          <ButtonGroup className='buttonGroup'>
            <Stack direction="row" alignItems="center" mb={3} spacing={3}>
              <Button className='classify' style={{ color: '-moz-initial' }}>모양<br />전체</Button>

              <Button style={{ color: 'black' }}><img src={circle} /></Button>
              <Button style={{ color: 'black' }}><img src={oval} /></Button>
              <Button style={{ color: 'black' }}><img src={halfcircle} /></Button>
              <Button style={{ color: 'black' }}><img src={triangle} /></Button>
              <Button style={{ color: 'black' }}><img src={square} /></Button>
              <Button style={{ color: 'black' }}><img src={diamond} /></Button>
              <Button style={{ color: 'black' }}><img src={jangbang} /></Button>
              <Button style={{ color: 'black' }}><img src={penta} /></Button>
              <Button style={{ color: 'black' }}><img src={hexa} /></Button>
              {/* 모양 버튼 추가 - 추후 이쁘게 */}


            </Stack>
          </ButtonGroup>
          <ButtonGroup className='buttonGroup' >
            <Stack direction="row" alignItems="center" mb={3} spacing={3}>
              <Button className='classify' style={{ color: '-moz-initial' }}>색상<br />전체</Button>

              <Button style={{ color: 'black' }}><img className='colorbtn' src={white} /></Button>
              
              <Button style={{ color: 'black' }}><img className='colorbtn' src={yellow} /></Button>
              <Button style={{ color: 'black' }}><img className='colorbtn' src={orange} /></Button>
              <Button style={{ color: 'black' }}><img className='colorbtn' src={pink} /></Button>
              <Button style={{ color: 'black' }}><img className='colorbtn' src={red} /></Button>
              <Button style={{ color: 'black' }}><img className='colorbtn' backgroundColor='brown' src={brown} /></Button>
              <Button style={{ color: 'black' }}><img className='colorbtn' src={lightgreen} /></Button>
              <Button style={{ color: 'black' }}><img className='colorbtn' src={green} /></Button>
              <Button style={{ color: 'black' }}><img className='colorbtn' src={teal} /></Button>

              {/* 색상 버튼 추가 - 추후 이쁘게 */}


            </Stack>
          </ButtonGroup>
          <ButtonGroup className='buttonGroup'>
            <Stack direction="row" alignItems="center" mb={3} spacing={3}>
              <Button className='classify' style={{ color: '-moz-initial' }}>제형<br />전체</Button>

              <Button style={{ color: 'black' }}><img src={jeongjae} /></Button>
              <Button style={{ color: 'black' }}><img src={kyungjil} /></Button>
              <Button style={{ color: 'black' }}><img src={yeonjil} /></Button>

              {/* 제형 버튼 추가 - 추후 이쁘게 */}

            </Stack>
          </ButtonGroup>
          <p />

          <ButtonGroup className='buttonGroup' variant="outlined" aria-label="outlined button group">
            <Stack direction="row" alignItems="center" mb={3} spacing={3}>
              <Button className='classify' style={{ color: '-moz-initial' }}>분할선<br />전체</Button>


              <Button style={{ color: 'black' }}><img src={nothing} /></Button>
              <Button style={{ color: 'black' }}><img src={minus} /></Button>
              <Button style={{ color: 'black' }}><img src={plusplus} /></Button>
              <Button style={{ color: 'black' }}><img src={othershape} /></Button>
              {/* 분할선 버튼 추가 - 추후 이쁘게 */}


            </Stack>
          </ButtonGroup>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table onCellClick={handleCellClick}>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={MEDICINELIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    // const { id, name, role, avatarUrl, isVerified } = row;
                    const { medicineName, shape, efficacy } = row;
                    const isItemSelected = selected.indexOf(medicineName) !== -1;

                    return (
                      <TableRow
                        hover
                        key={medicineName}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        // 해야함
                        aria-checked={isItemSelected}
                      >
                        <TableCell> </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* <Avatar alt={medicine_name} src={} /> */}
                            {/* 여기 Avatar src에 이미지url 들어가야함. */}
                            <Typography variant="subtitle2" noWrap>
                              {medicineName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{shape}</TableCell>
                        <TableCell align="left">{efficacy}</TableCell>

                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={MEDICINELIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}