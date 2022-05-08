import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { Dropdown, Input, setOptions, Eventcalendar, getJson, toast } from '@mobiscroll/react';
import { styled,createTheme } from '@mui/material/styles';
import { DateRangePicker, DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Box from '@mui/material/Box';
import { addDays } from "date-fns"
import Modal from '@mui/material/Modal';
import React, { useState } from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

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
import { purple } from '@mui/material/colors';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { ColorPicker, createColor } from 'material-ui-color';
// import { ColorPicker } from "material-ui-color-picker";

import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
// CalendarService
import CalendarService from '../service/CalendarService';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: '의약품', alignRight: false },
  { id: 'role', label: '복용 날짜', alignRight: false },
  { id: 'isVerified', label: '부작용', alignRight: false },
  { id: 'status', label: '복용중', alignRight: false },
  { id: '' },
];

const style = {
  
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: '#FCFCFC',
  border: '2px solid #000',
  // 끝 둥글게 
  // borderRadius : '1%',
  boxShadow: 24,
  p: 4,
};

const ContentStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(0, 0),
  }));
  


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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}


export default function Calendar() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

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

  const [myEvents, setEvents] = React.useState([]);

    // React.useEffect(() => {
    //     getJson('https://trial.mobiscroll.com/events/?vers=5', (events) => {
    //         setEvents(events);
    //         console.log(events)
    //     }, 'jsonp');
    // }, []);

    // 비동기 처리로 다시 약 정보 가져오기
  const fetchMediFunc = async () => {
    const data = await CalendarService.getAllCalendars().then((res) => res.data)  
      .then(data =>{
          setEvents(data);
        })
  }

  React.useEffect(() => {
    fetchMediFunc()
  },[]);
    
    const onEventClick = React.useCallback((event) => {
        toast({
            message: event.event.title
        });
    }, []);
    
    const view = React.useMemo(() => {
        return {
            calendar: { labels: true }
        };
    }, []);
  
    // ColorPicker
    const [color, setColor] = useState(createColor("#000"));
    const handleColorChange = (value) => {
      console.log("onChange=", value);
      setColor(value);
    };

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            My Calendar
          </Typography>
            <Button onClick={handleOpen}  variant="contained" startIcon= {<Iconify icon="eva:plus-fill" />}>Add My Medicine</Button>
            <Modal
              id = 'modal'
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx ={style}>
              <div className="mbsc-grid mbsc-grid-fixed">
                <div className="mbsc-form-group">
                  <div className="mbsc-row mbsc-justify-content-center">
                    <div className="mbsc-col-md-10 mbsc-col-xl-8 mbsc-form-grid">
                      <div className="mbsc-form-group-title" id='mediInfoEnter'>약 정보 입력</div>

                      <div className="mbsc-row">
                        <div className="mbsc-col-md-6 mbsc-col-12">
                          <Input type="text" label="약 이름" placeholder="약 이름" inputStyle="box" labelStyle="floating" />
                          <Input type="text" label="약 이름" placeholder="약 이름" inputStyle="box" labelStyle="floating" />
                          <Input type="text" label="약 이름" placeholder="약 이름" inputStyle="box" labelStyle="floating" />
                          <p className='btn1'>
                            <Button align='right'> + 약 추가</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button align='right'> - 삭제</Button>
                          </p>
                        </div>

                        <div className="mbsc-col-md-6 mbsc-col-12">
                          <DateRange
                            // editableDateInputs={true}
                            onChange={item => setState([item.selection]) }
                            moveRangeOnFirstSelection={false}
                            ranges={state}
                          />
                          {/* <ColorPicker name="color" defaultValue="#000" onChange={color => console.log(color)}/> */}
                          <ColorPicker value={color} onChange={handleColorChange} />
                          <p className='btn2'>
                            &nbsp;&nbsp;&nbsp;
                            <Button variant="contained" onClick={handleClose}>저장하기 </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button variant="contained" onClick={handleClose}>취소</Button>
                          </p>
                        </div >
                      </div>

                    </div>
                  </div>

                </div>

              </div>
              </Box>
            </Modal>
        </Stack>
        <ContentStyle>
          <Eventcalendar
            theme="ios"
            themeVariant="light"
            clickToCreate={false}
            dragToCreate={false}
            dragToMove={false}
            dragToResize={false}
            data={myEvents}
            view={view}
            onEventClick={onEventClick}
          />
        </ContentStyle>
       
      </Container>
    </Page>
  );
}