const container = document.querySelector('#container');
container.addEventListener('click', toggleDrawMode);
const sizeText = document.querySelector('#size-text');
const clearButton = document.querySelector('#clear-button');
const sizeSlider =  document.querySelector('#size-slider');
sizeSlider.addEventListener('input',updateGridSize); //Activiate as range slides
sizeSlider.addEventListener('change',updateGridSizeDisplay); //Activate as range changed (mouse released)

const DEFAULT_COLOR = "white";
let drawStarted = false;

function makeSquareDivs(size) {
    for (let i = 0; i < (size * size); i++) {
        const gridBlock = document.createElement('div');
        gridBlock.style.border = '0.5px solid red';
        container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
        container.appendChild(gridBlock).classList.add('block');
    }
}

function updateGridSize(e) {
    let newSize = e.target.value;
    sizeText.value = newSize;
}

function updateGridSizeDisplay(e) {
    clearGrid();
    makeSquareDivs(e.target.value);
}

function toggleDrawMode(e) {
    let blockList = document.querySelectorAll('.block');
    if (!drawStarted){
        blockList.forEach(block => {
            block.addEventListener('mouseenter', draw);
        });
        drawStarted = true;
    } else {
        blockList.forEach(block => {
            block.removeEventListener('mouseenter', draw);
        });
        drawStarted = false;
    }
}

function draw(e) {
    e.target.style.backgroundColor = 'blue';
}

function clearDrawing(e) {

}

function clearGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

makeSquareDivs(15);