const container = document.querySelector('#container');
container.addEventListener('click', toggleDrawMode);

const sizeText = document.querySelector('#size-text');
sizeText.addEventListener('keydown', updateGridSizeDisplay);

const clearButton = document.querySelector('#clear-button');
clearButton.addEventListener('click', clearDrawing);

const sizeSlider =  document.querySelector('#size-slider');
sizeSlider.addEventListener('input',updateGridSizeRange); //Activiate as range slides
sizeSlider.addEventListener('change',updateGridSizeDisplay); //Activate as range changed (mouse released)

const penButton = document.querySelector('#pen');
const colorfulButton = document.querySelector('#colorful');
penButton.checked = true;

const colorPicker = document.querySelector('#color-picker');
colorPicker.addEventListener('input', changeColor);

const DEFAULT_GRID_COLOR = '#FFFFFF';
const DEFAULT_GRID_SIZE = 10;

let drawStarted = false;
let containsDrawing = false;
let gridSize = DEFAULT_GRID_SIZE;
sizeText.value = DEFAULT_GRID_SIZE;
sizeSlider.value = DEFAULT_GRID_SIZE;

const DEFAULT_PEN_COLOR = '#000000';
colorPicker.value = DEFAULT_PEN_COLOR;
let penColor = DEFAULT_PEN_COLOR;

function makeSquareDivs(size) {
    for (let i = 0; i < (size * size); i++) {
        const gridBlock = document.createElement('div');
        gridBlock.style.backgroundColor = 'white';
        gridBlock.style.border = '1px solid rgba(0, 0, 0, .2)';
        gridBlock.addEventListener('click', draw);
        container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
        container.appendChild(gridBlock).classList.add('block');
    }
}

function updateGridSizeRange(e) {
    let newSize = e.target.value;
    sizeText.value = newSize;
}

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
                if (!cont) {
                    sizeText.value = gridSize;
                    sizeSlider.value = gridSize;
                    return;
                }
            }
            clearGrid();
            makeSquareDivs(newSize);   
            gridSize = newSize;
            containsDrawing = false;
        }
    }
}

function toggleDrawMode(e) {
    let blockList = document.querySelectorAll('.block');
    containsDrawing = true;
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
    if (colorfulButton.checked == true) {
        let randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
        e.target.style.backgroundColor = randomColor;
    } else {
        e.target.style.backgroundColor = penColor;
    }
}

function changeColor(e) {
    let newColor = e.target.value;
    penColor = newColor;
}

function clearDrawing(e) {
    let blockList = container.childNodes;
    blockList.forEach(block => {
        block.style.backgroundColor = DEFAULT_GRID_COLOR;
    });
    containsDrawing = false;
}

function clearGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

makeSquareDivs(DEFAULT_GRID_SIZE);

/*Background*/
const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let particles = [];

let backgroundCol = '#FFFFDD';
function darkModeToggle(e) {
    document.body.style.background = backgroundCol;
}