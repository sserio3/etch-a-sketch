// script.js - This file contains the JavaScript logic for this project


// ======== GLOBAL VARIABLES ==========

// Grid size indicates the number of squares per side (e.g., 16 for a 16x16 grid)
const DEFAULT_GRID_SIZE = 16;
const MIN_GRID_SIZE = 1;
const MAX_GRID_SIZE = 100;

const DEFAULT_GRID_PX_WIDTH = 500; // Default grid container pixel width

// The following variables are used for grid square colors
const DEFAULT_UNFILLED_COLOR = 'white';
const DEFAULT_FILLED_COLOR = 'gray';
const DEFAULT_COLOR_MODE = false; // False by default (color mode is off)

const DEFAULT_BUTTON_COLOR = 'white'; // Should match CSS styling
const ACTTIVE_BUTTON_COLOR = 'gray'; // Should match CSS styling if applicable


// ========== GAME LOGIC ==============

// Set grid container width to 500px
const gridContainer = document.getElementById('grid-container');
let gridContainerSize = DEFAULT_GRID_PX_WIDTH;  // Used to calculate the size of each square
gridContainer.style.width = `${gridContainerSize}px`;

let colorModeOn = DEFAULT_COLOR_MODE;
const colorModeButton = document.getElementById('color-mode-btn');

// Add event listener to the button to toggle color mode
colorModeButton.addEventListener('click', () => {
    colorModeOn = !colorModeOn; 
    toggleButtonColor(colorModeButton);
});


/**
 * Toggle the button color between white and gray.
 * @param {HTMLElement} button: The button element that we want to toggle the color of
 * @returns {void}
 */
function toggleButtonColor(button) {
    if (button.style.backgroundColor === DEFAULT_BUTTON_COLOR) {
        button.style.backgroundColor = ACTTIVE_BUTTON_COLOR;
    } else {
        button.style.backgroundColor = DEFAULT_BUTTON_COLOR;
    }
}


/**
 * Generate a random RGB color string by generating random values for red, green, and blue components.
 * @returns {string} - A random RGB color string in the format "rgb(r, g, b)"
 */
function getRandColorValues() {
    const redValue = Math.floor(Math.random() * 256);
    const greenValue = Math.floor(Math.random() * 256);
    const blueValue = Math.floor(Math.random() * 256);
    return [redValue, greenValue, blueValue];
}


/**
 * This function creates a grid of square div elements based on the specified number of squares per side. 
 * @param {number} gridSize: The size of the grid/number of squares per side (default is 16 for a 16x16 grid)
 * @returns {void}
 */
function createGrid(gridSize = DEFAULT_GRID_SIZE) {
    gridContainer.innerHTML = '';  // Clear grid container before creating a new grid

    // Calculated size of each square size by dividing the container size by gridSize
    const squareSize = Math.floor(gridContainerSize / gridSize);

    //Update grid container size to fit the new grid for styling purposes
    gridContainer.style.width = `${squareSize * gridSize}px`;
    
    for (let i = 0; i < gridSize * gridSize; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.style.width = squareSize + 'px';
        gridSquare.style.height = squareSize + 'px';
        gridSquare.classList.add('grid-square');
        gridContainer.appendChild(gridSquare);

        // Add event listener to change square color on mouseover
        gridSquare.addEventListener('mouseover', () => {
            if (!colorModeOn) {
                gridSquare.style.backgroundColor = DEFAULT_FILLED_COLOR;
            }
            else {
                let rgbColorValues = getRandColorValues();
                rgbColor = `rgb(${rgbColorValues[0]}, ${rgbColorValues[1]}, ${rgbColorValues[2]})`;
                gridSquare.style.backgroundColor = rgbColor;
            }
        });
    }
}


/**
 * This function clears the grid color, changing all squares back to the default white color.
 * @returns {void}
 */
function clearGrid() {
    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach(gridSquare => {
        gridSquare.style.backgroundColor = DEFAULT_UNFILLED_COLOR;
    });
}


function getUserGridSize() {
    let newSize = prompt(`Please enter a grid size between ${MIN_GRID_SIZE} and ${MAX_GRID_SIZE} \
(e.g., entering 4 will create a 4x4 grid):`);
    if (newSize >= MIN_GRID_SIZE && newSize <= MAX_GRID_SIZE) {
        return newSize;
    } else {
        alert(`Invalid input. Please try again with a valid number between \
${MIN_GRID_SIZE} and ${MAX_GRID_SIZE}.`);
        return null;
    }
}


const newGridButton = document.getElementById('new-grid-btn');

// Add event listener to the button to create a new grid
newGridButton.addEventListener('click', () => { 
    let userGridSize = getUserGridSize(); 
    if (userGridSize) {
        createGrid(userGridSize);
    }
}); 


// =========== TEST CASES =============

// Test 1: Check if a grid square turns gray on mouseover
createGrid();

const gridCell = document.querySelector('.grid-square');

// Simulate a mouseover event on the first grid cell
const mouseoverEvent = new Event('mouseover');
gridCell.dispatchEvent(mouseoverEvent);

if (gridCell.style.backgroundColor === DEFAULT_FILLED_COLOR) {
    console.log('TEST PASSED: Mouseover event triggered successfully');
} else {
    console.log('TEST FAILED: Mouseover event failed');
}


