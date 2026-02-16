import bcrypt from 'bcrypt';
import pool from '../config/db.js';

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


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const userResult = await pool.query(
            `
            SELECT * FROM users
            WHERE LOWER(email) = LOWER($1)
            `,
            [email.trim()]
        );
        
        if (userResult.rows.length === 0) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const user = userResult.rows[0];
        const trimmedPassword = password.trim();
        const passwordMatch = await bcrypt.compare(trimmedPassword, user.password);
        
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in environment variables");
            return res.status(500).json({ message: "Server configuration error" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user.id,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: "Failed to log in user" });
    }
}