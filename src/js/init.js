import Table from './Table'

export default function init() {
    const $app = document.getElementById('app')

    $app.innerHTML = ""
    
    const table = document.createElement("table");
    
    const tableObject = new Table(table)
    tableObject.createTable()

    $app.appendChild(table)
}
