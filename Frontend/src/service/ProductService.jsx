import axios from "axios";

const API_BASE_URL = 'http://localhost:8090/product';

export default new class ProductService {
    postProduct(value) {
        return axios.post(API_BASE_URL + "/", value);
    }

    getProducts(){
        return axios.get(API_BASE_URL);
    }

    getProductById(id) {
        return axios.get(API_BASE_URL + "/" + id);
    }

    deleteProductById(id) {
        return axios.delete(API_BASE_URL + "/" + id);
    }
}