// basic
const express = require('express');
const bodyParser = require('body-parser');

// security
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// database
const mongoose = require('mongoose');

// router
const router = require('./src/routes/api');

// express
const app = express();

// implement security middleware
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(cors());

// body parser implement
app.use(bodyParser.json());

// requrest rate limit implement
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3000,
});

app.use(limiter);

// mongodb database connection
const URI = 'mongodb://127.0.0.1:27017/Todo';
const option = { user: '', pass: '', autoIndex: true };
mongoose.connect(URI, option, (error) => {
    if (!error) {
        console.log('MongoDB Connection Successful');
    } else {
        console.log(error);
    }
});

// routing implement
app.use('/api/v1', router);
app.use('*', (req, res) => {
    res.status(404).json({ status: 'fail', data: 'Not Found' });
});

// export the module
module.exports = app;
