import axios from 'axios'; 
// eslint-disable-next-line import/no-unresolved
import authHeader from './auth-header';

const CALENDAR_API_BASE_URL = "/api/calendar"; 

class CalendarService{

    // eslint-disable-next-line class-methods-use-this
    getAllCalendars(userid) {
        return axios.get(`${CALENDAR_API_BASE_URL}/calendarInfo?id=${userid}`,  { headers: authHeader() });
    }

    // eslint-disable-next-line class-methods-use-this
    calendarInsert(userid, title, start, end, color) {

        console.log('calendar Insert ')
        console.log(start)
        console.log({ headers: authHeader() })
        
        return axios.post(`${CALENDAR_API_BASE_URL}/calendarInsert?id=${userid}` ,   { title, start, end, color});
    }
}

export default new CalendarService();