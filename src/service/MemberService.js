import axios from 'axios'; 

const MEMBER_API_BASE_URL = "/api/auth/"; 

class MemberService{
    
    // eslint-disable-next-line class-methods-use-this
    login(id, password) {
        console.log('login !');
        return axios.post(`${MEMBER_API_BASE_URL}/signin`, {id, password}).then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    // eslint-disable-next-line class-methods-use-this
    logout() {
        console.log('logout !');
        localStorage.removeItem("user");
    }

    // eslint-disable-next-line class-methods-use-this
    register(id, email, password, username, birthDate, phone, sex) {
        console.log('register !');
        return axios.post(`${MEMBER_API_BASE_URL}/signup` , { id, username, email, password, birthDate, phone, sex});
    }

    // eslint-disable-next-line class-methods-use-this
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }

}

export default new MemberService();