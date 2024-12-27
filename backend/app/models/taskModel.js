// Task Model
'use strict';

const { DataTypes } = require('sequelize');
const db = require('../../config/dbConfig');
const User = require('./userModel');

const Task = db.define('Task', {
  taskId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estimatedTime: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  deadline: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Not started'
  }
}, {
  timestamps: false,
  tableName: 'tasks'
});

Task.belongsToMany(User, { through: 'TaskAssignments' });
User.belongsToMany(Task, { through: 'TaskAssignments' });

module.exports = Task;

