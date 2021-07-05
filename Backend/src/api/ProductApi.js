const express = require('express');
const router = express.Router();
const controller = require('../controllers/ProductController');

module.exports = function() {
    // http://localhost:8090/product
    router.post('/', controller.createProduct);

    // http://localhost:8090/product
    router.get('/', controller.getProducts);

    // http://localhost:8090/product/id
    router.get('/:id', controller.getProductById);

    // http://localhost:8090/product/id
    router.delete('/:id', controller.deleteProductById);

    return router;
};