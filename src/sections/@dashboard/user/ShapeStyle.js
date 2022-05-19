import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// material
import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
} from '@mui/material';
// components
import { makeStyles } from '@material-ui/core/styles';
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '.';
// MediService
import MediService from '../../../service/MedicineService';
// button image
import circle from './Images/circle.png';
import hexa from './Images/hexa.png';
import jangbang from './Images/jangbang.png';
import jeongjae from './Images/jeongjae.png';
import kyungjil from './Images/kyungjil.png';
import minus from './Images/minus.png';
import nothing from './Images/nothing.png';
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

// mediInfo 페이지 정보 테이블 Head
const TABLE_HEAD = [
    { id: 'name', label: '의약품', alignRight: false },
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
    }

    // component 렌더링 시 실행
    useEffect(() => {
        fetchMediFunc()
    }, []);

// ----------------------------------------------------------------------

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


    const classes = useStyles();

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - medicines.length) : 0;
    
    const filteredUsers = applySortFilter(medicines, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;

    // ----------------------------------------------------------------------
    // 약 외형정보 버튼으로 필터링 검색
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

    //  모양 filter
    const shapeFilter = (event) => {
        const clickBtn = document.getElementById(event.currentTarget.id);
        const btns = document.getElementsByClassName('filterBtn');
        const btnname = event.currentTarget.name;

        // 눌린 상태에서 버튼 또 누르면 초기화
        if (event.currentTarget.id == prevBtnId) {
            setPrevBtnId('');
            // active 제거
            for (let j = 0; j < btns.length; j+=1){
                btns[j].classList.remove('active');
            }
        }
        // 버튼 누르면
        else{
            for (let i; i<btns.length; i+=1)
                btns[i].classList.remove('active');
            clickBtn.classList.add('active');
            
            // 누른 버튼 id, name 저장
            setPrevBtnId(event.currentTarget.id);
            setPrevBtnName(event.currentTarget.name);

            // 버튼 Type(name)에 따라
            switch (btnname) {
                // 모양 검색일 때
                case "shape":
                    setPrevShapeBtnId(event.currentTarget.id);
                    setPrevShapeBtnName("shape");
                    break;
                // 색상 검색일 때
                case "color":
                    setPrevColorBtnId(event.currentTarget.id);
                    setPrevColorBtnName("color");
                    break;
                // 제형 검색일 때
                case "formulation":
                    setPrevFormulationBtnId(event.currentTarget.id);
                    setPrevFormulationBtnName("formulation");
                    break;
                // 분할선 검색일 때
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
        for (let i; i<btns.length; i+=1){
            btns[i].classList.remove('active');
        };

        // 변수도 초기화
        setPrevShapeBtnId('');
        setPrevColorBtnId('');
        setPrevFormulationBtnId('');
        setPrevDivideLineBtnId('');
        fetchMediFunc();
    }


// ----------------------------------------------------------------------

return (
    <Page title="MediInfo">
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Medicine Information
                </Typography>
            </Stack>

            {/* Medicine 이름 검색 창 */}
            <Card id='cardInMediInfo'>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
                </Stack>

            {/* Medicine 외형정보 검색 버튼 */}
                {/* 모양 버튼 */}
                {/* 타원형 / None(기타로) / 원형 / 장방형 / 사각형 / 삼각형 / 오각형 / 기타 / 육각형 */}
                    <Stack direction="row" alignItems="center" mb={3} spacing={3}>
                        <Button className='filterBtn' id = '전체' name = "shape" onClick={shapeFilter} style={{ color: '-moz-initial' }}>모양<br />전체</Button>
                        <Button className='filterBtn' id = '원형' name = "shape" style = {{color : 'black'}} onClick={shapeFilter}><img src = {circle} alt = "circle"/></Button>
                        <Button className='filterBtn' id = '타원형' name = "shape" style = {{color : 'black'}} onClick={shapeFilter}><img src = {oval} alt = "oval"/></Button>
                        <Button className='filterBtn' id = '삼각형' name = "shape" style = {{color : 'black'}} onClick={shapeFilter}><img src = {triangle} alt = "triangle"/></Button>
                        <Button className='filterBtn' id = '사각형' name = "shape" style = {{color : 'black'}} onClick={shapeFilter}><img src = {square} alt = "square"/></Button>
                        <Button className='filterBtn' id = '장방형' name = "shape" style = {{color : 'black'}} onClick={shapeFilter}><img src = {jangbang} alt = "jangbang"/></Button>
                        <Button className='filterBtn' id = '오각형' name = "shape" style = {{color : 'black'}} onClick={shapeFilter}><img src = {penta} alt = "penta"/></Button>
                        <Button className='filterBtn' id = '육각형' name = "shape" style = {{color : 'black'}} onClick={shapeFilter}><img src = {hexa} alt = "hexa"/></Button>
                        <Button className='filterBtn' id = '기타' name = "shape" style = {{color : 'black'}} onClick={shapeFilter}>기타</Button>
                        </Stack>

                {/* 색상 버튼 */}
                {/* 갈색 / 검정 / 남색 / 노랑 / 노랑, 투명 / 보라 / 분홍 / 빨강 / 빨강, 투명 / 연두 / 자주 / 주황 / 주황, 투명 / 청록 / 초록 / 파랑 / 파랑, 투명 / 하양 / 회색 */}

                    <Stack direction="row" alignItems="center" mb={3} spacing={3}>
                        <Button className='filterBtn' id = '전체' name = "color" onClick={shapeFilter} style={{ color: '-moz-initial' }}>색상<br />전체</Button>
                        <Button className='filterBtn' id = '갈색' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={brown} alt = "brown" /></Button>
                        <Button className='filterBtn' id = '노랑' name = "color"  onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={yellow} alt = "yellow" /></Button>
                        <Button className='filterBtn' id = '분홍' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={pink} alt = "pink"/></Button>
                        <Button className='filterBtn' id = '빨강' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={red} alt = "red"/></Button>
                        <Button className='filterBtn' id = '연두' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={lightgreen} alt = "lightgreen"/></Button>
                        <Button className='filterBtn' id = '주황' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={orange} alt = "orange"/></Button>
                        <Button className='filterBtn' id = '청록' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={teal} alt = "teal"/></Button>
                        <Button className='filterBtn' id = '초록' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={green} alt = "green"/></Button>
                        <Button className='filterBtn' id = '하양' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={white} alt = "white"/></Button>
                        <Button className='filterBtn' id = '파랑' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={blue} alt = "blue"/></Button>
                        <Button className='filterBtn' id = '남색' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={indigo} alt = "indigo"/></Button>
                        <Button className='filterBtn' id = '자주' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={violet} alt = "violet"/></Button>
                        <Button className='filterBtn' id = '보라' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={purple} alt = "purple"/></Button>
                        <Button className='filterBtn' id = '회색' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={gray} alt = "gray"/></Button>
                        <Button className='filterBtn' id = '검정' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={black} alt = "black"/></Button>
                        <Button className='filterBtn' id = '투명' name = "color" onClick={shapeFilter} style={{ color: 'black' }}><img className='colorbtn' src={transparency} alt = "transparency" /></Button>     
                    </Stack>

                {/* 제형 버튼 */}
                {/* 정제 / None / 경질 / 원형 / 타원형 / 장방형 / 사각형 / 삼각형 / 연질 */}
                {/* 전체 / 정제 / 경질 / 연질 / 기타 */}
                    <Stack direction="row" alignItems="center" mb={3} spacing={3}>
                        <Button className='filterBtn' id = '전체' name = "formulation" onClick={shapeFilter} style={{ color: '-moz-initial' }}>제형<br />전체</Button>
                        <Button className='filterBtn' id = '정제' name = "formulation" onClick={shapeFilter} style={{ color: 'black' }}><img src={jeongjae} alt = "jeongjae"/></Button>
                        <Button className='filterBtn' id = '경질' name = "formulation" onClick={shapeFilter} style={{ color: 'black' }}><img src={kyungjil} alt = "kyungjil"/></Button>
                        <Button className='filterBtn' id = '연질' name = "formulation" onClick={shapeFilter} style={{ color: 'black' }}><img src={yeonjil} alt = "yeonjil" /></Button>
                        <Button className='filterBtn' id = '기타' name = "formulation" onClick={shapeFilter} style={{ color: 'black' }}>기타</Button>
                    </Stack>
                <p />

                {/* 분할선 버튼 */}
                {/* - / None / +  */}
                    <Stack direction="row" alignItems="center" mb={3} spacing={3}>
                        <Button className='filterBtn' id = '전체' name = "divide_line" onClick={shapeFilter} style={{ color: '-moz-initial' }}>분할선<br />전체</Button>
                        <Button className='filterBtn' id = 'None' name = "divide_line" onClick={shapeFilter} style={{ color: 'black' }}><img src={nothing} alt = "nothing"/></Button>
                        <Button className='filterBtn' id = '-' name = "divide_line" onClick={shapeFilter} style={{ color: 'black' }}><img src={minus} alt = "minus"/></Button>
                        <Button className='filterBtn' id = '+' name = "divide_line" onClick={shapeFilter} style={{ color: 'black' }}><img src={plusplus} alt = "plusplus"/></Button>
                    </Stack>


                {/* 약 검색 필터링 저장하기 버튼 */}
                <Stack direction="row" alignItems="center" mb={2} spacing={2} justifyContent="center">

                    {/* MediService 에서 약 검색 필터링 서비스 호출 */}
                <Button variant="contained" onClick={ () => {
                    MediService.getMedicineByButtonFilter(prevShapeBtnId, prevColorBtnId, prevFormulationBtnId, prevDivideLineBtnId).then((res) => {
                        setMedicines(res.data);
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

                                        // 여기에 back에서 받은 json 데이터 list 보여주기
                                        return (
                                            <TableRow
                                                hover
                                                key={name}
                                                tabIndex={-1}
                                                role="checkbox"
                                                selected={isItemSelected}
                                                aria-checked={isItemSelected}
                                                onClick={() => {
                                                    // 약 상세 정보 페이지로 약 이름 push
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

                                                {/* 외형정보로 */}
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

                {/* 약 정보 테이블 페이지 분할 */}
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