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
    getMedicineByName(name) {
        console.log("MedicineService ",name);

        return axios.get(`${MEDICINE_API_BASE_URL}/detailOneMediInfo?name=${name}`,{ headers: authHeader() });
    }

    //  // eslint-disable-next-line class-methods-use-this
    //  getMedicineByButtonFilter(shapeId, colorId, formulationId, dividelineId) {
    //      console.log("getMedicineByButtonFilter",shapeId, colorId, formulationId, dividelineId);

    //      return axios.post(`${MEDICINE_API_BASE_URL}/buttonFilter`, { shapeId, colorId, formulationId, dividelineId });

    //  }

         // eslint-disable-next-line class-methods-use-this
         getMedicineByButtonFilter(shapeId, colorId, formulationId, dividelineId) {
            console.log("getMedicineByButtonFilter",shapeId, colorId, formulationId, dividelineId);
   
            return axios.get(`${MEDICINE_API_BASE_URL}/buttonFilter?shapeId=${shapeId}&colorId=${colorId}&formulationId=${formulationId}&dividelineId=${dividelineId}`);
   
        }
       
    






}

export default new MedicineService();