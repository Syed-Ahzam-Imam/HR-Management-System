// Task Controller
'use strict';

const { error } = require('winston');
const User = require('../models/userModel');
const Task = require('../models/taskModel')


class TaskController {
    static async createTask(req, res) {
        try {
            const { name, description, estimatedTime, deadline } = req.body;
            const task = await Task.create({
                name,
                description,
                estimatedTime,
                deadline
            });
            return res.status(201).json({ success: true, task });
        } catch (error) {
            console.error('Error creating task:', error);
            return res.status(500).json({ success: false, message: 'Failed to create task', error: error.message });
        }
    }

    static async assignTask(req, res) {
        try {
            const { taskId, assignedBy, assignedTo } = req.body;

            console.log(taskId, assignedBy, assignedTo);
            const task = await Task.findByPk(taskId);
            const assigner = await User.findByPk(assignedBy);
            const assignee = await User.findByPk(assignedTo);

            if (!task || !assigner || !assignee) {
                return res.status(404).json({ success: false, message: 'Task or User not found' });
            }

            // Check if the task is already assigned to the user
            const existingAssignment = await task.hasUser(assignee);
            if (existingAssignment) {
                return res.status(400).json({ success: false, message: 'Task already assigned to the user' });
            }

            // Update task status to "Assigned"
            await task.update({ status: 'Assigned' });

            await task.addUser(assignee, { through: { assignedBy } });

            return res.status(200).json({ success: true, message: 'Task assigned successfully' });
        } catch (error) {
            console.error('Error assigning task:', error);
            return res.status(500).json({ success: false, message: 'Failed to assign task', error: error.message });
        }
    }


    static async updateTaskDetails(req, res) {
        try {
            const { taskId, name, description, estimatedTime, deadline } = req.body;
            const task = await Task.findByPk(taskId);

            if (!task) {
                return res.status(404).json({ success: false, message: 'Task not found' });
            }

            // Update task details
            await task.update({
                name: name || task.name,
                description: description || task.description,
                estimatedTime: estimatedTime || task.estimatedTime,
                deadline: deadline || task.deadline
            });

            return res.status(200).json({ success: true, message: 'Task details updated successfully', task });
        } catch (error) {
            console.error('Error updating task details:', error);
            return res.status(500).json({ success: false, message: 'Failed to update task details', error: error.message });
        }
    }


    static async getAllTasks(req, res) {
        try {
            const tasks = await Task.findAll({
                include: [{
                    model: User,
                    through: 'TaskAssignments',
                    attributes: ['fname'] // Specify the attributes you want to include from the User model
                }]
            });
            return res.status(200).json({ success: true, tasks });
        } catch (error) {
            console.error('Error retrieving all tasks:', error);
            return res.status(500).json({ success: false, message: 'Failed to retrieve all tasks', error: error.message });
        }
    }


    static async getAllTasksByUserId(req, res) {
        try {
            const userId = req.params.userId;
            const user = await User.findByPk(userId, {
                include: [{ model: Task }]
            });

            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            return res.status(200).json({ success: true, tasks: user.Tasks });
        } catch (error) {
            console.error('Error retrieving tasks by user ID:', error);
            return res.status(500).json({ success: false, message: 'Failed to retrieve tasks by user ID', error: error.message });
        }
    }

    static async getAllTasksByUserId(req, res) {
        try {
            const userId = req.params.userId;
            const status = req.body.status;

            let tasks;
            const user = await User.findByPk(userId, {
                include: [{ model: Task }],
            });

            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            if (status) {
                if (status === 1) {
                    tasks = user.Tasks.filter(task => task.status === 'Not started');
                } else if (status === 2) {
                    tasks = user.Tasks.filter(task => task.status === 'Pending');
                } else if (status === 3) {
                    tasks = user.Tasks.filter(task => task.status === 'Completed');
                } else if (status === 4) {
                    tasks = user.Tasks.filter(task => task.status === 'Under review');
                } else {
                    return res.status(400).json({ success: false, message: 'Invalid status code' });
                }
            } else {
                tasks = user.Tasks;
            }

            return res.status(200).json({ success: true, tasks });
        } catch (error) {
            console.error('Error retrieving tasks by user ID:', error);
            return res.status(500).json({ success: false, message: 'Failed to retrieve tasks by user ID', error: error.message });
        }
    }

    static async updateTaskStatus(req, res) {
        try {
            const { taskId, status } = req.body;
            const task = await Task.findByPk(taskId);

            if (!task) {
                return res.status(404).json({ success: false, message: 'Task not found' });
            }

            let newStatus;

            switch (status) {
                case 'Started':
                    newStatus = 'Pending';
                    break;
                case 'Completed':
                    newStatus = 'Under review';
                    break;
                case 'Mark as completed':
                    newStatus = 'Completed';
                    break;
                default:
                    return res.status(400).json({ success: false, message: 'Invalid status' });
            }

            await task.update({ status: newStatus });

            return res.status(200).json({ success: true, message: 'Task status updated successfully', task });
        } catch (error) {
            console.error('Error updating task status:', error);
            return res.status(500).json({ success: false, message: 'Failed to update task status', error: error.message });
        }
    }

    static async deleteTask(req, res) {
        try {
            const taskId = req.params.taskId;
            const task = await Task.findByPk(taskId);

            if (!task) {
                return res.status(404).json({ success: false, message: 'Task not found' });
            }

            await task.destroy();

            return res.status(200).json({ success: true, message: 'Task deleted successfully' });
        } catch (error) {
            console.error('Error deleting task:', error);
            return res.status(500).json({ success: false, message: 'Failed to delete task', error: error.message });
        }
    }



    // Other controller methods for updating, deleting, and retrieving tasks can be added here
}

module.exports = TaskController;

