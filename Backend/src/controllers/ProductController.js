const Product = require('../models/ProductModel');

const createProduct = async (req, res) => {
    if (req.body) {
        const product = new Product(req.body);
        await product.save()
            .then(data => {
                res.status(200).send({ data: data });
            }).catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getProducts = async (req, res) => {
    await Product.find({})
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getProductById = async(req, res) => {
    if (req.params && req.params.id) {
        await Product.findById(req.params.id)
            .then(data => {
                console.log(data);
                res.status(200).send({ data });
            }).catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const deleteProductById = async(req, res) => {
    if (req.params && req.params.id) {
        await Product.findOneAndRemove({ '_id': req.params.id })
            .then(data => {
                res.status(200).send({ data: data });
            }).catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    deleteProductById
}