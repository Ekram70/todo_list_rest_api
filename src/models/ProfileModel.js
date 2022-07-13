const mongoose = require('mongoose');

const DataSchema = mongoose.Schema(
    {
        FirstName: { type: String },
        LastName: { type: String },
        Email: { type: String, unique: true },
        Mobile: { type: String, unique: true },
        UserName: { type: String, unique: true },
        Password: { type: String },
    },
    // eslint-disable-next-line comma-dangle
    { versionKey: false }
);

const ProfileModel = mongoose.model('profiles', DataSchema);

module.exports = ProfileModel;
