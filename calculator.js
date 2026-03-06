// Calculator JavaScript Code

// Global variables
let blinkingCursor = '_';
let currentText = '';
let cursorVisible = true;
let blinkInterval;
let displayElement = document.getElementsByClassName('display')[0];
let locked = false;
let modal = document.getElementById('modal');
let okBtn = document.getElementById('okBtn');
let goodbyeBtn = document.getElementById('goodbyeBtn');

// Function to get the display element
function getDisplay() {
    return document.getElementsByClassName('display')[0];
}

// Function to update the display
function updateDisplay() {
    if (!displayElement) return;
    displayElement.value = currentText + (cursorVisible ? blinkingCursor : '');
}

// Function to start the blinking cursor
function startBlinking() {
    if (blinkInterval) return;
    blinkInterval = setInterval(() => {
        cursorVisible = !cursorVisible;
        updateDisplay();
    }, 500);
}

// Function to stop the blinking cursor
function stopBlinking() {
    clearInterval(blinkInterval);
    blinkInterval = null;
    cursorVisible = false;
    updateDisplay();
}

// Function to append input to the display
function appendOnDisplay(input) {
    if (locked) return;
    currentText += input;
    cursorVisible = true;
    console.log(input);
    updateDisplay();
    startBlinking();

    // the hello easter egg
    if (currentText === '0.1134') {
        stopBlinking();
        displayElement.value = 'Hello!';
        setTimeout(() => {
            currentText = '0.1134';
            updateDisplay();
            startBlinking();
        }, 5000);
    }

    // the 666 easter egg
    if (currentText === '666') {
        locked = true;
        displayElement.style.color = 'red';
        modal.style.display = 'flex';
    }
}

// Function to clear the display
function clearDisplay() {
    if (locked) return;
    currentText = '';
    cursorVisible = true;
    updateDisplay();
}

// Function to calculate the result
function calculate() {
    if (locked) return;
    try {
        const result = Function('return ' + currentText)();
        currentText = String(result);
    } catch (e) {
        currentText = 'Error';
    }
    cursorVisible = true;
    updateDisplay();
}

// Check if display element exists
if (!displayElement) {
    console.error('Display element not found!');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
    startBlinking();

    // Set up button event listeners
    okBtn.onclick = () => {
        modal.style.display = 'none';
        locked = false;
        displayElement.style.color = 'white';
    };

    goodbyeBtn.onclick = () => {
        window.close();
    };
});