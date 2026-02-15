import bcrypt from 'bcrypt';
import pool from '../db/db.js';

// Controller function to handle user registration
export const registerUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (trimmedEmail.length === 0) {
        return res.status(400).json({ message: "Email cannot be empty" });
    }

    if (trimmedEmail.length > 255) {
        return res.status(400).json({ message: "Email is too long" });
    }

    if (trimmedPassword.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    try {
        const duplicateCheck = await pool.query(
            `
            SELECT * FROM users
            WHERE LOWER(email) = LOWER($1)
            `,
            [trimmedEmail]
        );

        if (duplicateCheck.rows.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword =  await bcrypt.hash(trimmedPassword, 10);

        const newUser = await pool.query(
            `
            INSERT INTO users (email, password)
            VALUES ($1, $2)
            RETURNING id, email
            `,
            [trimmedEmail, hashedPassword]
        );
        return res.status(201).json({
            message: "User registered successfully",
            user: newUser.rows[0]
        });
        } catch (error) {
            console.error("Error registering user:", error);
            return res.status(500).json({ message: "Failed to register user" });    
        }
}