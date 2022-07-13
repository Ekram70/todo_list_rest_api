const mongoose = require('mongoose');

const DataSchema = mongoose.Schema(
    {
        UserName: { type: String },
        TodoSubject: { type: String, required: true },
        TodoDescription: { type: String, default: 'No Description' },
        TodoStatus: { type: String, default: 'Not Started' },
        TodoCreateDate: { type: Date, default: Date.now() },
        TodoUpdateDate: { type: Date, default: Date.now() },
    },
    // eslint-disable-next-line comma-dangle
    { versionKey: false }
);

const TodoListModel = mongoose.model('lists', DataSchema);

module.exports = TodoListModel;
