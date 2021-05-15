const container = document.querySelector('#container');
container.addEventListener('click', toggleDrawMode);

const sizeText = document.querySelector('#size-text');
sizeText.addEventListener('keydown', updateGridSizeDisplay);
//sizeText.addEventListener('keydown', updateGridSizeText);

const clearButton = document.querySelector('#clear-button');
clearButton.addEventListener('click', clearDrawing);

const sizeSlider =  document.querySelector('#size-slider');
sizeSlider.addEventListener('input',updateGridSizeRange); //Activiate as range slides
sizeSlider.addEventListener('change',updateGridSizeDisplay); //Activate as range changed (mouse released)

const colorPicker = document.querySelector('#color-picker');

const DEFAULT_COLOR = 'white';
const DEFAULT_GRID_SIZE = 10;
let drawStarted = false;
let containsDrawing = false;
let gridSize = DEFAULT_GRID_SIZE;
sizeText.value = DEFAULT_GRID_SIZE;
sizeSlider.value = DEFAULT_GRID_SIZE;

function makeSquareDivs(size) {
    for (let i = 0; i < (size * size); i++) {
        const gridBlock = document.createElement('div');
        gridBlock.style.border = '1px solid rgba(255, 0, 0, .3)';
        //gridBlock.addEventListener('mouseover', highlight);
        container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
        container.appendChild(gridBlock).classList.add('block');
    }
}

function updateGridSizeRange(e) {
    let newSize = e.target.value;
    sizeText.value = newSize;
    gridSize = newSize;
}

//FIX THIS
function updateGridSizeText(e) {
    let newSize = e.target.value;
    if (newSize > 100) {
        e.target.value = gridSize;
    } else {
        updateGridSizeDisplay(e);
        gridSize = newSize;
    }
}

function updateGridSizeDisplay(e) {
    console.log(e.target);
    if (e.keyCode == 13 || e.target.type === 'range') {
        let newSize = e.target.value;
        if (newSize > 100) {
            e.target.value = gridSize;
        } else {
            if (containsDrawing) {
                let cont = confirm('Changing the grid size will erase your drawing. Do you want to continue?');
                if (!cont) return;
            }
            clearGrid();
            makeSquareDivs(newSize);   
            gridSize = newSize;
        }
    }
}

function toggleDrawMode(e) {
    let blockList = document.querySelectorAll('.block');
    containsDrawing = true;
    if (!drawStarted){
        blockList.forEach(block => {
            block.addEventListener('mouseenter', draw);
            block.addEventListener('mouseleave', draw);
        });
        drawStarted = true;
    } else {
        blockList.forEach(block => {
            block.removeEventListener('mouseenter', draw);
            block.removeEventListener('mouseleave', draw);
        });
        drawStarted = false;
    }
}

function draw(e) {
    e.target.style.backgroundColor = 'blue';
}

function highlight(e) {
    e.target.style.backgroundColor = 'yellow';
}

function clearDrawing(e) {
    let blockList = container.childNodes;
    blockList.forEach(block => {
        block.style.backgroundColor = DEFAULT_COLOR;
    });
}

function clearGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

makeSquareDivs(DEFAULT_GRID_SIZE);