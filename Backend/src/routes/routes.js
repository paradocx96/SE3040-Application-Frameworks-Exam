const ProductApi = require('../api/ProductApi');
const CategoryApi = require('../api/CategoryApi');

function routes(app) {
    app.use('/product', ProductApi());
    app.use('/category', CategoryApi());
}

module.exports=routes;