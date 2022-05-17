// import { Link as RouterLink } from 'react-router-dom';
// // @mui
// import { styled } from '@mui/material/styles';
// import { Button, Typography, Container, Box } from '@mui/material';
// // components
// import React from 'react';
// import '@mobiscroll/react/dist/css/mobiscroll.min.css';
// import { Eventcalendar, getJson, toast } from '@mobiscroll/react';
// import Page from '../components/Page';

// // ----------------------------------------------------------------------

// const ContentStyle = styled('div')(({ theme }) => ({
//   minHeight: '0vh',
//   height : '100vh',
//   display: 'flex',
//   justifyContent: 'center',
//   flexDirection: 'column',
//   padding: theme.spacing(12, 0),
// }));

// // ----------------------------------------------------------------------

// export default function Page404() {
//   const [myEvents, setEvents] = React.useState([]);

//     React.useEffect(() => {
//         getJson('https://trial.mobiscroll.com/events/?vers=5', (events) => {
//             setEvents(events);
//         }, 'jsonp');
//     }, []);
    
//     const onEventClick = React.useCallback((event) => {
//         toast({
//             message: event.event.title
//         });
//     }, []);
    
//     const view = React.useMemo(() => {
//         return {
//             calendar: { labels: true }
//         };
//     }, []);
//   return (
    
//     <Page title="404 Page Not Found">
//       <Container>
//         <ContentStyle>
//           <Eventcalendar
//             theme="ios"
//             themeVariant="light"
//             clickToCreate={false}
//             dragToCreate={false}
//             dragToMove={false}
//             dragToResize={false}
//             data={myEvents}
//             view={view}
//             onEventClick={onEventClick}
//           />
//         </ContentStyle>
//       </Container>
//     </Page>
//   );
// }
