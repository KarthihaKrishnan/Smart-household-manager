import express from "express";
import { getTasks, postTask, deleteTask, updateTask} from '../controllers/tasks.controller.js';
import { authenticateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST route to add a task
router.post('/', authenticateUser, postTask);

// GET route to fetch all tasks
router.get('/', authenticateUser, getTasks);
    
// PUT route to update the Item status
router.patch('/:id', authenticateUser, updateTask);

// DELETE route to delete the item from all tasks
router.delete('/:id', authenticateUser, deleteTask);

export default router; 