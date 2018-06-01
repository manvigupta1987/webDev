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
    // let rowCount = table.rows.length;
    // for (let row = 0; row < rowCount; row++) {
    //     table.deleteRow(0);
    // }
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
        let tr = document.createElement('tr');
        tr.className = "row";
        table.appendChild(tr);
        for (let col = 0; col < width; col++) {
            let td = document.createElement('td');
            td.className = "col";
            tr.appendChild(td);
        }
        tr.addEventListener('click', changeColor);
    }
}

function changeColor(event) {
  event.target.style.backgroundColor = document.getElementById('colorPicker').value;
}
