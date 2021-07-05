const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const dbConnection = require('./src/database/dbConnection');
const routes = require('./src/routes/routes');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT;

// For Checking API
app.route('/').get((req, res) => {
  res.send('<h1>AF FINAL EXAM 2021 - BACKEND</h1>');
});

app.listen(PORT, () => {
  console.log(`Server Started! Running on : http://localhost:${PORT}`);
  dbConnection();
  routes(app);
});