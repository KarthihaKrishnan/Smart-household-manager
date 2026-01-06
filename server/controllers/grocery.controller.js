import db from "../db/db.js";

let idCounter = 1;

// POST function to add a grocery item
export async function postGroceryItems(req, res) {
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
        const duplicateCheck = await db.query(
            `
            SELECT id FROM grocery_items
            WHERE LOWER(item_name) = LOWER($1)
            `,
            [trimmedName]
        );

        if (duplicateCheck.rows.length > 0) {
            return res.status(409).json({ message: "Item already exists" });
        }

        const result = await db.query(
            `
            INSERT INTO grocery_items (item_name, status)
            VALUES($1, $2)
            RETURNING *
            `, 
            [item_name, "pending"]
        );
        res.status(201).json(result.rows[0]);

    }catch (error) {
        console.error("Error creating grocery item: ", error);
        res.status(500).json({ message: "Failed to create grocery item" });
    }
}
        
// GET function to return all grocery items
export async function getGroceryItems (req, res) {
    try {
        const result = await db.query(`SELECT * FROM grocery_items`);
        res.status(201).json(result.rows);
    }catch (error) {
        console.error("Error loading the items: ", error);
        res.status(500).json({ message: "Failed to load grocery item" });
    }
}

//PUT function to update the status of a grocery item
export async function updateGroceryItem(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    if ( !id || id == "" ) {
        return res.status(400).json({ message: `Item with ID ${id} is required` });
    }

    if ( !status || !status.includes(value)) {
        return res.status(400).json({ message: "Status not valid" });
    }

    if ( !["pending", "purchased"].includes(status)) {
        return res.status(404).json({ message: "Invalid status value" });
    }

    try {
        const result = await db.query(
            `
            UPDATE grocery_items
            SET status = $1,
                updated_at = NOW()
            WHERE id = $2
            RETURNING *
            `,
            [status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.json(result.rows[0]);
    }catch (error) {
        console.error("Error updating grocery item: ", error);
        res.status(500).json({ message: "Failed to update grocery item" });
    }
}

// DELETE function to remove an item by id
export async function deleteGroceryItems(req, res) {
    const { id } = req.params;

    if (!id) {
        res.status(404).json({ message: `Item with ID ${id} not found!`});
    }

    try {
        const result = await db.query (
            `
            DELETE FROM grocery_items
            WHERE id = $1
            RETURNING *
            `,
            [id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json(result.rows[0]);
    }catch (error) {
        console.error("Error deleting grocery item: ", error);
        res.status(500).json({ message: "Failed to delete grocery item" });
    }
}

