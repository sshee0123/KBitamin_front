import { Eventcalendar, toast } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { styled } from '@mui/material/styles';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useEffect, useState, useCallback, useMemo} from 'react';
// material
import {
  Stack,
  Button,
  Container,
  Typography,
} from '@mui/material';
// components
import { createColor } from 'material-ui-color';
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// CalendarService
import CalendarService from '../service/CalendarService';
import MemberService from '../service/MemberService';
import Blog from './Blog';

// ----------------------------------------------------------------------

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: '#FCFCFC',
  border: '2px solid #000',
  borderRadius : '2%',
  boxShadow: 24,
  p: 4,
};

const ContentStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(0, 0),
    height: 1000
  }));
  
// ----------------------------------------------------------------------

export default function Calendar() {

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false); fetchMediFunc();}

  const [myEvents, setEvents] = useState([]);

  // 비동기 처리로 다시 약 정보 가져오기
  const fetchMediFunc = async () => {
    const data = await CalendarService.getAllCalendars(MemberService.getCurrentUser().id).then((res) => res.data)  
      .then(data =>{
          setEvents(data);
        })
  }

  useEffect(() => {
    fetchMediFunc()
  },[]);
    
  const onEventClick = useCallback((event) => {
      toast({
          message: event.event.title
        });
  }, []);
    
  const view = useMemo(() => {
      return {
          calendar: { labels: true }
      };
  }, []);
  
  // ColorPicker
  const [color, setColor] = useState(createColor("#000"));

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
                <Blog />
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