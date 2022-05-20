import React, { useState, useEffect } from 'react';
// @mui
import PropTypes from 'prop-types';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// Service
import MemberService from '../../../service/MemberService';
import DashboardService from '../../../service/DashboardService';
// utils
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';

// ----------------------------------------------------------------------

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppNewsUpdate({ title, subheader, list, ...other }) {

    // 부작용 있는 약 배열
    const [sideEffectMedicines, setSideEffectMedicines] = useState([]);

    // 부작용 있는 약
    const sideEffectMediFunc = async () => {
      await DashboardService.getSideEffectMediPerUser(MemberService.getCurrentUser().id).then((res) => {
        console.log('sideEffectMediFunc', res.data);
        setSideEffectMedicines(res.data);
        return res.data;
      })
    }

  return (
    <Card {...other} >
      {sideEffectMediFunc}
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>

          {list.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}

        </Stack>
      </Scrollbar>
      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
          View all
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.shape({

    description: PropTypes.string,
    image: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
    title: PropTypes.string,
  }),

};


function NewsItem({ news }) {
  const { image, title, description, postedAt } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>

      <Box component="img" alt={title} src={image} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" noWrap>
          {title}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
          {/* {sideEffectName} */}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {fToNow(postedAt)}
        {/* {fToNow(start)}
        {fToNow(end)} */}

      </Typography>
    </Stack>
  );
}
