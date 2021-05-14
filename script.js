const container = document.querySelector('#container');
const sizeText = document.querySelector('#size-text');
const clearButton = document.querySelector('#clear-button');
const sizeSlider =  document.querySelector('#size-slider');
sizeSlider.addEventListener('input',updateGridSize);

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

makeSquareDivs(16);