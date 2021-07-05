const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGODB_URI = process.env.MONGODB_LOCAL_URI;
// const MONGODB_URI = process.env.MONGODB_CLUSTER_URI;

function dbConnection() {
    return mongoose.connect(MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Database Connected Successfully!');
    }).catch((error) => {
      console.log('Database Error : ' + error.message);
    })
}

module.exports = dbConnection;