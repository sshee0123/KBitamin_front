import React, { useState, useEffect ,useRef, useCallback } from 'react';
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
        // for(let i=0; i<arr.length; i+=1){
        //  onCreate(arr[i]);
          // console.log(arr[i])
        // }
        setNewMedicine(arr);
        // forceUpdate();
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
      <div className="mbsc-grid mbsc-grid-fixed">
        <div className="mbsc-form-group">
          <div className="mbsc-row mbsc-justify-content-center">
            <div className="mbsc-col-md-10 mbsc-col-xl-8 mbsc-form-grid">
              <div className="mbsc-form-group-title">약 정보 입력</div>
              
              <div className="mbsc-row">
                <div className="mbsc-col-md-6 mbsc-col-12">
                  <Autocomplete
                    id="highlights-demo"
                    options={medicines}
                    getOptionLabel={(option) => option.name}
                    onChange={handleTextChange}
                    renderInput={(params) => (
                      <TextField {...params} label="약 이름" margin="normal"  variant="outlined" color="secondary" />
                    )}
                    renderOption={(props, option, { inputValue }) => {
                      const matches = match(option.name, inputValue);
                      const parts = parse(option.name, matches);

                      return (
                          <Stack component="li" direction="row" sx={{ '& > img': { mr: 2, flexShrink: 0 } }}>
                          <img src={option.imageUrl}  alt="medi"  onError={onErrorImg} style={{ height: "30px", width: "30px", marginRight: "10px"
                          }} 
                          />
                        <li {...props}>
                          
                            {parts.map((part, index) => (
                              <><span
                                key={index}
                                style={{
                                  fontWeight: part.highlight ? 700 : 400,
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
                </div>
                
                <div className="mbsc-col-md-6 mbsc-col-12">
                <div className="mbsc-form-group-title">날짜 입력</div>
                  <DateRange
                    editableDateInputs
                    onChange={handleDateSelect}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                  />
                  <ColorPicker value={color} onChange={handleColorChange} />
                  <>
                  <input type="file" name="file" onChange={uploadFile} accept='image/jpg,impge/png,image/jpeg,image/gif' />
                  <Button >
                      Upload 
                  </Button>
                  </>
                  <p>
                  <LoadingButton type="submit" variant="contained">저장하기</LoadingButton>
                </p>
                </div >
              </div>

            </div>
          </div>
          
        </div>
        
      </div>
      
    </Page>
    </Form>
    </FormikProvider>
  );
}
