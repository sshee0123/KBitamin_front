import axios from 'axios'; 
// eslint-disable-next-line import/no-unresolved
import authHeader from './auth-header';

const MEDICINE_API_BASE_URL = "/api/medicine"; 
const TAKING_API_BASE_URL = "/api/taking"; 

class MedicineService{

    // eslint-disable-next-line class-methods-use-this
    getAllMedicineInfo() {
        return axios.get(`${MEDICINE_API_BASE_URL}/mediInfo`,  { headers: authHeader() });
    }

     // eslint-disable-next-line class-methods-use-this
    getMedicineByName(name) {
        console.log("MedicineService ",name);

        return axios.get(`${MEDICINE_API_BASE_URL}/detailOneMediInfo?name=${name}`,{ headers: authHeader() });

    }

    // eslint-disable-next-line class-methods-use-this
    getTakingPerUser(id){
        console.log("front service getTakingPerUser?user_id=` + user_id,",id);

        return axios.get(`${TAKING_API_BASE_URL}/takingUser?id=${id}`,{ headers: authHeader() });
    }

}

export default new MedicineService();