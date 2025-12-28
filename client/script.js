//import { response } from "express";

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



// Render function
/* function render() {


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










