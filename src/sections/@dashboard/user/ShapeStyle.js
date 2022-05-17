import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
import Modal from '@mui/material/Modal';
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
import Iconify from '../../../components/Iconify';
import SearchNotFound from '../../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu, Separate } from '.';
// MediService
import MediService from '../../../service/MedicineService';
// import { id } from 'date-fns/locale';
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
import blue from './color/blue.png';
import violet from './color/violet.png';
import purple from './color/purple.png';
import gray from './color/gray.png';
import black from './color/black.png';
import indigo from './color/indigo.png';
import transparency from './color/transparency.png';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: '의약품', alignRight: false },
    //  { id: 'imageUrl', label: '이미지', alignRight: false },
        { id: 'shape', label: '모양', alignRight: false },
        { id: 'color', label: '색상', alignRight: false },
        { id: 'formulation', label: '제형', alignRight: false },
        { id: 'divideLine', label: '분할선', alignRight: false },
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
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function MediInfo({ menuItems }) {

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const navigate = useNavigate();

    // ------<약 정보 가져오기> 랜더링 될 때 한 번만 실행--------

    const [medicines, setMedicines] = useState([]);
    // 약 리스트 개수
    const [medicineCnt, setMedicineCnt] = useState(0);

    // 비동기 처리로 다시 약 정보 가져오기
    const fetchMediFunc = async () => {
        await MediService.getAllMedicineInfo().then((res) => {
            setMedicineCnt(medicineCnt + 1);
            setMedicines(res.data);
            return res.data;
        })

        // await MediService.getMedicineByButtonFilter().then((res) => {
        //     setMedicineCnt(medicineCnt + 1);
        //     setMedicines(res.data);
        //     return res.data;
        // })
    }

    useEffect(() => {
        fetchMediFunc()
    }, []);


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
        borderRadius: '2%',
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
            const newSelecteds = medicines.map((n) => n.name);
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - medicines.length) : 0;
    
    const filteredUsers = applySortFilter(medicines, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;

    const allCategories = ['All', '원형', '타원형', '장방형', 'None', '사각형', '삼각형'];

    const allCategories1 = medicines.map(item => item.name);

    // console.log(allCategories1)

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

    const [prevBtnId, setPrevBtnId] = useState('');

    const [prevShapeBtnId, setPrevShapeBtnId] = useState('');
    const [prevColorBtnId, setPrevColorBtnId] = useState('');
    const [prevFormulationBtnId, setPrevFormulationBtnId] = useState('');
    const [prevDivideLineBtnId, setPrevDivideLineBtnId] = useState('');

    const [prevShapeBtnName, setPrevShapeBtnName] = useState('');
    const [prevColorBtnName, setPrevColorBtnName] = useState('');
    const [prevFormulationBtnName, setPrevFormulationBtnName] = useState('');
    const [prevDivideLineBtnName, setPrevDivideLineBtnName] = useState('');


    const [prevBtnName, setPrevBtnName] = useState('');
    const [hashMedi, setHashMedi] = useState([]);
    const [filterCond, setFilterCond] = useState('all');

    //  모양 filter
    const shapeFilter = (event) => {
        const clickBtn = document.getElementById(event.currentTarget.id);
        const btns = document.getElementsByClassName('filterBtn');
        console.log("click btn", clickBtn);
        console.log("event.currentTarget.id",event.currentTarget.id);

        const btnname = event.currentTarget.name;
        console.log("Btnname", btnname);

        // 눌린 상태에서 버튼 또 누르면 초기화
        if (event.currentTarget.id == prevBtnId) {
            setFilterCond('all');
            setPrevBtnId('');

            // active 제거
            for (let j = 0; j < btns.length; j+=1){
                btns[j].classList.remove('active');
            }

        }

        // 버튼 누르면
        else{
            for (let i; i<btns.length; i+=1){
                btns[i].classList.remove('active');
                console.log("Remove ~ btns[i].className", btns[i].className);
            }

            // active 다시
            clickBtn.classList.add('active');
            
            setFilterCond('hash');

            setPrevBtnId(event.currentTarget.id);
            setPrevBtnName(event.currentTarget.name);

            console.log("prevBtnId",event.currentTarget.id);
            console.log("prevBtnId~~~~~~~",prevBtnId);

            console.log("prevBtnName",event.currentTarget.name);
            console.log("btn:class~~~",clickBtn.className);

            // 버튼 Type에 따라
            switch (btnname) {
                case "shape":
                    setPrevShapeBtnId(event.currentTarget.id);
                    setPrevShapeBtnName("shape");
                    console.log("shapeid", prevShapeBtnId);
                    console.log("shapename", prevShapeBtnName);
                    break;

                case "color":
                    setPrevColorBtnId(event.currentTarget.id);
                    setPrevColorBtnName("color");
                    break;
                
                case "formulation":
                    setPrevFormulationBtnId(event.currentTarget.id);
                    setPrevFormulationBtnName("formulation");
                    break;

                case "divide_line":
                    setPrevDivideLineBtnId(event.currentTarget.id);
                    setPrevDivideLineBtnName("divide_line");
                    break;
                default:
                    break;
            }
            
        };

    };

    // 초기화 버튼 함수
    const resetFilter = (event) => {
        const btns = document.getElementsByClassName('filterBtn');
        console.log("filterbtnssssss", btns);
        for (let i; i<btns.length; i+=1){
            btns[i].classList.remove('active');
            console.log("reset~~~~~", btns[i].classList);
        };

        setPrevShapeBtnId('');
        setPrevColorBtnId('');
        setPrevFormulationBtnId('');
        setPrevDivideLineBtnId('');
        fetchMediFunc();
    }

return (
    <Page title="MediInfo">
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Medicine Information
                </Typography>

                <Modal
                    id='modal'
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div className="mbsc-grid mbsc-grid-fixed">
                            <Typography variant="h4" gutterBottom>
                                약 정보
                            </Typography>
                        </div>
                    </Box>
                </Modal>

            </Stack>

            {/* Medicine 검색 조건 */}
            <Card id='cardInMediInfo'>

                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
                </Stack>

                {/* 모양 버튼 추가 - 추후 이쁘게 */}
                {/* 타원형 / None(기타로) / 원형 / 장방형 / 사각형 / 삼각형 / 오각형 / 기타 / 육각형 */}
                {/* <ButtonGroup className='buttonGroup'> */}
                    <Stack direction="row" alignItems="center" mb={3} spacing={3}>
                        <Button className='filterBtn' id = '전체' name = "shape" onClick={shapeFilter} style={{ color: '-moz-initial' }}>모양<br />전체</Button>
                        <Button className='filterBtn' id = '원형' name = "shape" style = {{color : 'black'}} onClick={shapeFilter}><img src = {circle}/></Button>
                        <Button className='filterBtn' id = '타원형' name = "shape" style = {{color : 'black'}} onClick={shapeFilter}><img src = {oval}/></Button>
                        <Button className='filterBtn' id = '삼각형' name = "shape" style = {{color : 'black'}} onClick={shapeFilter}><img src = {triangle}/></Button>
                        <Button className='filterBtn' id = '사각형' name = "shape" style = {{color : 'black'}} onClick={shapeFilter}><img src = {square}/></Button>
                        <Button className='filterBtn' id = '장방형' name = "shape" style = {{color : 'black'}} onClick={shapeFilter}><img src = {jangbang}/></Button>
                        <Button className='filterBtn' id = '오각형' name = "shape" style = {{color : 'black'}} onClick={shapeFilter}><img src = {penta}/></Button>
                        <Button className='filterBtn' id = '육각형' name = "shape" style = {{color : 'black'}} onClick={shapeFilter}><img src = {hexa}/></Button>
                        <Button className='filterBtn' id = '기타' name = "shape" style = {{color : 'black'}} onClick={shapeFilter}>기타</Button>
                        </Stack>
                {/* </ButtonGroup> */}

{/* 여기까지만 해보기 */}


                {/* 색상 버튼 추가 - 추후 이쁘게 */}
                {/* 갈색 / 검정 / 남색 / 노랑 / 노랑, 투명 / 보라 / 분홍 / 빨강 / 빨강, 투명 / 연두 / 자주 / 주황 / 주황, 투명 / 청록 / 초록 / 파랑 / 파랑, 투명 / 하양 / 회색 */}
                {/*  검정 남색 보라 자주 파랑 회색  */}

                {/* <ButtonGroup className='buttonGroup' > */}
                    <Stack direction="row" alignItems="center" mb={3} spacing={3}>
                        <Button className='filterBtn' id = '전체' name = "color" onClick={shapeFilter} style={{ color: '-moz-initial' }}>색상<br />전체</Button>
                        <Button className='filterBtn' id = '갈색' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' backgroundColor='brown' src={brown} /></Button>

                        <Button className='filterBtn' id = '노랑' name = "color"  onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={yellow} /></Button>

                        <Button className='filterBtn' id = '분홍' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={pink} /></Button>
                        <Button className='filterBtn' id = '빨강' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={red} /></Button>
                        <Button className='filterBtn' id = '연두' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={lightgreen} /></Button>
                        <Button className='filterBtn' id = '주황' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={orange} /></Button>
                        <Button className='filterBtn' id = '청록' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={teal} /></Button>
                        <Button className='filterBtn' id = '초록' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={green} /></Button>
                        <Button className='filterBtn' id = '하양' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={white} /></Button>
                        <Button className='filterBtn' id = '파랑' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={blue} /></Button>
                        <Button className='filterBtn' id = '남색' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={indigo} /></Button>
                        <Button className='filterBtn' id = '자주' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={violet} /></Button>
                        <Button className='filterBtn' id = '보라' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={purple} /></Button>
                        <Button className='filterBtn' id = '회색' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={gray} /></Button>
                        <Button className='filterBtn' id = '검정' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={black} /></Button>
                        <Button className='filterBtn' id = '투명' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img  src={transparency} /></Button>
                                
                    </Stack>
                {/* </ButtonGroup> */}

                {/* 제형 버튼 추가 - 추후 이쁘게 */}
                {/* 정제 / None / 경질 / 원형 / 타원형 / 장방형 / 사각형 / 삼각형 / 연질 */}
                {/* 정제, 경질, 연질이 제형같은데...원형 / 타원형 / 장방형 / 사각형 / 삼각형 / None 은 기타로 처리 */}
                {/* <ButtonGroup className='buttonGroup'> */}
                    <Stack direction="row" alignItems="center" mb={3} spacing={3}>
                        <Button className='filterBtn' id = '전체' name = "formulation" onClick={shapeFilter} style={{ color: '-moz-initial' }}>제형<br />전체</Button>
                        <Button className='filterBtn' id = '정제' name = "formulation" onClick={shapeFilter} style={{ color: 'black' }}><img src={jeongjae} /></Button>
                        <Button className='filterBtn' id = '경질' name = "formulation" onClick={shapeFilter} style={{ color: 'black' }}><img src={kyungjil} /></Button>
                        <Button className='filterBtn' id = '연질' name = "formulation" onClick={shapeFilter} style={{ color: 'black' }}><img src={yeonjil} /></Button>
                        <Button className='filterBtn' id = '기타' name = "formulation" onClick={shapeFilter} style={{ color: 'black' }}>기타</Button>
                    </Stack>
                {/* </ButtonGroup> */}
                <p />

                {/* 분할선 버튼 추가 - 추후 이쁘게 */}
                {/* - / None / +  */}
                {/* <ButtonGroup className='buttonGroup' variant="outlined" aria-label="outlined button group"> */}
                    <Stack direction="row" alignItems="center" mb={3} spacing={3}>
                        <Button className='filterBtn' id = '전체' name = "divide_line" onClick={shapeFilter} style={{ color: '-moz-initial' }}>분할선<br />전체</Button>
                        <Button className='filterBtn' id = 'None' name = "divide_line" onClick={shapeFilter} style={{ color: 'black' }}><img src={nothing} /></Button>
                        <Button className='filterBtn' id = '-' name = "divide_line" onClick={shapeFilter} style={{ color: 'black' }}><img src={minus} /></Button>
                        <Button className='filterBtn' id = '+' name = "divide_line" onClick={shapeFilter} style={{ color: 'black' }}><img src={plusplus} /></Button>
                    </Stack>
                {/* </ButtonGroup> */}


                {/* 약 검색 필터링 저장하기 버튼 */}
                <Stack direction="row" alignItems="center" mb={3} spacing={3}>

                <Button variant="contained" onClick={ () => {

                    MediService.getMedicineByButtonFilter(prevShapeBtnId, prevColorBtnId, prevFormulationBtnId, prevDivideLineBtnId).then((res) => {
                        setMedicines(res.data);
                        console.log("filtering data", res.data);
                        return res.data;
                    })

                }}
                     style = {{ alignItems:'center'}}>검색하기</Button>

                {/* 필터링 초기화 버튼 */}
                <Button variant="contained" onClick={resetFilter}>초기화</Button>

                </Stack>


                <Scrollbar>
                    <TableContainer sx={{ minWidth: 800 }}>
                        <Table text-overflow='ellipsis'>
                            <UserListHead
                                order={order}
                                orderBy={orderBy}
                                headLabel={TABLE_HEAD}
                                rowCount={medicineCnt}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                                onSelectAllClick={handleSelectAllClick}
                            />

                            <TableBody>
                                {
                                    filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { name, imageUrl,shape, color, formulation, divideLine, efficacy} = row;
                                        const isItemSelected = selected.indexOf(name) !== -1;

                                        // 여기 return 또 있음.
                                        // 여기에 back에서 받은 json 데이터 list 보여줘야함.
                                        return (
                                            <TableRow
                                                hover
                                                key={name}
                                                tabIndex={-1}
                                                role="checkbox"
                                                selected={isItemSelected}
                                                aria-checked={isItemSelected}
                                                onClick={() => {
                                                    // 약 상세 페이지로 push
                                                    navigate(`/dashboard/medicine/detailOneMediInfo`,
                                                        {state: name}
                                                    )
                                                }}
                                            >
                                            <TableCell/>

                                            {/* 의약품 */}
                                            <TableCell component="th" scope="row" padding="none" align="left">
                                                <Stack direction="row" alignItems="center" spacing={3}>
                                                    <Avatar alt={name} src={imageUrl} />
                                                    <Typography variant="subtitle2" noWrap >{name}</Typography>
                                                </Stack>
                                            </TableCell>

                                            {/* 외형정보로 합치기 Or 분할 */}
                                            {/* 모양 */}
                                            <TableCell align="left">{shape}</TableCell>
                                            {/* 색상 */}
                                            <TableCell align="left">{color}</TableCell>
                                            {/* 제형 */}
                                            <TableCell align="left">{formulation}</TableCell>
                                            {/* 분할선 */}
                                            <TableCell align="left">{divideLine}</TableCell>
                                            {/* 효능 */}     
                                            <TableCell align="left">{efficacy}</TableCell>

                                            </TableRow>
                                        );


                                    }
                                    )
                                }

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

                {/* 페이지 조절... 근데 검색해야해서 mediInfo 페이지는 그냥 페이지 안나누는게 날 것 같음. */}
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