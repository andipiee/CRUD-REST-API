require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/userRoutes');

const mongodbUrl = process.env.DATABASE_URL;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use(express.json());
app.use('/api', routes);

mongoose.connect(mongodbUrl)
    .then(() => console.log('Connected to Database'))
    .catch((err) => console.error('error', err));

app.listen(3000, () => {
    console.log('server is running')
})