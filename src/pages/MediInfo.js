import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
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
import { deepOrange, deepPurple, green, pink, red, yellow } from '@mui/material/colors';
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
import USERLIST from '../_mock/user';
import MEDICINELIST from '../_mock/medicine';

// import { id } from 'date-fns/locale';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  // 원래 id 값 우선 보존
  // { id: 'name', label: '의약품', alignRight: false },
  // { id: 'role', label: '외형정보', alignRight: false },
  // { id: 'isVerified', label: '효능', alignRight: false },
  // { id: '' }

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
    // return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
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
  // const [filterMedicine, setFilterMedicine] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // const [formats, setFormats] = useState({shape:'ALL', color:'ALL', fomula:'ALL',dividing:'ALL'});

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
            Medi Info
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
      <Card>
       
       <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
      <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
       </Stack>

       <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
       <Button>모양 전체</Button>

       <Button>원형</Button>
       <Button>타원형</Button>
       <Button>반원형</Button>
       <Button>삼각형</Button>
       <Button>사각형</Button>
       <Button>마름모형</Button>
       <Button>장방형</Button>
       <Button>오각형</Button>
       <Button>육각형</Button>
       {/* 모양 버튼 추가 - 추후 이쁘게 */}


       </Stack>
       <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
       <Button>색상 전체</Button>

       <Button>하양</Button>
       <Button>노랑</Button>
       <Button>주황</Button>
       <Button>분홍</Button>
       <Button>빨강</Button>
       <Button>갈색</Button>
       <Button>연두</Button>
       <Button>초록</Button>
       <Button>청록</Button>
    {/* 색상 버튼 추가 - 추후 이쁘게 */}


       </Stack>
       <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
       <Button>제형 전체</Button>

       <Button>정제류</Button>
       <Button>경질캡슐</Button>
       <Button>연질캡슐</Button>

      {/* 제형 버튼 추가 - 추후 이쁘게 */}

       </Stack>
       <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
       <Button>분할선 전체</Button>

       <Button>없음</Button>
       <Button>(-)형</Button>
       <Button>(+)형</Button>
       <Button>기타</Button>
      {/* 분할선 버튼 추가 - 추후 이쁘게 */}


       </Stack>
          
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
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
                    const { medicineName, shape, efficacy} = row;
                    const isItemSelected = selected.indexOf(medicineName) !== -1;

                    return (
                      <TableRow
                        hover
                        // key={id}
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