// Test 2: Check if all grid squares are filled with the default color on mouseover
const allGridCells = document.querySelectorAll('.grid-square');
let allFilled = true;

//Similate mouseover event on all grid cells
allGridCells.forEach(gridCell => {
    gridCell.dispatchEvent(mouseoverEvent);
    if (gridCell.style.backgroundColor !== DEFAULT_FILLED_COLOR) {
        allFilled = false;
    }
});

if (allFilled) {
    console.log('TEST PASSED: All grid squares turned gray on mouseover');
}
else {
    console.log('TEST FAILED: Not all grid squares turned gray on mouseover');
}


//Test 3: Check if clearGrid function correctly sets all squares to unfilled
clearGrid();
let allUnfilled = true;
allGridCells.forEach(gridCell => {
    if (gridCell.style.backgroundColor !== DEFAULT_UNFILLED_COLOR) {
        allUnfilled = false;
    }
});

if (allUnfilled) {
    console.log('TEST PASSED: All grid squares cleared to white after clearGrid()');
}
else {
    console.log('TEST FAILED: Not all grid squares cleared to white after clearGrid()');
}


// Test 4: Check if new grid button works
const testNewGridButton = document.getElementById('new-grid-btn');

// Set a placeholder for the prompt function to reset the prompt input after testing
const originalPrompt = window.prompt;

// Simulate click event on new grid button to create a new 20x20 grid
let testInput = '20';
window.prompt = () => testInput;

const clickEvent = new Event('click');
testNewGridButton.dispatchEvent(clickEvent);

if (gridContainer.childElementCount === 400) { // 20x20 grid = 400 squares
    console.log('TEST PASSED: New grid button successfully created a new 20x20 grid');
}
else {
    console.log('TEST FAILED: New grid button did not create a new 20x20 grid');
}
window.prompt = originalPrompt; // Reset prompt function to its original state


// Test 5: Check if getUserGridSize function correctly refuses an invalid number input
testInput = '500'; // Simulate user input of '500'
window.prompt = () => testInput;

// Visually check for an alert popup to verify that the input is invalid
testNewGridButton.dispatchEvent(clickEvent);
console.log('Test passed if alert popup displayed for invalid number input');

window.prompt = originalPrompt; // Reset prompt function to its original state


// Test 6: Check if getUserGridSize function correctly refuses an invalid non-number input
testInput = 'abc'; // Simulate user input of 'abc'
window.prompt = () => testInput;

// Visually check for an alert popup to verify that the input is invalid
testNewGridButton.dispatchEvent(clickEvent);
console.log('Test passed if alert popup displayed for invalid non-number input');

window.prompt = originalPrompt; // Reset prompt function to its original state


// Test 7: Check if getRandomColor function returns valid RGB color values
let colorValues = getRandColorValues();
let allValsValid = true;  // Flag to track if all color values are valid

for (let i = 0; i < colorValues.length; i++) {
    if (colorValues[i] < 0 || colorValues[i] > 255) {
        allValid = false;
    }
}

if (allValsValid) {
    console.log('TEST PASSED: Valid RGB color values returned from getRandomColor()');
}
else {
    console.log('TEST FAILED: Invalid RGB color values returned from getRandomColor()');
}


// Test 8: Check if color mode button toggles color mode on
colorModeOn = false; // Set color mode to default state for testing
colorModeButton.dispatchEvent(clickEvent);

if (colorModeOn) {
    console.log('TEST PART 1 PASSED: Color mode toggled on successfully');
    colorModeButton.dispatchEvent(clickEvent); // Check toggle off
    
    if (!colorModeOn) {
        console.log('TEST PART 2 PASSED: Color mode toggled off successfully');
    }
    else {
        console.log('TEST PART 2 FAILED: Color mode toggle off failed');
    }
}
else {
    console.log('TEST PART 1 FAILED: Color mode toggle failed');
}


// Test 9: Check if color actually changes to random color in color mode
colorModeOn = true; // Set color mode to on for testing
gridCell.dispatchEvent(mouseoverEvent);

if (gridCell.style.backgroundColor !== DEFAULT_FILLED_COLOR && 
    gridCell.style.backgroundColor !== DEFAULT_UNFILLED_COLOR) {
    console.log('TEST PASSED: Square changed to random color in color mode successfully');
}
else {
    console.log('TEST FAILED: Square failed to change to random color in color mode');
}

colorModeOn = false; // Reset color mode for next test regardless of test result


// Test 10: Check if toggleButtonColor function changes button color
colorModeButton.style.backgroundColor = DEFAULT_UNFILLED_COLOR;  // Set color back to default state
toggleButtonColor(colorModeButton);

if (colorModeButton.style.backgroundColor === DEFAULT_FILLED_COLOR) {
    console.log('TEST PASSED: Button color toggled to gray successfully');
}
else {
    console.log('TEST FAILED: Button color toggle failed');
}


// Reset color mode button color and colorModeOn to default state
colorModeButton.style.backgroundColor = DEFAULT_UNFILLED_COLOR;
colorModeOn = false;


createGrid(); // Create the initial grid