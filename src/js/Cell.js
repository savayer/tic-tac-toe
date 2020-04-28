import socket from './socket';
import { tableObject } from './init';
import domMessage from './dom/message';
import checkPositions from './game-process/checkPositions';

const gameProcess = {
    userData: null,
    matrix: [],
    userCoordinates: [],
    compCoordinates: [],
    ...checkPositions,
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
            socket.emit('game-step', {x, y, type, className, currentUser, userId})
            tableObject.deactivateTable()
            domMessage.setMessage('Opponent\'s turn')
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
        domMessage.setMessage('Your turn')
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
            if (vertical.win === 'x') {
                if (this.userData.type === 'x') {
                    this.endGane('You won!', vertical.winsCoords)
                } else {
                    this.endGane('You lose!', vertical.winsCoords)
                }
            } else {
                if (this.userData.type === 'o') {
                    this.endGane('You won!', vertical.winsCoords)
                } else {
                    this.endGane('You lose!', vertical.winsCoords)
                }
            }
        } else if (horizontal) {
            if (horizontal === 'x') {
                if (this.userData.type === 'x') {
                    this.endGane('You won!')
                } else {
                    this.endGane('You lose!')
                }
            } else {
                if (this.userData.type === 'o') {
                    this.endGane('You won!')
                } else {
                    this.endGane('You lose!')
                }
            }
        } 
        else if (diagonal) {
            if (diagonal === 'x') {
                if (this.userData.type === 'x') {
                    this.endGane('You won!')
                } else {
                    this.endGane('You lose!')
                }
            } else {
                if (this.userData.type === 'o') {
                    this.endGane('You won!')
                } else {
                    this.endGane('You lose!')
                }
            }
        }
    },
    endGane(message, coords) {
        this.game = false
        //console.log('%c' + message, 'font-size: 3em;color:red')
        //alert(message)
        domMessage.setMessage(message)
        this.animateWinCoords(coords)        
        setTimeout(() => {
            domMessage.clearMessage()
            sessionStorage.removeItem('userId')
            sessionStorage.removeItem('opponentUserId')
            sessionStorage.removeItem('roomName')
            tableObject.clearTable()
            socket.emit('game-finish', this.userData)
            this.init()
        }, 3000)
    },
    animateWinCoords(coords) {
        console.log(coords)
        for (let coord of coords) {
            const $td = document.querySelector(`td[data-x="${coord.x}"][data-y="${coord.y}"]`)
            if ($td) {
                $td.classList.add('win-coord')
            }
        }
    }
}

socket.on('game-step-client', data => {
    gameProcess.syncClick(data)
})

export default gameProcess;