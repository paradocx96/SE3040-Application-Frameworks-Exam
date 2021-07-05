import axios from "axios";

const API_BASE_URL = 'http://localhost:8090/calculator';

export default new class CalculatorService {
    getCalculateValue(value) {
        return axios.post(API_BASE_URL + "/", value);
    }
}