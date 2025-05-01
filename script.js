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
        gridSquare.textContent = i + 1;  // Add number to each square for debugging
        gridSquare.classList.add('grid-square');
        gridContainer.appendChild(gridSquare);
    }
}

// Create a grid of the default size of 16 x 16 squares
createGrid();
