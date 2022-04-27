import React, {useEffect, useState} from 'react';
import axios from 'axios';

// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

// ----------------------------------------------------------------------


function App() {

  const [hello, setHello] = useState('')

  useEffect(() => {
      axios.get('/api/hello')
      .then(response => setHello(response.data))
      .catch(error => console.log(error))
  }, []);

  return (
    <ThemeProvider>
              <div>
            백엔드에서 가져온 데이터입니다 : {hello}
        </div>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}


// function App() {
//    const [hello, setHello] = useState('')

//     useEffect(() => {
//         axios.get('/api/hello')
//         .then(response => setHello(response.data))
//         .catch(error => console.log(error))
//     }, []);

//     return (
//         <div>
//             백엔드에서 가져온 데이터입니다 : {hello}
//         </div>
//     );
// }

export default App;