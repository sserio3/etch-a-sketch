// script.js - This file contains the JavaScript logic for this project


// Set grid container width to 800px
const gridContainer = document.getElementById('grid-container');
const gridContainerSize = 800;  // Used to calculate the size of each square
gridContainer.style.width = `${gridContainerSize}px`;


/**
 * This function creates a grid of square div elements based on the specified number of squares per side. 
 * @param {number} gridSize: The size of the grid/number of squares per side (default is 16 for a 16x16 grid)
 * @returns {void}
 */
function createGrid(gridSize = 16) {
    // Side size calculated by dividing the container size by gridSize
    const squareSize = Math.floor(gridContainerSize / gridSize);
    
    for (let i = 0; i < gridSize * gridSize; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.style.width = squareSize + 'px';
        gridSquare.style.height = squareSize + 'px';
        gridSquare.classList.add('grid-square');
        gridContainer.appendChild(gridSquare);

        // Add event listener to change square color on mouseover
        gridSquare.addEventListener('mouseover', () => {
            gridSquare.style.backgroundColor = 'gray';
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
        gridSquare.style.backgroundColor = 'white';
    });
}


// Test 1: Check if a grid square turns gray on mouseover
createGrid();

const gridCell = document.querySelector('.grid-square');

// Simulate a mouseover event on the first grid cell
const mouseoverEvent = new Event('mouseover');
gridCell.dispatchEvent(mouseoverEvent);

if (gridCell.style.backgroundColor === 'gray') {
    console.log('TEST PASSED: Mouseover event triggered successfully');
} else {
    console.log('TEST FAILED: Mouseover event failed');
}


// Test 2: Check if all grid squares turn gray on mouseover
const allGridCells = document.querySelectorAll('.grid-square');
let allGray = true;
allGridCells.forEach(gridCell => {
    gridCell.dispatchEvent(mouseoverEvent);
    if (gridCell.style.backgroundColor !== 'gray') {
        allGray = false;
    }
});

if (allGray) {
    console.log('TEST PASSED: All grid squares turned gray on mouseover');
}
else {
    console.log('TEST FAILED: Not all grid squares turned gray on mouseover');
}


//Test 3: Check if clearGrid function works
clearGrid();
let allWhite = true;
allGridCells.forEach(gridCell => {
    if (gridCell.style.backgroundColor !== 'white') {
        allWhite = false;
    }
});

if (allWhite) {
    console.log('TEST PASSED: All grid squares cleared to white after clearGrid()');
}
else {
    console.log('TEST FAILED: Not all grid squares cleared to white after clearGrid()');
}