// Get the display element
const display = document.getElementById('result');

// Function to append characters to display
function appendToDisplay(value) {
    // If display shows '0', replace it with the new value
    // unless the new value is a decimal point
    if (display.value === '0' && value !== '.') {
        display.value = value;
    } else if (display.value === '0' && value === '.') {
        display.value = '0.';
    } else {
        // Check if the last character is an operator and current value is also an operator
        const lastChar = display.value.slice(-1);
        const operators = ['+', '-', '*', '/'];
        
        if (operators.includes(lastChar) && operators.includes(value)) {
            // Replace the last operator with the new one
            display.value = display.value.slice(0, -1) + value;
        } else {
            // Otherwise, just append the value
            display.value += value;
        }
    }
}

// Function to clear the display
function clearDisplay() {
    display.value = '0';
}

// Function to delete the last character
function deleteLastChar() {
    if (display.value.length === 1) {
        display.value = '0';
    } else {
        display.value = display.value.slice(0, -1);
    }
}

// Function to calculate the result
function calculate() {
    try {
        // Safely evaluate the expression
        const result = Function('"use strict"; return (' + display.value + ')')();
        
        // Handle division by zero and other errors
        if (!isFinite(result)) {
            display.value = 'Error';
        } else {
            // Format the result to avoid very long decimals
            display.value = Number(result.toFixed(10)).toString();
        }
    } catch (error) {
        display.value = 'Error';
    }
}