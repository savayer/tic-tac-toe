import socket from './socket';

const gameProcess = {
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
            const userData = JSON.parse(sessionStorage.getItem('userData'))
            const roomName = sessionStorage.getItem('roomName')
            console.log(userData, roomName)
            const x = +el.dataset.x
            const y = +el.dataset.y
            const userId = userData.opponentUserId
            let className, type, currentUser = false

            if (userData.type === 'x') {
                className = 'tic' // x
                type = 'x'
                currentUser = true
            } else {
                className = 'tac' // o
                type = 'o'
                currentUser = false
            }
            el.classList.add(className)
            this.syncMatrix(x, y, currentUser)
            socket.emit('game-step', {x, y, type, className, currentUser, roomName, userId})
            this.checkWin()
        })
    },
    syncClick(syncData) {
        const x = syncData.x
        const y = syncData.y
        const el = document.querySelector(`td[data-x="${x}"][data-y="${y}"]`)
        el.classList.add(syncData.className)

        this.syncMatrix(x, y, syncData.currentUser)
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

socket.on('game-step-client', data => {
    console.log(data)
    gameProcess.syncClick(data)
})

export default gameProcess;