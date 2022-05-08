import { filters } from 'lodash';
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
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Modal from '@mui/material/Modal';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu, ShapeStyle } from '../sections/@dashboard/user';
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
    return filters(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function MediInfo() {

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

    // ------<약 정보 가져오기> 랜더링 될 때 한 번만 실행--------

    const [medicines, setMedicines] = useState([]);
    // 약 리스트 개수
    const [medicineCnt, setMedicineCnt] = useState(0);

    // 비동기 처리로 다시 약 정보 가져오기
    const fetchMediFunc = async () => {
      await MediService.getAllMedicineInfo().then((res) => {
        setMedicineCnt(medicineCnt+1);
        setMedicines(res.data);
        return res.data;
      })  
    }
  
    useEffect(() => {
      fetchMediFunc()
    },[]);


  /* 약 클릭시 Modal 창 띄우기 */
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
  
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: '#FCFCFC',
    border: '2px solid lightgray',
    borderRadius : '2%',
    boxShadow: 24,
    p: 4,
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      // const newSelecteds = MEDICINELIST.map((n) => n.medicineName);
      const newSelecteds = medicines.map((n) => n.medicineName);
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

  // 약 테이블 cell 클릭 리스너
  const handleCellClick = (MediName) => {
    console.log(MediName);
    handleOpen();
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

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - MEDICINELIST.length) : 0;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - medicines.length) : 0;

  // const filteredUsers = applySortFilter(MEDICINELIST, getComparator(order, orderBy), filterName);
  const filteredUsers = applySortFilter(medicines, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const allCategories = ['All', '원형', '타원형', '장방형', 'None', '사각형', '삼각형'];
  // console.log(medicines.shape)

  // console.log('all', allCategories);

  const allCategories1 = medicines.map(item => item.name);

  console.log(allCategories1)


  const [menuItem, setMenuItem] = useState(medicines);
  const [buttons, setButtons] = useState(allCategories);



  const filter = (button) => {

    if (button === 'All') {
      setMenuItem(medicines);
      return;
    }

    const filteredData = medicines.filter(item => item.shape.include(button));
    setMenuItem(filteredData)
  };

  return (
    
              <ShapeStyle menuItems={menuItem}/>

            
  );
}