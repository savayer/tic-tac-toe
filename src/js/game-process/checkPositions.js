export default {
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
                    if (matrix[count][coord.y+countComp] === 'C' || matrix[count][coord.y-countComp] === 'C') {                    
                        countComp++
                    } else {
                        countComp = 0;
                        break;
                    }
                }
            } else {
                for (let count = coord.x; count < coord.x-5; count--) {
                    if (matrix[count][coord.y+countComp] === 'C' || matrix[count][coord.y-countComp] === 'C') {
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
}