// Get DOM elements
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const saveButton = document.getElementById("saveButton");
const lenders = document.getElementById("nakautangs");
const emptyList = document.getElementById("emptyList");
const nameError = document.getElementById("nameError");
const amountError = document.getElementById("amountError");

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('fil-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2
    }).format(amount);
}

// Initialize list from localStorage if available
function initializeList() {
    const savedUtangs = JSON.parse(localStorage.getItem("utangList")) || [];
    
    if (savedUtangs.length > 0) {
        emptyList.style.display = "none";
        
        savedUtangs.forEach(item => {
            const newUtang = createUtangElement(item.name, item.amount);
            lenders.appendChild(newUtang);
        });
    }
}

// Create a new utang list item
function createUtangElement(name, amount) {
    const newUtang = document.createElement("li");
    
    const nameSpan = document.createElement("span");
    nameSpan.textContent = name;
    nameSpan.className = "name";
    
    const amountSpan = document.createElement("span");
    amountSpan.textContent = formatCurrency(amount);
    amountSpan.className = "amount";
    
    newUtang.appendChild(nameSpan);
    newUtang.appendChild(amountSpan);
    
    return newUtang;
}

// Save to localStorage
function saveToLocalStorage(name, amount) {
    const savedUtangs = JSON.parse(localStorage.getItem("utangList")) || [];
    savedUtangs.push({ name, amount });
    localStorage.setItem("utangList", JSON.stringify(savedUtangs));
}

// Event listener for save button
saveButton.addEventListener("click", function() {
    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value);
    
    // Reset errors
    nameError.textContent = "";
    amountError.textContent = "";
    
    // Validate inputs
    let isValid = true;
    
    if (!name) {
        nameError.textContent = "Pakilagay ang pangalan";
        isValid = false;
    }
    
    if (isNaN(amount) || amount <= 0) {
        amountError.textContent = "Pakilagay ang tamang halaga";
        isValid = false;
    }
    
    if (isValid) {
        // Hide empty list message if this is the first entry
        if (lenders.children.length === 1 && lenders.children[0].id === "emptyList") {
            emptyList.style.display = "none";
        }
        
        // Create and add new utang item
        const newUtang = createUtangElement(name, amount);
        lenders.appendChild(newUtang);
        
        // Save to localStorage
        saveToLocalStorage(name, amount);
        
        // Clear inputs
        nameInput.value = "";
        amountInput.value = "";
        
        // Focus back to name input
        nameInput.focus();
    }
});

// Initialize the app
initializeList();