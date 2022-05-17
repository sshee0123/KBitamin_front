import React, { useState, useEffect ,useRef, useCallback } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Dropdown, Input, Page, setOptions } from '@mobiscroll/react';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { DateRangePicker, DateRange } from 'react-date-range';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { LoadingButton } from '@mui/lab';
import { addDays } from "date-fns"
// materialimport { DateRangePicker } from 'rsuite';
import { Grid, Container, Stack, Typography, Button } from '@mui/material';
// components
// import Page from '../components/Page';
import { ColorPicker, createColor } from 'material-ui-color';
import Iconify from '../components/Iconify';
// MediService
import MediService from '../service/MedicineService';
import CalendarService from '../service/CalendarService';

import MemberService from '../service/MemberService';
import circle from "./Images/default_pill.png";
import CreateMedicine from "./CreateMedicine";
import MedicineList from "./MedicineList";
// ----------------------------------------------------------------------

setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

export default function Blog() {

  // ------<약 정보 가져오기> 랜더링 될 때 한 번만 실행--------
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  useEffect(() => {
    MediService.getAllMedicineInfo().then((res) => {
      setMedicines(res.data);
    })  
  },[]);
  
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);


  // -------------- OCR 처리 후 약 생성 -----------------
  const [newmedicines, setNewMedicine] = useState([

  ]);
// ------------------OCR request Hanlder---------------------------

const uploadFile=(e)=> {
  e.preventDefault();

  const data = new FormData();
  data.append('file', e.target.files[0]);
  data.append('filename', e.target.value);

  fetch('http://localhost:5000/fileUpload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
          
        console.log(body.data)
        // setState({ imageURL: `http://localhost:5000/${body.file}` });
        const arr = body.data.split(' ');
        setNewMedicine(arr);
      });
    });
}

  // ------------------------------------------------------------------
  const [values, setValues] = useState({ name: '', start: '', end: '', color: ''});

  const formik = useFormik({
    initialValues: {
      name: '',
      start: '',
      end: '',
      color: '',
    },
    onSubmit: () => {
      console.log('start : ',formik.values.start)

      if(newmedicines.length>0)
        for(let i=0; i<newmedicines.length; i+=1){
          CalendarService.calendarInsert(MemberService.getCurrentUser().id,newmedicines[i],formik.values.start, formik.values.end, formik.values.color);
        }

      CalendarService.calendarInsert(MemberService.getCurrentUser().id,formik.values.name,formik.values.start, formik.values.end, formik.values.color);
      navigate(0);
    },
  });

  const { handleSubmit, isSubmitting, getFieldProps } = formik;
  const handleTextChange = (event, value) => {
    
    formik.values.name = value.name;
    setValues({ name: value.name });
  };

  // ColorPicker
  const [color, setColor] = useState(createColor("#000"));
  const handleColorChange = (value) => {
    setColor(value.css.backgroundColor);
    formik.values.color = value.css.backgroundColor;
  };

  const handleDateSelect = (ranges) =>{
    formik.values.start = ranges.selection.startDate;
    formik.values.end = ranges.selection.endDate;
    setState([ranges.selection]);
  }

    // 약 이미지 없을 경우 defualt 이미지 sj
    const onErrorImg = (e) => {
      e.target.src = circle;
    }
  
  return (
    <FormikProvider value={formik}>
    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
    <Page>
    <Grid container spacing={2} columns={200}style={{
        backgroundColor: 'white'
      }}>
    <Grid item xs={100}>
                <center>
                <Typography variant="h1" component="h3" style={{color:"#606060"}}>
                  약 정보 입력
                </Typography>
                
                  <Autocomplete
                    id="highlights-demo"
                    options={medicines}
                    getOptionLabel={(option) => option.name}
                    onChange={handleTextChange}
                    renderInput={(params) => (
                      <Box
                          component="form"
                          sx={{
                              '& > :not(style)': { m: 3, width: '40ch', height: '10ch' },
                          }}
                          noValidate
                          autoComplete="off"
                      >
                      <TextField {...params} label="약 이름" margin="normal"  variant="outlined" color="warning"/>
                      </Box> 
                    )}
                    renderOption={(props, option, { inputValue }) => {
                      const matches = match(option.name, inputValue);
                      const parts = parse(option.name, matches);

                      return (
                          <Stack component="li" direction="row" sx={{ '& > img': { mr: 1, flexShrink: 0 } }}>
                          <img src={option.imageUrl}  alt="medi"  onError={onErrorImg} style={{ height: "30px", width: "30px", marginRight: "10px", marginLeft: "10px"
                          }} 
                          />
                        <li {...props}>
                          
                            {parts.map((part, index) => (
                              <><span
                                key={index}
                                style={{
                                  fontWeight: part.highlight ? 600 : 300,
                                }}
                              >
                                {part.text}
                              </span></>
                            ))}
                          
                        </li>
                        </Stack>
                      );
                    }}
                  />
                <MedicineList users={newmedicines}/>
                    <br/>
                <>
                  <label htmlFor="file">
                    <input type="file" name="file" onChange={uploadFile} id="file" style={{ display: "none" }}accept='image/jpg,impge/png,image/jpeg,image/gif' />
                    <Fab
                      color="primary"
                      size="small"
                      component="span"
                      aria-label="add"
                      variant="extended"
                    >
                    <AddIcon /> Upload file
                    </Fab><br/><br/><br/>
                  </label>
                  
                  </>
                  </center>
                  </Grid>
                  <Grid item xs={100}>
                <center>
                <Typography variant="h1" component="h3" style={{color:"#606060"}}>
                  날짜 입력
                </Typography>

                <DateRange
                    editableDateInputs
                    onChange={handleDateSelect}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                  /><br/><br/>
                  <ColorPicker value={color} onChange={handleColorChange} /><br/><br/>
                </center>
                  
                  
                  <center>
                    <LoadingButton  style={{ textalign:"center" }} type="submit" variant="contained">저장하기</LoadingButton><br/><br/>
                  </center>
                  </Grid>
</Grid>
    </Page>
    </Form>
    </FormikProvider>
  );
}
