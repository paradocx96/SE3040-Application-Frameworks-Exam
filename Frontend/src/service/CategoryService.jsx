import axios from "axios";

const API_BASE_URL = 'http://localhost:8090/category';

export default new class CategoryService {
    postCategory(value) {
        return axios.post(API_BASE_URL + "/", value);
    }

    getCategories(){
        return axios.get(API_BASE_URL);
    }

    getCategoryById(id) {
        return axios.get(API_BASE_URL + "/" + id);
    }

    getProductsByCategoryId(id) {
        return axios.get(API_BASE_URL + "/products/" + id);
    }
}