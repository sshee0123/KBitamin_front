import axios from 'axios'; 
// eslint-disable-next-line import/no-unresolved
import authHeader from './auth-header';

const USER_API_BASE_URL = "/api/user"; 

class UserService{

    // eslint-disable-next-line class-methods-use-this
    getUserInfo(userid) {
        console.log('getUserInfo userid , ', userid);
        return axios.get(`${USER_API_BASE_URL}?id=${userid}`, { headers: authHeader() });
    }

    // eslint-disable-next-line class-methods-use-this
    updateUserInfo(userid, user) {
        console.log('updateUserInfo userid , ', userid);
        return axios.put(`${USER_API_BASE_URL}/${userid}`, user, { headers: authHeader() });
    }
}

export default new UserService();