import Cell from './Cell'

class Table {
    constructor(table) {
        this.table = table
        Cell.createMatrix()
    }

    createTable() {
        const table = this.table
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");
        let tr, td;

        table.classList.add("battle-area");
        for (let x = 0; x < 20; x++) {
            tr = document.createElement("tr");
            for (let y = 0; y < 20; y++) {
                td = document.createElement("td");
                td.dataset.x = x
                td.dataset.y = y
                Cell.click(td)

                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }

        table.appendChild(thead);
        table.appendChild(tbody);        
    }
}

export default Table