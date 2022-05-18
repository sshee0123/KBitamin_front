import axios from 'axios'; 
// eslint-disable-next-line import/no-unresolved
import authHeader from './auth-header';

const DASHBOARD_API_BASE_URL = "/api/dashboard"; 

class DashboardService{

    // eslint-disable-next-line class-methods-use-this
    getRecommendMedi(id) {
        return axios.post(`${DASHBOARD_API_BASE_URL}/recommendMedi?id=${id}`,  { headers: authHeader() });
    }

    // eslint-disable-next-line class-methods-use-this
    getSideEffectMediPerUser(id){
        console.log("front Dashboard ~~~~ service getTakingPerUser?user_id=` + user_id,",id);
    
        return axios.get(`${DASHBOARD_API_BASE_URL}/sideEffectMedi?id=${id}`,{ headers: authHeader() });
    }
}
export default new DashboardService();