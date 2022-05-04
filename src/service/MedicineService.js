import axios from 'axios'; 
// eslint-disable-next-line import/no-unresolved
import authHeader from './auth-header';

const MEDICINE_API_BASE_URL = "/api/medicine"; 

class MedicineService{

    // eslint-disable-next-line class-methods-use-this
    getAllMedicineInfo() {
        console.log('MedicineService : 약 정보 모두 가져오기');
        return axios.get(`${MEDICINE_API_BASE_URL}/mediInfo`);
    }

}

export default new MedicineService();