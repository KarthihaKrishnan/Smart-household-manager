import express from 'express';
import { loginUser, registerUser } from '../controllers/auth.controller.js';

const router = express.Router();

// POST route to register a new user
router.post('/register', registerUser);

// POST route to log in a user
router.post('/login', loginUser);

export default router;