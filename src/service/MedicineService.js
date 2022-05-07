import axios from 'axios'; 
// eslint-disable-next-line import/no-unresolved
import authHeader from './auth-header';

const MEDICINE_API_BASE_URL = "/api/medicine"; 

class MedicineService{

    // eslint-disable-next-line class-methods-use-this
    getAllMedicineInfo() {
        return axios.get(`${MEDICINE_API_BASE_URL}/mediInfo`,  { headers: authHeader() });
    }

}

export default new MedicineService();