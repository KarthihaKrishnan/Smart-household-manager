// LocalStorage key
const STORAGE_KEY = "smart_grocery_items";

// This will hold all items from memory
//let items = [];

//const addButton = document.getElementById("addItem");
//const inputBox = document.getElementById("itemInput");
const pendingList = document.getElementById("itemList");
const purchasedList = document.getElementById("purchasedList");

// Load from localStorage (Helpers)
/* function loadItems() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }catch {
        return [];
    } 
} */

function getItems() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Save to localStorage
/* function saveItems(items = []) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
} */

function saveItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// On page load — read storage & assign to same array
items = getItems();
render();

//Add new item
/* addButton.addEventListener("click", () => {
    const value = inputBox.value.trim();
    if (value === "") return;

    items.push({
        id: crypto.randomUUID(),
        name: value,
        status: "pending",
        createdAt: Date.now()       
    });

    saveItems(items);
    render();
    inputBox.value = "";
}); */

// Render function
/* function render() {
    listBox.innerHTML = "";
    purchasedList.innerHTML = "";

    items.forEach((item) => {
        const li = document.createElement("li");

        //Create Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.status === "purchased";
        
        // Checkbox change
        checkbox.addEventListener("change", () => {
            item.status = checkbox.checked ? "purchased" : "pending";
            saveItems(items);
            render();           
        });

        // Update item status
        const span = document.createElement("span");
        span.textContent = item.name;
        // apply strike through if purchased
        if (item.status === "purchased") {
            span.classList.add("purchased");
        }

        // Delete items
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.type = "button";

        deleteBtn.addEventListener("click", () => {
            items = items.filter(i => i.id !== item.id);
            saveItems(items);
            render();
        }); 
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        // add li to the main list
        if (item.status === "purchased") {
            purchasedList.appendChild(li);
        }else{
            listBox.appendChild(li);
        }
    });
} */
function renderItems () {
    const items = getItems();

    //clear UI
    pendingList.innerHTML = "";
    purchasedList.innerHTML = "";

    items.forEach(item => {
        if (item.status === "pending") {
            renserPendingItem(item);
        }else {
            renderPurchasedItem(item);
        }        
    });
}

function addItem (name) {
    const items = getItems();

    items.push({
        id: crypto.randomUUID(),
        item_name: name,
        status: "pending"
    });

    saveItems(items);
    renderItems();
}








