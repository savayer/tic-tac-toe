import Table from './Table'

const table = document.createElement("table");
const tableObject = new Table(table)

export { tableObject }
export default function init() {
    const $app = document.getElementById('app')
    $app.innerHTML = ""
    tableObject.createTable()
    $app.appendChild(table)
}
