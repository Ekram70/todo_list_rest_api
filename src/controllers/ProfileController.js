/**
 * User Registration
 * User Profile Read
 * User Profile Update
 */
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const ProfileModel = require('../models/ProfileModel');

// path of env file
dotenv.config({
    path: '../../config.env',
});

exports.CreateProfile = (req, res) => {
    const reqBody = req.body;
    ProfileModel.create(reqBody, (error, data) => {
        if (!error) {
            res.status(200).json({ status: 'success', data });
        } else {
            res.status(400).json({ status: 'Failed', data: error });
        }
    });
};

exports.LoginUser = (req, res) => {
    const { UserName, Password } = req.body;

    ProfileModel.find(
        { UserName, Password },
        {
            Password: 0,
            _id: 0,
        },
        (error, data) => {
            if (!error && data.length > 0) {
                // create jwt auth token
                const payLoad = {
                    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
                    data: data[0],
                };

                const token = jwt.sign(payLoad, `${process.env.JWT_SECRET_KEY}`);

                res.status(200).json({ status: 'success', token, data });
            } else {
                res.status(401).json({ status: 'unauthorized', data: error });
            }
            // eslint-disable-next-line comma-dangle
        }
    );
};

exports.SelectProfile = (req, res) => {
    const { username } = req.headers;

    ProfileModel.find(
        { username },
        {
            Password: 0,
            _id: 0,
        },
        (error, data) => {
            if (!error) {
                res.status(200).json({ status: 'success', data });
            } else {
                res.status(400).json({ status: 'Failed', data: error });
            }
            // eslint-disable-next-line comma-dangle
        }
    );
};

exports.UpdateProfile = (req, res) => {
    const { username } = req.headers;
    const reqBody = req.body;

    ProfileModel.updateOne(
        { username },
        {
            $set: reqBody,
        },
        (error, data) => {
            if (!error) {
                res.status(200).json({ status: 'success', data });
            } else {
                res.status(400).json({ status: 'Failed', data: error });
            }
            // eslint-disable-next-line comma-dangle
        }
    );
};
