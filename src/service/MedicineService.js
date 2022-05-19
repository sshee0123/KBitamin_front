import axios from 'axios'; 
// eslint-disable-next-line import/no-unresolved
import authHeader from './auth-header';

// URL 정의
const MEDICINE_API_BASE_URL = "/api/medicine"; 

// 약 서비스
class MedicineService{

    // 모든 약 정보 가져오기
    // eslint-disable-next-line class-methods-use-this
    getAllMedicineInfo() {
        return axios.get(`${MEDICINE_API_BASE_URL}/mediInfo`,  { headers: authHeader() });
    }

    // 약 이름으로 약 한 개 정보 가져오기
     // eslint-disable-next-line class-methods-use-this
    getMedicineByName(name) {
        return axios.get(`${MEDICINE_API_BASE_URL}/detailOneMediInfo?name=${name}`,{ headers: authHeader() });
    }

    // 외형정보 버튼으로 약 정보 가져오기
    // eslint-disable-next-line class-methods-use-this
    getMedicineByButtonFilter(shapeId, colorId, formulationId, dividelineId) {
        return axios.get(`${MEDICINE_API_BASE_URL}/buttonFilter?shapeId=${shapeId}&colorId=${colorId}&formulationId=${formulationId}&dividelineId=${dividelineId}`);
   
    }
}

export default new MedicineService();