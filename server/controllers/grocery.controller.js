let groceryList = [];

let idCounter = 1;

export function postGroceryItems(req, res) {
    const { item_name, status = "pending" } = req.body;

    if ( item_name ) {
        groceryList.push({ 
            id: idCounter++,
            item_name,
            status,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
         });
        res.status(201).json(groceryList);
    }else {
        res.status(400).json({ message: "Item name is required!"});
    }
}

export function getGroceryItems(req, res) {
    res.status(200).json(groceryList);
}