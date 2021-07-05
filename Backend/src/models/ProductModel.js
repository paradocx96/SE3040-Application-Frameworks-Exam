const mongoose = require('mongoose');

const ProductModel = new mongoose.Schema({
    code: {type: String, required: true, trim: true},
    name: {type: String, required: true, trim: true},
    amount: {type: Number, required: true},
    size: {type: Number, required: true},
    categories:[{
        type: mongoose.Schema.Types.ObjectId, 
        required: false, 
        ref: 'categories'
    }]
});

const  Product = mongoose.model('products', ProductModel);
module.exports = Product;