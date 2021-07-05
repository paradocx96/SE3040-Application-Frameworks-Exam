const express = require('express');
const router = express.Router();
const controller = require('../controllers/CategoryController');

module.exports = function() {
    // http://localhost:8090/category
    router.post('/', controller.createCategory);

    // http://localhost:8090/category
    router.get('/', controller.getCategory);

    // http://localhost:8090/category/id
    router.get('/:id', controller.getCategoryById);

    // http://localhost:8090/category/products/id
    router.get('/products/:id', controller.getProductsByCategory);

    return router;
};