import axios from 'axios'; 
// eslint-disable-next-line import/no-unresolved
import authHeader from './auth-header';

const CALENDAR_API_BASE_URL = "/api/calendar"; 
const TAKING_API_BASE_URL = "/api/taking"; 

class CalendarService{

    // eslint-disable-next-line class-methods-use-this
    getAllCalendars(userid) {
        return axios.get(`${CALENDAR_API_BASE_URL}/calendarInfo?id=${userid}`,  { headers: authHeader() });
    }

    // eslint-disable-next-line class-methods-use-this
    calendarInsert(userid, title, start, end, color) {

        console.log('calendar Insert ')
        console.log(title)
        console.log({ headers: authHeader() })
        
        return axios.post(`${CALENDAR_API_BASE_URL}/calendarInsert?id=${userid}` , { title, start, end, color});
    }
    
    // eslint-disable-next-line class-methods-use-this
    getTakingPerUser(id){
        console.log("front service getTakingPerUser?user_id=` + user_id,",id);

        return axios.get(`${TAKING_API_BASE_URL}/takingUser?id=${id}`,{ headers: authHeader() });
    }

    // eslint-disable-next-line class-methods-use-this
    updateTaking(id, title, start, sideEffectName){
        console.log("front service updateTaking?user_id=` + user_id,",sideEffectName);

        return axios.post(`${TAKING_API_BASE_URL}/updateTaking?id=${id}`, { title, start, sideEffectName});
    }

    // eslint-disable-next-line class-methods-use-this
    deleteTaking(id, title, start){
        console.log("front service deleteTaking?user_id=` + user_id,",id);

        return axios.post(`${TAKING_API_BASE_URL}/deleteTaking?id=${id}`, { title, start});
    }

    // eslint-disable-next-line class-methods-use-this
    uploadImg(data){
        console.log("uploadImg=" ,data);
        alert('hell...')
        return axios.post(`/upload`, {data});
    }
}

export default new CalendarService();