import axios from 'axios'; 
// eslint-disable-next-line import/no-unresolved
import authHeader from './auth-header';

const MEDICINE_API_BASE_URL = "/api/medicine"; 

class UsageService{
    //  eslint-disable-next-line class-methods-use-this
    getAllUsageByName(name) {
        console.log("UsageService` + name,",name);
        

        return axios.get(`${MEDICINE_API_BASE_URL}/detailUsageMediInfo?name=${name}`,{ headers: authHeader() });

        // return axios.get(`${MEDICINE_API_BASE_URL}/detailOneMediInfo?name=${name}`,{ headers: authHeader() });
    }

}
export default new UsageService();