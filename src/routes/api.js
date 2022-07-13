const express = require('express');
const ProfileController = require('../controllers/ProfileController');
const TodoListController = require('../controllers/TodoListController');
const AuthVerifyMiddleware = require('../middleware/AuthVerifyMiddleware');

const router = express.Router();

router.post('/createProfile', ProfileController.CreateProfile);
router.post('/loginUser', ProfileController.LoginUser);
router.get('/selectProfile', AuthVerifyMiddleware, ProfileController.SelectProfile);
router.patch('/updateProfile', AuthVerifyMiddleware, ProfileController.UpdateProfile);
router.post('/createTodo', AuthVerifyMiddleware, TodoListController.CreateTodo);
router.get('/selectTodo', AuthVerifyMiddleware, TodoListController.SelectTodo);
router.patch('/updateTodo', AuthVerifyMiddleware, TodoListController.UpdateTodo);
router.delete('/deleteTodo', AuthVerifyMiddleware, TodoListController.DeleteTodo);
router.get('/filterTodoByDate', AuthVerifyMiddleware, TodoListController.FilterTodoByDate);

module.exports = router;
