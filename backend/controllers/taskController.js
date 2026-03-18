const db = require("../config/db");

// GET
exports.getTasks = (req, res) => {
  const userId = req.userId;
  console.log("USER ID FROM TOKEN:", req.userId);
  db.query(
    "SELECT * FROM tasks WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

// CREATE
exports.createTask = (req, res) => {
  const { title, description, status } = req.body;
  const userId = req.userId;
  db.query(
    "INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)",
    [title, description, status, userId],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task created" });
    }
  );
};

// UPDATE
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const userId = req.userId;
  const query = `
    UPDATE tasks 
    SET 
      title = COALESCE(?, title),
      description = COALESCE(?, description),
      status = COALESCE(?, status)
    WHERE id = ? AND user_id = ?
  `;
  db.query(
    query,
    [title, description, status, id, userId],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task updated" });
    }
  );

};

// DELETE
exports.deleteTask = (req, res) => {

  const { id } = req.params;
  const userId = req.userId;

  db.query(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    [id, userId],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task deleted" });
    }
  );

};