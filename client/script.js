// LocalStorage key
const STORAGE_KEY = "smart_grocery_items";

// This will hold all items from memory
let items = [];

const addButton = document.getElementById("addItem");
const inputBox = document.getElementById("itemInput");
const pendingList = document.getElementById("itemList");
const purchasedList = document.getElementById("purchasedList");

addButton.addEventListener("click", () => {
    const value = inputBox.value.trim();
    if (!value) return;

    addItem(value);
    inputBox.value = "";
}); 

   
async function loadItemsFromBackend() {
    try {
        const response = await fetch("http://localhost:3001/api/grocery-items");
        items = await response.json();
        renderItems();
    }catch (error) {
        console.error("Failed to load items from backend", error);
    }
}

// On page load — read storage & assign to same array
loadItemsFromBackend();

//Add new item
async function addItem(name) {
    if (!name) return;

    try {
        const response = await fetch("http://localhost:3001/api/grocery-items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ item_name: name})
        });
        const newItem = await response.json();

        // add backend-created item to memory
        items.push(newItem);

        renderItems();
    }catch (error) {
        console.error("Failed to add item", error);
    }
}

// Delete items
async function deleteItem(id) {
    try {
        await fetch(`http://localhost:3001/api/grocery-items/${id}`, {
            method: "DELETE"
        });
        items = items.filter(item => item.id !== id);

        renderItems();
    }catch (error) {
        console.error("Failed to add item", error);
    }
}
        

// Render function
function renderPendingItem(item) {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = false;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.type = "button";

    deleteBtn.addEventListener("click", () => {
        console.log("DELETE clicked for id: ", item.id);
        deleteItem(item.id);
    }); 

    checkbox.addEventListener("change", async() => {
        try {
            const response = await fetch(
                `http://localhost:3001/api/grocery-items/${item.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ status: "purchased" })
                }
            );
            const updatedItem = await response.json();

            const index = items.findIndex(i => i.id === updatedItem.id);
            items[index] = updatedItem;
            renderItems();
        }catch (error) {
            console.error("Failed to update item", error);
        }
    });
    
    const span = document.createElement("span");
    span.textContent = item.item_name;

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    pendingList.appendChild(li);
}

function renderPurchasedItem(item) {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = true;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.type = "button";

    deleteBtn.addEventListener("click", () => {
        console.log("DELETE clicked for id: ", item.id);
        deleteItem(item.id);
    }); 

    checkbox.addEventListener("change", async() => {
        try {
            const response = await fetch(
                `http://localhost:3001/api/grocery-items/${item.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ status: "pending"})
                }
            );
            const updatedItem = await response.json();

            const index = items.findIndex(i => i.id === updatedItem.id);
            items[index] = updatedItem;

            renderItems();
        }catch(error) {
            console.error("Failed to update item", error);
        }
    });

    const span = document.createElement("span");
    span.textContent = item.item_name;
    span.classList.add("purchased");

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    purchasedList.appendChild(li);
}
       
function renderItems () {
    //clear UI
    pendingList.innerHTML = "";
    purchasedList.innerHTML = "";

    items.forEach(item => {
        if (item.status === "pending") {
            renderPendingItem(item);
        }else {
            renderPurchasedItem(item);
        }        
    });
}










