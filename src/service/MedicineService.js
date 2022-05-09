import axios from 'axios'; 
// eslint-disable-next-line import/no-unresolved
import authHeader from './auth-header';

const MEDICINE_API_BASE_URL = "/api/medicine"; 

class MedicineService{

    // eslint-disable-next-line class-methods-use-this
    getAllMedicineInfo() {
        return axios.get(`${MEDICINE_API_BASE_URL}/mediInfo`,  { headers: authHeader() });
    }

    // eslint-disable-next-line class-methods-use-this
    // postMedicineByName(name){
    //             console.log("front postMedicineByName detailOneMediInfo?name=` + name,",name);
    //     return axios.post(`${MEDICINE_API_BASE_URL}/detailOneMediInfo`, name,{ headers: authHeader() });
    // }

     // eslint-disable-next-line class-methods-use-this
    getMedicineByName(name) {
        console.log("front service detailOneMediInfo?name=` + name,",name);

        return axios.get(`${MEDICINE_API_BASE_URL}/detailOneMediInfo?name=${name}`,{ headers: authHeader() });
    }


}

export default new MedicineService();