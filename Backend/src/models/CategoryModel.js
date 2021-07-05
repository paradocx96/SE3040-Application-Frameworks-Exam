const mongoose = require('mongoose');

const CategoryModel = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    description: {type: String, required: true, trim: true},
    products:[{
        type: mongoose.Schema.Types.ObjectId, 
        required: false, 
        ref: 'products'
    }]
});

const  Category = mongoose.model('categories', CategoryModel);
module.exports = Category;