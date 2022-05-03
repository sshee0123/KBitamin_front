import React, { useState } from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Dropdown, Input, Page, setOptions } from '@mobiscroll/react';
import { Link as RouterLink } from 'react-router-dom';
import { DateRangePicker, DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from "date-fns"
// materialimport { DateRangePicker } from 'rsuite';
import { Grid, Container, Stack, Typography, Button } from '@mui/material';
// components
// import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';

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
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);
  return (
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
                </div>
                
                <div className="mbsc-col-md-6 mbsc-col-12">
                <div className="mbsc-form-group-title">날짜 입력</div>
                  <DateRange
                    // editableDateInputs={true}
                    onChange={item => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                  />
                  <p>
                  <Button variant="contained">저장하기</Button>
                </p>
                </div >
              </div>

            </div>
          </div>
          
        </div>
        
      </div>
      
    </Page>
  );
}
