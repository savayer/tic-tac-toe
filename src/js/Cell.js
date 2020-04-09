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
            setTimeout(() => {
                this.computerClick()
            }, 300)
        })
    },
    computerClick() {
        if (!this.game) return;
        const matrix = this.matrix
        const length = this.userCoordinates.length-1
        const coords = this.userCoordinates[length]
        const x = coords.x, y = coords.y
        const setZero2Table = (x, y, user = false) => {
            document.querySelector(`td[data-x="${x}"][data-y="${y}"]`).classList.add('tac')
            this.syncMatrix(x, y, user)
        }
        const has3InHorizontal = () => {
            let countUser = 0
            for (let coord of this.userCoordinates) {
                if (coord.x + 3 <= 20) {
                    for (let count = coord.x; count < coord.x+3; count++) {
                        if (matrix[count][coord.y] === 'U') {
                            countUser++
                        } else {
                            countUser = 0;
                            break;
                        }
                    }
                } else {
                    for (let count = coord.x; count < coord.x-3; count--) {
                        if (matrix[count][coord.y] === 'U') {
                            countUser++
                        } else {
                            countUser = 0;
                            break;
                        }
                    }
                }
                if (countUser === 3) {
                    return {
                        x: coord.x,
                        y: coord.y
                    }
                }
            }
            return {}
        }
        const checkFour = has3InHorizontal()
        if (checkFour.x-1 <= 20 && checkFour.x-1 >= 0) {
            if (matrix[checkFour.x-1][checkFour.y] === 0) {
                setZero2Table(checkFour.x-1, checkFour.y)
            }
        } else if (matrix[x][y+1] === 0) {
            setZero2Table(x, y+1)
        } else if (matrix[x][y-1] === 0) {
            setZero2Table(x, y-1)
        } else if (matrix[x+1][y] === 0) {
            setZero2Table(x+1, y)            
        } else if (matrix[x-1][y] === 0) {
            setZero2Table(x-1, y)
        } else if (matrix[x-1][y-1] === 0) {
            setZero2Table(x-1, y-1)
        } else if (matrix[x+1][y-1] === 0) {
            setZero2Table(x+1, y-1)
        } else if (matrix[x+1][y+1] === 0) {
            setZero2Table(x+1, y+1)
        }  
        this.checkWin()
    },
    init() {
        this.game = true        
        this.userCoordinates = []
        this.compCoordinates = []
        
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
        } 
        else if (diagonal) {
            diagonal === 'user' ? this.endGane('You win') : this.endGane('Computer wins');
        }
    },
    checkVertical() {
        const matrix = this.matrix
        let countUser = 0
        let countComp = 0
        
        for (let coord of this.userCoordinates) {
            if (coord.y + 5 <= 20) {
                for (let count = coord.y; count < coord.y+5; count++) {
                    if (matrix[coord.x][count] === 'U') {
                        countUser++
                    } else {
                        countUser = 0;
                        break;
                    }
                }
            } else {
                for (let count = coord.y; count < coord.y-5; count--) {
                    if (matrix[coord.x][count] === 'U') {
                        countUser++
                    } else {
                        countUser = 0;
                        break;
                    }
                }
            }
            if (countUser === 5) {
                return 'user'
            }
        }
        
        for (let coord of this.compCoordinates) {
            if (coord.y + 5 <= 20) {
                for (let count = coord.y; count < coord.y+5; count++) {
                    if (matrix[coord.x][count] === 'C') {
                        countComp++
                    } else {
                        countComp = 0;
                        break;
                    }
                }
            } else {
                for (let count = coord.y; count < coord.y-5; count--) {
                    if (matrix[coord.x][count] === 'C') {
                        countComp++
                    } else {
                        countComp = 0;
                        break;
                    }
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
            if (coord.x + 5 <= 20) {
                for (let count = coord.x; count < coord.x+5; count++) {
                    if (matrix[count][coord.y] === 'U') {
                        countUser++
                    } else {
                        countUser = 0;
                        break;
                    }
                }
            } else {
                for (let count = coord.x; count < coord.x-5; count--) {
                    if (matrix[count][coord.y] === 'U') {
                        countUser++
                    } else {
                        countUser = 0;
                        break;
                    }
                }
            }
            
            if (countUser === 5) {
                return 'user'
            }
        }

        for (let coord of this.compCoordinates) {
            if (coord.x + 5 <= 20) {
                for (let count = coord.x; count < coord.x+5; count++) {
                    if (matrix[count][coord.y] === 'C') {
                        countComp++
                    } else {
                        countComp = 0;
                        break;
                    }
                }
            } else {
                for (let count = coord.x; count < coord.x-5; count--) {
                    if (matrix[count][coord.y] === 'C') {
                        countComp++
                    } else {
                        countComp = 0;
                        break;
                    }
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
            if (coord.x + 5 <= 20) {
                for (let count = coord.x; count < coord.x+5; count++) {
                    if (matrix[count][coord.y+countUser] === 'U' || matrix[count][coord.y-countUser] === 'U') {
                        countUser++
                    } else {
                        countUser = 0;
                        break;
                    }
                }
            } else {
                for (let count = coord.x; count < coord.x-5; count--) {
                    if (matrix[count][coord.y+countUser] === 'U' || matrix[count][coord.y-countUser] === 'U') {
                        countUser++
                    } else {
                        countUser = 0;
                        break;
                    }
                }
            }        
            if (countUser === 5) {
                return 'user'
            }
        }

        for (let coord of this.compCoordinates) {
            if (coord.x + 5 <= 20) {
                for (let count = coord.x; count < coord.x+5; count++) {
                    if (matrix[count][coord.y+countUser] === 'C' || matrix[count][coord.y-countUser] === 'C') {                    
                        countComp++
                    } else {
                        countComp = 0;
                        break;
                    }
                }
            } else {
                for (let count = coord.x; count < coord.x-5; count--) {
                    if (matrix[count][coord.y+countUser] === 'C' || matrix[count][coord.y-countUser] === 'C') {
                        countComp++
                    } else {
                        countComp = 0;
                        break;
                    }
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