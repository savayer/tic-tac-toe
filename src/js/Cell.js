export default {
    matrix: [],
    userCoordinates: [],
    compCoordinates: [],
    game: true,
    click(el) {
        el.addEventListener('click', e => {
            if (!this.game) return;
            if (el.classList.contains('tic') || el.classList.contains('tac')) {
                return;
            }
            el.classList.add('tic')
            this.syncMatrix(+el.dataset.x, +el.dataset.y)
            this.checkWin()
        })
    },
    init() {
        this.game = true        
        this.userCoordinates = []
        this.compCoordinates = []
        this.createMatrix()
    },
    createMatrix() {
        this.matrix = []
        for (let i = 0; i < 20; i++) {
            this.matrix.push(Array(20).fill(0))
        }
    },
    syncMatrix(x, y, user = true) {
        if (user) {
            this.matrix[x][y] = 'U'
            this.userCoordinates.push({x, y})
        } else {
            this.matrix[x][y] = 'C'
            this.compCoordinates.push({x, y})
        }        
    },
    checkWin() {
        const vertical = this.checkVertical()
        const horizontal = this.checkHorizontal()
        const diagonal = this.checkDiagonal()
        if (vertical) {
            vertical === 'user' ? this.endGane('You win') : this.endGane('Computer wins');            
        } else if (horizontal) {
            horizontal === 'user' ? this.endGane('You win') : this.endGane('Computer wins');
        } else if (diagonal) {
            diagonal === 'user' ? this.endGane('You win') : this.endGane('Computer wins');
        }
    },
    checkVertical() {
        const matrix = this.matrix
        let countUser = 0
        let countComp = 0
        
        for (let coord of this.userCoordinates) {
            for (let count = coord.y; count < coord.y+5; count++) {
                if (matrix[coord.x][count] === 'U') {
                    countUser++
                } else {
                    countUser = 0;
                    break;
                }
            }
            if (countUser === 5) {
                return 'user'
            }
        }

        for (let coord of this.compCoordinates) {
            for (let count = coord.y; count < coord.y+5; count++) {
                if (matrix[coord.x][count] === 'C') {
                    countComp++
                } else {
                    countComp = 0;
                    break;
                }
            }
            if (countComp === 5) {
                return 'computer'
            }
        }
    },
    checkHorizontal() {
        const matrix = this.matrix
        let countUser = 0
        let countComp = 0
        
        for (let coord of this.userCoordinates) {
            for (let count = coord.x; count < coord.x+5; count++) {
                if (matrix[count][coord.y] === 'U') {
                    countUser++
                } else {
                    countUser = 0;
                    break;
                }
            }
            if (countUser === 5) {
                return 'user'
            }
        }

        for (let coord of this.compCoordinates) {
            for (let count = coord.x; count < coord.x+5; count++) {
                if (matrix[count][coord.y] === 'C') {
                    countComp++
                } else {
                    countComp = 0;
                    break;
                }
            }
            if (countComp === 5) {
                return 'computer'
            }
        }      
    },
    checkDiagonal() {
        const matrix = this.matrix
        let countUser = 0
        let countComp = 0
        
        for (let coord of this.userCoordinates) {
            for (let count = coord.x; count < coord.x+5; count++) {
                if (matrix[count][coord.y+countUser] === 'U') {
                    countUser++
                } else {
                    countUser = 0;
                    break;
                }
            }
            if (countUser === 5) {
                return 'user'
            }
        }

        for (let coord of this.userCoordinates) {
            for (let count = coord.x; count < coord.x+5; count++) {
                if (matrix[count][coord.y+countComp] === 'C') {
                    countComp++
                } else {
                    countComp = 0;
                    break;
                }
            }
            if (countComp === 5) {
                return 'computer'
            }
        }
    },
    endGane(message) {
        this.game = false
        console.log('%c' + message, 'font-size: 3em;color:red')
    }
}