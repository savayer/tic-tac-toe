class Field {
    constructor(table) {
        this.table = table
        this.createMatrix()
    }

    createMatrix() {
        this.matrix = []
        for (let i = 0; i < 20; i++) {
            this.matrix.push(Array(20).fill(0))
        }
    }
}

class Cell extends Field {
    constructor(el) {
        super()
        this.el = el        
    }

    click(user = true) {
        this.el.addEventListener('click', e => {
            user
                ? this.el.classList.add('tic')
                : this.el.classList.add('tac')
            
            console.log(this.matrix)
        })
    }    
}

export { Cell }
export default Field