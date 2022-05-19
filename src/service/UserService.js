import axios from 'axios'; 
// eslint-disable-next-line import/no-unresolved
import authHeader from './auth-header';

// URL 정의
const USER_API_BASE_URL = "/api/user"; 

// 사용자 서비스
class UserService{

    // 사용자 정보 가져오기
    // eslint-disable-next-line class-methods-use-this
    getUserInfo(userid) {
        return axios.get(`${USER_API_BASE_URL}?id=${userid}`, { headers: authHeader() });
    }

    // 사용자 정보 Update
    // eslint-disable-next-line class-methods-use-this
    updateUserInfo(userid, user) {
        return axios.put(`${USER_API_BASE_URL}/${userid}`, user, { headers: authHeader() });
    }
}

export default new UserService();