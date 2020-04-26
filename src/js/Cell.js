import socket from './socket';
import { tableObject } from './init';
import { message } from './init';
import init from './init';

const gameProcess = {
    userData: null,
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
            this.userData = JSON.parse(sessionStorage.getItem('userData'))
            //const roomName = sessionStorage.getItem('roomName')
            const x = +el.dataset.x
            const y = +el.dataset.y
            const userId = this.userData.opponentUserId
            let className, type, currentUser = false

            if (this.userData.type === 'x') {
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
            tableObject.deactivateTable()
            message.setMessage('Opponent\'s turn')
            this.checkWin()
        })
    },
    syncClick(syncData) {
        const x = syncData.x
        const y = syncData.y
        const el = document.querySelector(`td[data-x="${x}"][data-y="${y}"]`)
        el.classList.add(syncData.className)

        this.syncMatrix(x, y, syncData.currentUser)
        tableObject.activateTable()
        message.setMessage('Your turn')
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
        /* if (vertical) {
            vertical === 'x' ? this.endGane('You won!') : this.endGane('Computer wins');            
        } else if (horizontal) {
            horizontal === 'x' ? this.endGane('You won!') : this.endGane('Computer wins');
        } 
        else if (diagonal) {
            diagonal === 'x' ? this.endGane('You won!') : this.endGane('Computer wins');
        } */
        if (vertical) {
            if (vertical === 'x') {
                if (this.userData.type === 'x') {
                    this.endGane('You won!')
                    const userId = this.userData.opponentUserId
                    socket.emit('finish-game', {userId, message: 'You lose!'})
                } else {
                    this.endGane('You lose!')
                    const userId = this.userData.userId
                    socket.emit('finish-game', {userId, message: 'You won!'})
                }
            } else {
                if (this.userData.type === 'o') {
                    this.endGane('You won!')
                    const userId = this.userData.userId
                    socket.emit('finish-game', {userId, message: 'You lose!'})
                } else {
                    this.endGane('You lose!')
                    const userId = this.userData.opponentUserId
                    socket.emit('finish-game', {userId, message: 'You won!'})
                }
            }
            message.clearMessage()
        } else if (horizontal) {
            if (horizontal === 'x') {
                if (this.userData.type === 'x') {
                    this.endGane('You won!')
                    const userId = this.userData.opponentUserId
                    socket.emit('finish-game', {userId, message: 'You lose!'})
                } else {
                    this.endGane('You lose!')
                    const userId = this.userData.userId
                    socket.emit('finish-game', {userId, message: 'You won!'})
                }
            } else {
                if (this.userData.type === 'o') {
                    this.endGane('You won!')
                    const userId = this.userData.userId
                    socket.emit('finish-game', {userId, message: 'You lose!'})
                } else {
                    this.endGane('You lose!')
                    const userId = this.userData.opponentUserId
                    socket.emit('finish-game', {userId, message: 'You won!'})
                }
            }
            message.clearMessage()
        } 
        else if (diagonal) {
            if (diagonal === 'x') {
                if (this.userData.type === 'x') {
                    this.endGane('You won!')
                    const userId = this.userData.opponentUserId
                    socket.emit('finish-game', {userId, message: 'You lose!'})
                } else {
                    this.endGane('You lose!')
                    const userId = this.userData.userId
                    socket.emit('finish-game', {userId, message: 'You won!'})
                }
            } else {
                if (this.userData.type === 'o') {
                    this.endGane('You won!')
                    const userId = this.userData.userId
                    socket.emit('finish-game', {userId, message: 'You lose!'})
                } else {
                    this.endGane('You lose!')
                    const userId = this.userData.opponentUserId
                    socket.emit('finish-game', {userId, message: 'You won!'})
                }
            }
            message.clearMessage()
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
                return 'x'
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
                return 'o'
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
                return 'x'
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
                return 'o'
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
                return 'x'
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
                return 'o'
            }
        }
    },
    endGane(message) {
        this.game = false
        //console.log('%c' + message, 'font-size: 3em;color:red')
        alert(message)
        init()
    }
}

socket.on('game-step-client', data => {
    gameProcess.syncClick(data)
})

socket.on('game-finish-client', data => {
    alert(data.message)
    init()
})

export default gameProcess;