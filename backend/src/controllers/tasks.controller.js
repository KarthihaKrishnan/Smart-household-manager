import pool from '../config/db.js';

// GET function to return all tasks
export const getTasks = async(req, res) => {
  try { 
    const result = await pool.query(
      `
      SELECT * FROM tasks
      WHERE user_id = $1
      ORDER BY created_at DESC
      `, [req.user.id]);
    res.status(201).json(result.rows);
  } catch (error) {
    next(error);
  }
};

// POST function to add a task
export const postTask = async (req, res) => {
    console.log('POST /tasks called', req.body);
    const { title } = req.body;
    if (!title ||  typeof title !== 'string') {
        return res.status(400).json({ message: "Task title is required" });
    }

    const trimmedTitle = title.trim();

    if (trimmedTitle.length === 0) {
        return res.status(400).json({ message: "Task title cannot be empty" });
    }

    if (trimmedTitle.length > 100) {
        return res.status(400).json({ message: "Task title is too long" });
    }

    try {
      const duplicateCheck = await pool.query(
        `
        SELECT id FROM tasks
        WHERE LOWER(title) = LOWER($1)
        `,
        [trimmedTitle]
      );

      if (duplicateCheck.rows.length > 0) {
        return res.status(409).json({ message: 'Task already exists' });
      }

      const result = await pool.query(
        `
        INSERT INTO tasks (title, completed, user_id) 
        VALUES ($1, $2, $3) 
        RETURNING *
        `,
        [trimmedTitle, false, req.user.id]
    );
    res.status(201).json(result.rows[0]);
    
  } catch (error) {
    next(error);
  }
};

// PATCH function to toggle task completion status
export const updateTask = async (req, res) => {
  console.log('PATCH /tasks/:id called', req.params, req.params.id, req.body);
  const { id } = req.params;
  const { status } = req.body;

  if (!id || id == '') {
    return res.status(400).json({ message: `Task with ID ${id} is required` });
  }

  if (typeof status !== 'boolean') {
    return res.status(400).json({ message: 'Status must be boolean' });
  }

  try {
    const result = await pool.query(
      `
      UPDATE tasks 
      SET completed = $1,
          updated_at = NOW()
      WHERE id = $2 
      AND user_id = $3
      RETURNING *
      `,
      [status, id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// DELETE function to remove a task by id
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Task ID is required' });
  }

  try {
    const result = await pool.query(
      `
      DELETE FROM tasks 
      WHERE id = $1 AND user_id = $2
      RETURNING *
      `,
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.json(result.rows[0]);

  } catch (error) {
    next(error);
  }
};

