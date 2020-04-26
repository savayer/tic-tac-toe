import Table from './Table'

const table = document.createElement("table");
const tableObject = new Table(table)

const message = {
    setMessage(content) {
        document.querySelector('#message').innerHTML = content
    },
    clearMessage() {
        document.querySelector('#message').innerHTML = ''
    }
}

export { message } 
export { tableObject }
export default function init() {
    const $app = document.getElementById('app')
    $app.innerHTML = ""
    tableObject.createTable()
    $app.appendChild(table)
}
