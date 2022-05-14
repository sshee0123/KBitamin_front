import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Dropdown, Input, setOptions } from '@mobiscroll/react';
import { styled } from '@mui/material/styles';
import { DateRangePicker, DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Box from '@mui/material/Box';
import { addDays } from "date-fns"
import Modal from '@mui/material/Modal';
import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu, Selectbox } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
// MediService
import MediService from '../service/MedicineService';
import MemberService from '../service/MemberService';
import CalendarService from '../service/CalendarService';
// import { id } from 'date-fns/esm/locale';
import Blog from './Blog';
// ----------------------------------------------------------------------
const currencies = [
  {
    value: 'EUR',
    label: 'Yes',
  },
  {
    value: 'USD',
    label: 'No',
  },

];

const options = ['없음', '어지러움', '두통', '권태감', '쇼크', '불면', '우울증', '흥분', '졸림', '빈맥', '혈압변화', '가슴 통증', '구토', '변비', '설사', '복통', '식욕부진', '위염', '발진', '두드러기', '부종', '탈모', '근육통', '관절통', '경련', '호흡곤란', '코피', '코막힘', '기침', '피로', '발열', '무기력증', '충혈', '눈곱', '각막염', '이명', '청력소실'];




const TABLE_HEAD = [
  { id: 'title', label: '의약품', alignRight: false },
  { id: 'stDate', label: '복용 날짜', alignRight: false },
  { id: 'enDate', label: '부작용', alignRight: false },
  { id: 'status', label: '복용중', alignRight: false },
  { id: '' },
];

const style = {

  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: '#FCFCFC',
  border: '2px solid lightgray',
  borderRadius: '2%',
  boxShadow: 24,
  p: 4,
};


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
    return filter(array, (_user) => _user.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('title');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // ------<약 정보 가져오기> 랜더링 될 때 한 번만 실행--------

  const [medicines, setMedicines] = useState([]);
  // 약 리스트 개수
  const [medicineCnt, setMedicineCnt] = useState(0);

  // 비동기 처리로 다시 약 정보 가져오기

  const fetchMediFunc = async () => {
    await CalendarService.getTakingPerUser(MemberService.getCurrentUser().id).then((res) => {
      console.log('data : ',res)
      setMedicineCnt(medicineCnt + 1);
      setMedicines(res.data);
      return res.data;
    })
  }
  // console.log(medicines)
  
  const medicine = [];
  const thisdate = new Date();
  for (let i = 0; i < medicines.length; i+= 1) {
    medicines[i][1].toString();
    medicines[i][2].toString();
    const stdate = medicines[i][1].split('T')
    const endate = medicines[i][2].split('T')
    const compareStdate = new Date(medicines[i][1])
    const compareEndate = new Date(medicines[i][2])
    let hasEffect = 'No'
    if (thisdate >= compareStdate && thisdate <= compareEndate){
      // medicines[i][3] = 'Yes'
      hasEffect = 'Yes'
    }
    // else {
    //  medicines[i][3] = 'No'
    // }
    medicine.push({
      id : i,
      title : medicines[i][0],
      start : stdate[0],
      end : endate[0],
      color : hasEffect,
      sideEffectName : medicines[i][3],
      startDate : medicines[i][1]
    })
    console.log('hey~ ',medicines[i][3])
  }


  useEffect(() => {
    fetchMediFunc()
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = USERLIST.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleClick = (event, title) => {
    const selectedIndex = selected.indexOf(title);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, title);
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

  const handleTextChange = (event, value) => {
    console.log(value)
    
    // formik.values.name = value.name;
    // setValues({ name: value.name });
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - medicines.length) : 0;

  const filteredUsers = applySortFilter(medicine, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;


  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  const [mediList, setMediList] = React.useState(medicine);
  const onRemove = id => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setMediList(medicine.filter(medicine => medicine.id !== id));
  };

  



  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            My Medicine
          </Typography>
          <Button onClick={handleOpen} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>Add My Medicine</Button>

          <Modal
            id='modal'
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Blog/>
            </Box>
          </Modal>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={medicineCnt}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                // onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, title, start, end, color, sideEffectName, startDate } = row;
                    const isItemSelected = selected.indexOf(title) !== -1;

                    return (
                      <TableRow
                        hover
                        key={title}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox" />
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* <Avatar alt={name} src={avatarUrl} /> */}
                            <Typography variant="subtitle2" noWrap>
                              {title}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{start} &nbsp; ~ &nbsp; {end}</TableCell>
                        <TableCell align="left">
                          <Autocomplete
                            options={options}
                            onChange={handleTextChange}
                            id="controllable-states-demo"
                            // getOptionLabel={(options) => options.name}
                            autoSelect
                            autoComplete
                            sx={{ width: 200 }}
                            renderInput={(params) => <TextField {...params} label="상세 부작용" />}
                          />
                        </TableCell>
                        <TableCell align="left">{color}
                          {/* <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                            {sentenceCase(status)}
                          </Label> */}
                        </TableCell>

                        <TableCell align="right">
                          <UserMoreMenu title ={title} start={startDate} />
                        </TableCell>
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
            count={medicines.length}
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