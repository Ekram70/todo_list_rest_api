const mongoose = require('mongoose');

const DataSchema = mongoose.Schema(
    {
        FirstName: { type: String, required: true },
        LastName: { type: String, required: true },
        Email: { type: String, unique: true, required: true },
        Mobile: { type: String, unique: true, required: true },
        UserName: { type: String, unique: true, required: true },
        Password: { type: String, required: true },
    },
    // eslint-disable-next-line comma-dangle
    { versionKey: false }
);

const ProfileModel = mongoose.model('profiles', DataSchema);

module.exports = ProfileModel;
