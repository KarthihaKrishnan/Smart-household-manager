import express from "express";
import { getTasks, postTask, deleteTask, updateTask} from '../controllers/tasks.controller.js';
const router = express.Router();

// POST route to add a task
router.post('/', postTask);

// GET route to fetch all tasks
router.get('/', getTasks);
    
// PUT route to update the Item status
router.patch('/:id', updateTask);

// DELETE route to delete the item from all tasks
router.delete('/:id', deleteTask);

export default router; 