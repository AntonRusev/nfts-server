const express = require('express');
const mongoose = require('mongoose');
const authController = require('./controllers/authController');
const dataController = require('./controllers/dataController');
const cors = require('./middlewares/cors');
const session = require('./middlewares/session');
const trimBody = require('./middlewares/trimBody');

start();

const connectionString = 'mongodb://localhost:27017/nfts'

async function start() {
    await mongoose.connect(connectionString)

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(trimBody());
    app.use(session());

    app.get('/', (req, res) => {
        res.json({message: 'REST Service operational'});
    });

    app.use('/users', authController);
    app.use('/data/catalog', dataController);

    // app.listen(3030, () => console.log('REST service started')); TODO
    app.listen(5500, () => console.log('REST service started'));
}