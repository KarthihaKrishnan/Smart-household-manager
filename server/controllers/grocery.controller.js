let groceryList = [];

let idCounter = 1;

// POST function to add a grocery item
export function postGroceryItems(req, res) {
    const { item_name } = req.body;
    const status = "pending";

    const newItem = {
        id: groceryList.length+1,
        item_name,
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    if ( item_name ) {
        groceryList.push(newItem);
        res.status(201).json(newItem);
    }else {
        res.status(404).json({ message: "Item name is required!"});
    }
}


// GET function to return all grocery items
export function getGroceryItems(req, res) {
    res.status(200).json(groceryList);
}

//PUT function to update the status of a grocery item
export function updateGroceryItem(req, res) {
    const { id } = req.params;
    const { item_name, status } = req.body;

    const index = groceryList.findIndex(item => item.id === parseInt(id));

    if(index !== -1) {
        const groceryItem = groceryList[index];
        if (item_name) groceryItem.item_name = item_name;
        if (status) groceryItem.status = status;
        
        groceryItem.updated_at = new Date().toISOString();

        if (!groceryItem.created_at) {
            groceryItem.created_at = new Date().toISOString();  // Set created_at if not present
        }
        res.status(200).json({
            id: groceryItem.id,
            item_name: groceryItem.item_name,
            status: groceryItem.status,
            created_at: groceryItem.created_at,
            updated_at: groceryItem.updated_at
        });
    } else {
        res.status(404).json({ message: `Item with ID ${id} not found!` });
    }
}

// DELETE function to remove an item by id
export function deleteGroceryItems(req, res) {
    const { id } = req.params;

    const index = groceryList.findIndex(item => item.id === parseInt(id));

    if (index !== -1) {
        groceryList.splice(index, 1);
        res.status(204).end();
    }else {
        res.status(404).json({ message: `Item with ID ${id} not found!`});
    }
}