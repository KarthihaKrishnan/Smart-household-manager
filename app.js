//Load the saved Items
const STORAGE_KEY = "smart_grocery_items";

// This will hold all items from memory
let items = [];

let pendingIndex = null;

const addButton = document.getElementById("addItem");
const inputBox = document.getElementById("itemInput");
const listBox = document.getElementById("itemList");
const purchasedList = document.getElementById("purchasedList");

// const scanner = document.getElementById("scanner");

// Helpers
function loadItems() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }catch {
        return [];
    } 
}

// Save items
function saveItems(items = []) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// On page load — read storage & assign to same array
items = loadItems();
render(items);

//Add new item
addButton.addEventListener("click", () => {
    const value = inputBox.value.trim();
    if (value === "") return;

    items.push({
        id: crypto.randomUUID(),
        name: value,
        status: "pending",
        //barcode: null
        createdAt: Date.now()       
    });

    saveItems(items);
    render(items);
    inputBox.value = "";
});

// Render function
function render() {
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

        // create text span
        const span = document.createElement("span");
        span.textContent = item.name;
        // apply strike through if purchased
        if (item.status === "purchased") {
                span.classList.add("purchased");
        }

        //create scan button
        //const scan = document.createElement("button");
        //scan.textContent = "📷";
        //scan.type = "button";
        //scan.addEventListener("click", () => {
           // pendingIndex = index;
           // showCamera();
           // startCamera();
           // startScanner();
            // Pre-unlock audio with a manual tap
           // const unlock = new Audio("beep.mp3");
          //  unlock.play().catch(() => {});
       // });
/*
        const badge = document.createElement("span");
        if (item.barcode) {
            badge.textContent = "📌 linked";
        }else{
            badge.textContent = "";
        } */

        // Delete items
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.type = "button";

        deleteBtn.addEventListener("click", () => {
            items = items.filter(i => i.id !== item.id);
            saveItems(items);
            render();
        }); 

        // add checkbox + text to li
        li.appendChild(checkbox);
        li.appendChild(span);
      //  li.appendChild(scan);
      //  li.appendChild(badge);
        li.appendChild(deleteBtn);

        // add li to the main list
        if (item.status === "purchased") {
            purchasedList.appendChild(li);
        }else{
            listBox.appendChild(li);
        }
    });
}

render();

/*

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({video: {facingMode: "environment"}});
        scanner.srcObject = stream;
        scanner.style.display = "block";

    }
    catch {
        console.log("Camera permission denied or not available");
    }
}
    
function startScanner() {
    if (!("BarcodeDetector" in window)) {
        console.log("BarcodeDetector is NOT supported in this browser.");
        return;
    }
    const detector = new BarcodeDetector({
        formats: ["ean_13", "code_128", "qr_code"]
    });
        
    async function scanFrame() {
        try {
            const results = await detector.detect(scanner);
            if (results.length > 0) {
                handleScan(results[0].rawValue);
            }
        }catch (error) {
            console.error(error);
        }
        requestAnimationFrame(scanFrame);
    }
    requestAnimationFrame(scanFrame);
}

function handleScan(scannedCode) {
    if (pendingIndex !== null) {
        items[pendingIndex].barcode = scannedCode;
        pendingIndex = null;
        updateUI();
        hideCamera();
    }else{
        let found = false;
        for (let i = 0; i < items.length; i++) {
            if (items[i].barcode === scannedCode) {
                items[i].purchased = true;
                found = true;
                updateUI();
                // Play beep
                const beep = new Audio("beep.mp3");
                beep.play().catch(err => console.log("Audio play blocked:", err));

                // Vibrate if supported
                if (navigator.vibrate) {
                    navigator.vibrate(200);
                }

                // Vibrate on supported devices
                if (navigator.vibrate) {
                    navigator.vibrate(200);
                }
                const purchasedItems = document.querySelectorAll("#purchasedList li");
                const liToHighlight = purchasedItems[i];
                liToHighlight.classList.add("highlight");
                setTimeout(() => {
                    liToHighlight.classList.remove("highlight");
                }, 1000);
                break;
            }
         };
        if(!found) {
            console.log("Item not in list")
        }
    }
}

function showCamera() {
    document.querySelector(".camera-container").style.display = "block";
    document.querySelector(".scan-box").style.display = "block";
}

function hideCamera() {
    document.querySelector(".camera-container").style.display = "none";
    document.querySelector(".scan-box").style.display = "none";
    if (scanner.srcObject) {
        scanner.srcObject.getTracks().forEach(track => track.stop());
        scanner.srcObject = null;
    }
} */



