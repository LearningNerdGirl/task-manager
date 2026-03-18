const db = require("../config/db");

function getAllTasks(callback) {
  const sql = "SELECT * FROM tasks ORDER BY created_at DESC";
  db.query(sql, callback);
}

function createTask(title, description, callback) {
  const sql = "INSERT INTO tasks (title, description) VALUES (?, ?)";
  db.query(sql, [title, description], callback);
}

function updateTask(id, title, description, status, callback) {
  const sql = `
    UPDATE tasks 
    SET title=?, description=?, status=? 
    WHERE id=?`;
    
  db.query(sql, [title, description, status, id], callback);
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