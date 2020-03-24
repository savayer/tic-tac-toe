export default {
    matrix: [],
    click(el) {
        el.addEventListener('click', e => {
            el.classList.add('tic')
            this.syncMatrix(el.dataset.x, el.dataset.y)
            this.checkWin()
            console.log(this.matrix)
        })
    },
    createMatrix() {
        for (let i = 0; i < 20; i++) {
            this.matrix.push(Array(20).fill(0))
        }
    },
    syncMatrix(x, y, user = true) {
        user
            ? this.matrix[x][y] = 'U'
            : this.matrix[x][y] = 'C';
    },
    checkWin() {
        const matrix = this.matrix

        for (let x = 0; x < 20; x++) {
            for (let y = 0; y < 20; y++) {
                
            }
        }
    },
    checkVertical() {

    },
    checkHorizontal() {

    },
    checkDiagonal() {

    }
}