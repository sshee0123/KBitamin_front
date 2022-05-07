import axios from 'axios'; 
// eslint-disable-next-line import/no-unresolved
import authHeader from './auth-header';

const CALENDAR_API_BASE_URL = "/api/calendar"; 

class CalenndarService{

    // eslint-disable-next-line class-methods-use-this
    getAllCalendars() {
        console.log('calendar service')
        return axios.get(`${CALENDAR_API_BASE_URL}/calendarInfo`,  { headers: authHeader() });
    }
}

export default new CalenndarService();