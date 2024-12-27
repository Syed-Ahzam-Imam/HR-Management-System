// Task Routes
'use strict';

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Create a new task
router.post('/', taskController.createTask);

router.put('/', taskController.updateTaskDetails);

// Assign task to users
router.post('/assign', taskController.assignTask);

// Get all tasks
router.get('/', taskController.getAllTasks);

// Get all tasks assigned to a user
router.get('/user/:userId', taskController.getAllTasksByUserId);
// Other routes for updating, deleting, and retrieving tasks can be added here

router.put('/status', taskController.updateTaskStatus);

router.delete('/:taskId', taskController.deleteTask);


module.exports = router;
