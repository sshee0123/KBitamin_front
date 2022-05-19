import axios from 'axios'; 
// eslint-disable-next-line import/no-unresolved
import authHeader from './auth-header';

// URL 정의
const DASHBOARD_API_BASE_URL = "/api/dashboard"; 

// 대시보드 서비스
class DashboardService{

    // 사용자가 피해야 할 약 추천 정보 가져오기
    // eslint-disable-next-line class-methods-use-this
    getRecommendMedi(id) {
        return axios.post(`${DASHBOARD_API_BASE_URL}/recommendMedi?id=${id}`,  { headers: authHeader() });
    }

    // 사용자가 부작용 있었던 약 정보 가져오기
    // eslint-disable-next-line class-methods-use-this
    getSideEffectMediPerUser(id){
        return axios.get(`${DASHBOARD_API_BASE_URL}/sideEffectMedi?id=${id}`,{ headers: authHeader() });
    }
}
export default new DashboardService();