const db = require("../config/db");

function getAllTasks(callback) {
  const sql = "SELECT * FROM tasks ORDER BY created_at DESC";
  db.query(sql, callback);
}

function createTask(title, description, status, priority, dueDate, callback) {
  const sql = "INSERT INTO tasks (title, description, status, priority, dueDate) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [title, description, status, priority, dueDate], callback);
}

function updateTask(id, title, description, status, priority, dueDate, callback) {
  const sql = `
    UPDATE tasks 
    SET title=?, description=?, status=?, priority=?, dueDate=? 
    WHERE id=?`;
    
  db.query(sql, [title, description, status, priority, dueDate, id], callback);
}

function deleteTask(id, callback) {
  const sql = "DELETE FROM tasks WHERE id=?";
  db.query(sql, [id], callback);
}

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
};