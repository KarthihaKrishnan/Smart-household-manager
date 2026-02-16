import pool from "../config/db.js";

// GET function to return all grocery items
export const getGroceryItems = async (req, res, next) => {
    try {
        const result = await pool.query(
            `
            SELECT * FROM grocery_items
            WHERE user_id = $1
            ORDER BY created_at DESC
            `,
            [req.user.id]);
            res.status(200).json(result.rows);
    }catch (error) {
        next(error);
    }
};

// POST function to add a grocery item
export const postGroceryItems = async (req, res, next) => {
    const { item_name } = req.body;

    if ( !item_name || typeof item_name !== "string" ) {
        return res.status(400).json({ message: "Item name must be a string"});
    }

    const trimmedName = item_name.trim();

    if  (trimmedName.length === 0) {
        return res.status(400).json({ message: "Item name cannot empty" });
    }

    if (trimmedName.length > 100) {
        return res.status(400).json({ message: "Item name is too long" });
    }

    try {
        const duplicateCheck = await pool.query(
            `
            SELECT id FROM grocery_items
            WHERE LOWER(item_name) = LOWER($1)
            AND user_id = $2
            `,
            [trimmedName, req.user.id]
        );

        if (duplicateCheck.rows.length > 0) {
            return res.status(409).json({ message: "Item already exists" });
        }

        const result = await pool.query(
            `
            INSERT INTO grocery_items (item_name, status, user_id)
            VALUES($1, $2, $3)
            RETURNING *
            `, 
            [trimmedName, "pending", req.user.id]
        );
        res.status(201).json(result.rows[0]);

    }catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({ 
            message: "Item already exists" 
            });
        }
        next(error);
    }
};     

//PUT function to update the status of a grocery item
export const updateGroceryItem = async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;

    if ( !id || id == "" ) {
        return res.status(400).json({ message: `Item with ID ${id} is required` });
    }

    if (!status) {
        return res.status(400).json({ message: "Status is required" });
    }

    if ( !["pending", "purchased"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
    }

    try {
        const result = await pool.query(
            `
            UPDATE grocery_items
            SET status = $1,
                updated_at = NOW()
            WHERE id = $2 AND user_id = $3
            RETURNING *
            `,
            [status, id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json(result.rows[0]);
    }catch (error) {
        next(error);
    }
};

// DELETE function to remove an item by id
export const deleteGroceryItems = async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: `ID is required`});
    }

    try {
        const result = await pool.query (
            `
            DELETE FROM grocery_items
            WHERE id = $1 AND user_id = $2
            RETURNING *
            `,
            [id, req.user.id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json(result.rows[0]);
    }catch (error) {
        next(error);
    }
};


