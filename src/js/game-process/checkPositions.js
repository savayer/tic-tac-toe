export default {
    checkVertical() {
        const matrix = this.matrix
        let winsCoords = []
        let countUser = 0
        let countComp = 0
        
        for (let coord of this.userCoordinates) {
            if (coord.y + 5 <= 20) {
                for (let count = coord.y; count < coord.y+5; count++) {
                    if (matrix[coord.x][count] === 'U') {
                        countUser++
                        winsCoords.push({
                            x: coord.x,
                            y: count
                        })
                    } else {
                        winsCoords = [];
                        countUser = 0;
                        break;
                    }
                }
            } else {
                for (let count = coord.y; count < coord.y-5; count--) {
                    if (matrix[coord.x][count] === 'U') {
                        countUser++
                        winsCoords.push({
                            x: coord.x,
                            y: count
                        })
                    } else {
                        countUser = 0;
                        winsCoords = [];
                        break;
                    }
                }
            }
            
            if (countUser === 5) {
                return {
                    win: 'x',
                    winsCoords
                }
            }
        }

        winsCoords = [];
        for (let coord of this.compCoordinates) {
            if (coord.y + 5 <= 20) {
                for (let count = coord.y; count < coord.y+5; count++) {
                    if (matrix[coord.x][count] === 'C') {
                        countComp++
                        winsCoords.push({
                            x: coord.x,
                            y: count
                        })
                    } else {
                        winsCoords = [];
                        countComp = 0;
                        break;
                    }
                }
            } else {
                for (let count = coord.y; count < coord.y-5; count--) {
                    if (matrix[coord.x][count] === 'C') {
                        countComp++
                        winsCoords.push({
                            x: coord.x,
                            y: count
                        })
                    } else {
                        winsCoords = [];
                        countComp = 0;
                        break;
                    }
                }
            }
            if (countComp === 5) {
                return {
                    win: 'o',
                    winsCoords
                }
            }
        }
    },
    checkHorizontal() {
        const matrix = this.matrix
        let winsCoords = []
        let countUser = 0
        let countComp = 0        
        
        for (let coord of this.userCoordinates) {
            if (coord.x + 5 <= 20) {
                for (let count = coord.x; count < coord.x+5; count++) {
                    if (matrix[count][coord.y] === 'U') {
                        countUser++
                        winsCoords.push({
                            x: count,
                            y: coord.y
                        })
                    } else {
                        winsCoords = [];
                        countUser = 0;
                        break;
                    }
                }
            } else {
                for (let count = coord.x; count < coord.x-5; count--) {
                    if (matrix[count][coord.y] === 'U') {
                        countUser++
                        winsCoords.push({
                            x: count,
                            y: coord.y
                        })
                    } else {
                        winsCoords = [];
                        countUser = 0;
                        break;
                    }
                }
            }
            
            if (countUser === 5) {
                return {
                    win: 'x',
                    winsCoords
                }
            }
        }

        winsCoords = [];
        for (let coord of this.compCoordinates) {
            if (coord.x + 5 <= 20) {
                for (let count = coord.x; count < coord.x+5; count++) {
                    if (matrix[count][coord.y] === 'C') {
                        countComp++
                        winsCoords.push({
                            x: count,
                            y: coord.y
                        })
                    } else {
                        winsCoords = [];
                        countComp = 0;
                        break;
                    }
                }
            } else {
                for (let count = coord.x; count < coord.x-5; count--) {
                    if (matrix[count][coord.y] === 'C') {
                        countComp++
                        winsCoords.push({
                            x: count,
                            y: coord.y
                        })
                    } else {
                        winsCoords = [];
                        countComp = 0;
                        break;
                    }
                }
            }            
            if (countComp === 5) {
                return {
                    win: 'o',
                    winsCoords
                }
            }
        }      
    },
    checkDiagonal() {
        for (let coord of this.userCoordinates) {
            let res = this.checkLeftDiagonal(coord, 'U')
            if (res.amount === 5) {
                return {
                    win: 'x',
                    winsCoords: res.winsCoords
                }
            }
            
            res = this.checkRightDiagonal(coord, 'U')
            if (res.amount === 5) {
                return {
                    win: 'x',
                    winsCoords: res.winsCoords
                }
            }
        }

        for (let coord of this.compCoordinates) {
            let res = this.checkLeftDiagonal(coord, 'C')
            if (res.amount === 5) {
                return {
                    win: 'o',
                    winsCoords: res.winsCoords
                }
            }
    
            res = this.checkRightDiagonal(coord, 'C')
            if (res.amount === 5) {
                return {
                    win: 'o',
                    winsCoords: res.winsCoords
                }
            }
        }
    },
    checkLeftDiagonal(coord, searchParam) { // from left top to bottom right
        if (coord.x+5 > 20) return {}

        let winsCoords = [];
        let amountClicked_X_or_O = 0;
        
        for (let count = coord.x; count < coord.x+5; count++) {
            if (this.matrix[count][coord.y+amountClicked_X_or_O] === searchParam) {
                winsCoords.push({
                    x: count,
                    y: coord.y + amountClicked_X_or_O
                })

                amountClicked_X_or_O++
            } else {
                winsCoords = [];
                amountClicked_X_or_O = 0;
                break;
            }
        }

        return {
            amount: amountClicked_X_or_O,
            winsCoords
        }
    },
    checkRightDiagonal(coord, searchParam) {
        if (coord.x-5 < -1) return {}

        let winsCoords = [];
        let amountClicked_X_or_O = 0;

        for (let count = coord.x; count > coord.x-5; count--) {
            if (this.matrix[count][coord.y+amountClicked_X_or_O] === searchParam) {
                winsCoords.push({
                    x: count,
                    y: coord.y + amountClicked_X_or_O
                })

                amountClicked_X_or_O++
            } else {
                winsCoords = [];
                amountClicked_X_or_O = 0;
                break;
            }
        }

        return {
            amount: amountClicked_X_or_O,
            winsCoords
        }
    }
}