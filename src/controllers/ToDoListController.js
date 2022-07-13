/**
 * List Create
 * List Read
 * List Update
 * List Delete
 * List status change
 * List filter by date
 */

const TodoListModel = require('../models/TodoListModel');

exports.CreateTodo = (req, res) => {
    const { username } = req.headers;
    const reqBody = {
        UserName: username,
        ...req.body,
    };
    TodoListModel.create(reqBody, (error, data) => {
        if (!error) {
            res.status(200).json({ status: 'success', data });
        } else {
            res.status(400).json({ status: 'Failed', data: error });
        }
    });
};

exports.SelectTodo = (req, res) => {
    const { username } = req.headers;
    TodoListModel.find({ username }, (error, data) => {
        if (!error) {
            res.status(200).json({ status: 'success', data });
        } else {
            res.status(400).json({ status: 'Failed', data: error });
        }
    });
};

exports.UpdateTodo = (req, res) => {
    const { _id } = req.body;
    const updatedData = {
        ...req.body,
        TodoUpdateDate: Date.now(),
    };
    TodoListModel.updateOne({ _id }, { $set: updatedData }, (error, data) => {
        if (!error) {
            res.status(200).json({ status: 'success', data });
        } else {
            res.status(400).json({ status: 'Failed', data: error });
        }
    });
};

exports.DeleteTodo = (req, res) => {
    const { _id } = req.body;

    TodoListModel.deleteOne({ _id }, (error, data) => {
        if (!error) {
            res.status(200).json({ status: 'success', data });
        } else {
            res.status(400).json({ status: 'Failed', data: error });
        }
    });
};

exports.FilterTodoByStatus = (req, res) => {
    const { username } = req.headers;
    const { TodoStatus } = req.body;
    TodoListModel.find({ username, TodoStatus }, (error, data) => {
        if (!error) {
            res.status(200).json({ status: 'success', data });
        } else {
            res.status(400).json({ status: 'Failed', data: error });
        }
    });
};

exports.FilterTodoByDate = (req, res) => {
    const { username } = req.headers;
    const { From, To } = req.body;
    TodoListModel.find(
        { username, TodoCreateDate: { $gte: new Date(From), $lte: new Date(To) } },
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
