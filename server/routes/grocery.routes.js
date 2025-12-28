import express from "express";
import { postGroceryItems, getGroceryItems } from '../controllers/grocery.controller.js';

const router = express.Router();

// POST route to add a grocery item
router.post('/grocery-items', postGroceryItems);

// GET route to fetch all grocery items
router.get('/grocery-items', getGroceryItems);

export default router; 