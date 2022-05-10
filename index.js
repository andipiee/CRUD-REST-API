require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const mongodbUrl = process.env.DATABASE_URL;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use(express.json());
app.use('/api', routes);

mongoose.connect(mongodbUrl);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected!');
});

app.listen(3000, () => {
    console.log('server is running')
})