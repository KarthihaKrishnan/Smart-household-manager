import express from "express";
import { postGroceryItems, getGroceryItems, deleteGroceryItems, updateGroceryItem } from '../controllers/grocery.controller.js';

const router = express.Router();

// POST route to add a grocery item
router.post('/', postGroceryItems);

// GET route to fetch all grocery items
router.get('/', getGroceryItems);

// PUT route to update the Item status
router.patch('/:id', updateGroceryItem);

// DELETE route to delete the item from all grocery items
router.delete('/:id', deleteGroceryItems);

export default router; 