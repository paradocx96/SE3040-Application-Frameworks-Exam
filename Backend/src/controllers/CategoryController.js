const Category = require('../models/CategoryModel');

const createCategory = async (req, res) => {
    if (req.body) {
        const category = new Category(req.body);
        await category.save()
            .then(data => {
                res.status(200).send({ data: data });
            }).catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getCategory = async (req, res) => {
    await Category.find({})
        .then(data => {
            res.status(200).send({ data: data });
        }).catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getCategoryById = async (req, res) => {
    if (req.params && req.params.id) {
        await Category.findById(req.params.id)
            .then(data => {
                console.log(data);
                res.status(200).send({ data: data });
            }).catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getProductsByCategory = async (req, res) => {
    if (req.params && req.params.id) {
        await Category.findById(req.params.id).populate('products', 'code name amount size')
            .then(data => {
                res.status(200).send({ products: data.products });
            }).catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}



module.exports = {
    createCategory,
    getCategory,
    getCategoryById,
    getProductsByCategory
}