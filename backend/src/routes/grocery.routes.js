import express from "express";
import { postGroceryItems, getGroceryItems, deleteGroceryItems, updateGroceryItem } from '../controllers/grocery.controller.js';
import { authenticateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST route to add a grocery item
router.post('/', authenticateUser, postGroceryItems);

// GET route to fetch all grocery items
router.get('/', authenticateUser, getGroceryItems);

// PUT route to update the Item status
router.patch('/:id', authenticateUser, updateGroceryItem);

// DELETE route to delete the item from all grocery items
router.delete('/:id', authenticateUser, deleteGroceryItems);

export default router; 