import React, { useState, useEffect } from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Dropdown, Input, Page, setOptions } from '@mobiscroll/react';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
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
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { ColorPicker, createColor } from 'material-ui-color';
import Iconify from '../components/Iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';
// MediService
import MediService from '../service/MedicineService';
import CalendarService from '../service/CalendarService';

import MemberService from '../service/MemberService';
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

// ----------------------------------------------------------------------

export default function Blog() {

  // ------<약 정보 가져오기> 랜더링 될 때 한 번만 실행--------
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

  const [values, setValues] = useState({ name: '', start: '', end: '', color: ''});

  const formik = useFormik({
    initialValues: {
      name: '',
      start: '',
      end: '',
      color: '',
    },
    onSubmit: () => {
      CalendarService.calendarInsert(MemberService.getCurrentUser().id,formik.values.name,formik.values.start, formik.values.end, formik.values.color);
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
    // console.log(ranges);
    // console.log('start : ',ranges.selection.startDate)
    // console.log('end : ',ranges.selection.endDate)
    formik.values.start = ranges.selection.startDate;
    formik.values.end = ranges.selection.endDate;
    setState([ranges.selection]);
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
                  <Input type="text" label="약 이름" placeholder="약 이름" inputStyle="box" labelStyle="floating" />
                  <Input type="text" label="약 이름" placeholder="약 이름" inputStyle="box" labelStyle="floating" />
                  <Input type="text" label="약 이름" placeholder="약 이름" inputStyle="box" labelStyle="floating" />
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
                        <li {...props}>
                          <div>
                            {parts.map((part, index) => (
                              <span
                                key={index}
                                style={{
                                  fontWeight: part.highlight ? 700 : 400,
                                }}
                              >
                                {part.text}
                              </span>
                            ))}
                          </div>
                        </li>
                      );
                    }}
                  />
                
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
