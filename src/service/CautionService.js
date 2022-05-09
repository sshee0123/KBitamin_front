import axios from 'axios'; 
// eslint-disable-next-line import/no-unresolved
import authHeader from './auth-header';

const MEDICINE_API_BASE_URL = "/api/medicine"; 

class CautionService{
     // eslint-disable-next-line class-methods-use-this
    //  getCautionByMediName(name) {
    //     console.log("front service CautionService` + name,",name);

    //     return axios.get(`${MEDICINE_API_BASE_URL}/detailOneMediInfo?name=${name}`,{ headers: authHeader() });
    // }

}
export default new CautionService();