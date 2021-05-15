const container = document.querySelector('#container');
container.addEventListener('click', toggleDrawMode);

const sizeText = document.querySelector('#size-text');

const clearButton = document.querySelector('#clear-button');
clearButton.addEventListener('click', clearDrawing);

const sizeSlider =  document.querySelector('#size-slider');
sizeSlider.addEventListener('input',updateGridSize); //Activiate as range slides
sizeSlider.addEventListener('change',updateGridSizeDisplay); //Activate as range changed (mouse released)

const DEFAULT_COLOR = 'white';
let drawStarted = false;

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
        //block.addEventListener('mouseover', highlight);
    });
}

function clearGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

makeSquareDivs(15);