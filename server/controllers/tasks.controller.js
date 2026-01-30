import pool from '../db/db.js';

export const getTasks = async(req, res) => {
  console.log('GET /tasks called');

  const result = await pool.query('SELECT * FROM tasks');
  res.json(result.rows);
};

export const postTask = async (req, res) => {
    console.log('POST /tasks called', req.body);
    const { title } = req.body;
    if (!title ) {
        return res.status(400).json({ message: "Task title is required" });
    }

    try {
      const result = await pool.query(
        'INSERT INTO tasks (title, completed) VALUES ($1, false) RETURNING *',
        [title]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting task:', error);
    res.status(500).json({ message: 'Failed to post task' });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.json({message: 'Task deleted successfully'});

  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json({ message: 'Failed to delete task' });
  }
}

export const updateTask = async (req, res) => {
  console.log('PATCH /tasks/:id called', req.params, req.params.id, req.body);
  const { id } = req.params;

  try {
    const result = await pool.query(
      'UPDATE tasks SET completed = NOT completed WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating task: ', error);
    return res.status(500).json({ message: 'Failed to update task' });
  }
};