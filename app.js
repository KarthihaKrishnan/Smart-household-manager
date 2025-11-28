let items = [];
let pendingIndex = null;

const addButton = document.getElementById("addItem");
const inputBox = document.getElementById("itemInput");
const listBox = document.getElementById("itemList");
const scanner = document.getElementById("scanner");

//Load the saved Items
const saved = localStorage.getItem("groceryItems");
if (saved) {
    items = JSON.parse(saved);
    updateUI();
}

addButton.addEventListener("click", () => {
    const value = inputBox.value.trim();
    if (value === "") return;
    items.push({
        name: value,
        purchased: false,
        barcode: null
    });
    inputBox.value = "";
    updateUI();
});

function updateUI() {
    const purchasedList = document.getElementById("purchasedList");
    listBox.innerHTML = "";
    purchasedList.innerHTML = "";
    items.forEach((item, index) => {
        const li = document.createElement("li");
        //Create Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.purchased;
        
        // Checkbox change
        checkbox.addEventListener("change", () => {
            item.purchased = checkbox.checked;
            updateUI();           
        });

        // create text span
        const span = document.createElement("span");
        span.textContent = item.name;

        //create scan button
        const scan = document.createElement("button");
        scan.textContent = "📷";
        scan.type = "button";
        scan.addEventListener("click", () => {
            pendingIndex = index;
            showCamera();
            startCamera();
            startScanner();
        });

        const badge = document.createElement("span");
        if (item.barcode) {
            badge.textContent = "📌 linked";
        }else{
            badge.textContent = "";
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.type = "button";
        deleteBtn.addEventListener("click", () => {
            items.splice(index, 1);
            updateUI();
        });

        // apply strike through if purchased
        if (item.purchased) {
                span.classList.add("purchased");
        }else {
            span.classList.remove("purchased")
        }

        // add checkbox + text to li
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(scan);
        li.appendChild(badge);
        li.appendChild(deleteBtn);

        // add li to the main list
        if (item.purchased) {
            purchasedList.appendChild(li);
        }else{
            listBox.appendChild(li);
        }
    });
    localStorage.setItem("groceryItems", JSON.stringify(items));
}

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({video: {facingMode: "environment"}});
        scanner.srcObject = stream;
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
}



