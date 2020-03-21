import Field from './Field'
import { Cell } from './Field'

export default function init() {
    const $app = document.getElementById('app')    
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    let tr, td, th;
    let cells = []

    $app.innerHTML = "";

    table.classList.add("battle-area");
    for (let x = 0; x < 20; x++) {
        tr = document.createElement("tr");
        for (let y = 0; y < 20; y++) {
            td = document.createElement("td");
            cells.push(new Cell(td))

            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    table.appendChild(thead);
    table.appendChild(tbody);

    new Field(table)

    cells.forEach(cell => {
        cell.click()
    })

    $app.appendChild(table);
}
