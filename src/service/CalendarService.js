import axios from 'axios'; 
// eslint-disable-next-line import/no-unresolved
import authHeader from './auth-header';

// URL 정의
const CALENDAR_API_BASE_URL = "/api/calendar"; 
const TAKING_API_BASE_URL = "/api/taking"; 

// 캘린더 서비스
class CalendarService{

    // 사용자의 모든 캘린더 정보 가져오기
    // eslint-disable-next-line class-methods-use-this
    getAllCalendars(userid) {
        return axios.get(`${CALENDAR_API_BASE_URL}/calendarInfo?id=${userid}`,  { headers: authHeader() });
    }

    // 사용자의 캘린더에 약 복용 추가하기
    // eslint-disable-next-line class-methods-use-this
    calendarInsert(userid, title, start, end, color) {      
        return axios.post(`${CALENDAR_API_BASE_URL}/calendarInsert?id=${userid}` , { title, start, end, color}, { headers: authHeader() });
    }
    
    // 사용자의 복용 정보 가져오기
    // eslint-disable-next-line class-methods-use-this
    getTakingPerUser(id){
        return axios.get(`${TAKING_API_BASE_URL}/takingUser?id=${id}`,{ headers: authHeader() });
    }

    // 사용자의 복용 정보 Update
    // eslint-disable-next-line class-methods-use-this
    updateTaking(id, title, start, sideEffectName){
        return axios.post(`${TAKING_API_BASE_URL}/updateTaking?id=${id}`, { title, start, sideEffectName}, { headers: authHeader() });
    }

    // 사용자의 복용 정보 Delete
    // eslint-disable-next-line class-methods-use-this
    deleteTaking(id, title, start){
        return axios.post(`${TAKING_API_BASE_URL}/deleteTaking?id=${id}`, { title, start}, { headers: authHeader() });
    }

    // 처방전 image Upload
    // eslint-disable-next-line class-methods-use-this
    uploadImg(data){
        return axios.post(`/upload`, {data}, { headers: authHeader() });
    }
}

export default new CalendarService();