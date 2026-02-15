import express from 'express';
import { registerUser } from '../controllers/auth.controller.js';

const router = express.Router();

// POST route to register a new user
router.post('/register', registerUser);

export default router;