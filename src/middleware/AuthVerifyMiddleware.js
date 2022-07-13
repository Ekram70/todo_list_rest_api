/**
 * token verify and login verify
 */
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// path of env file
dotenv.config({
    path: '../../config.env',
});

module.exports = (req, res, next) => {
    const { token } = req.headers;

    jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (error, decoded) => {
        if (!error) {
            // get username from decoded data and add username to request headers
            req.headers.username = decoded.data.UserName;

            next();
        } else {
            res.status(401).json({ status: 'unauthorized', data: error });
        }
    });
};
