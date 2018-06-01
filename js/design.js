const table = document.querySelector("#pixelCanvas");

document.addEventListener('DOMContentLoaded', function(){
    let sizePicker = document.getElementById('sizePicker');
    makeGrid();
    sizePicker.addEventListener('submit', function (event) {
        event.preventDefault();
        clearGrid();
        makeGrid();
    });
});

function clearGrid() {
    while(table.firstChild){
        table.removeChild(table.firstChild);
    }
}

function makeGrid() {
    // Your code goes here!
    let height = document.getElementById("inputHeight").value;
    let width = document.querySelector("#inputWidth").value;
    //table.appendChild(tableBody);
    for (let rows = 0; rows < height; rows++) {
        let tr = table.insertRow(0);
        tr.className = "row";
        for (let col = 0; col < width; col++) {
            let td = tr.insertCell(col);
            td.className = "col";
        }
        tr.addEventListener('click', changeColor);
    }
}

function changeColor(event) {
  event.target.style.backgroundColor = document.getElementById('colorPicker').value;
}
