'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const POWERFOOD = '🥞'
const CHERRY = '🍒'
var gFoodCount = 0
var gCollectedFood = 0
var CherryInterval


const gGame = {
    score: 0,
    isOn: false
}
var gBoard

function init() {
    var elSpan = document.querySelector('h2 span')
    elSpan.innerText = 0
    gFoodCount = 0
    gCollectedFood = 0
    var modal = document.querySelector('.modal')
    modal.style.display = 'none'
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    // console.table(gBoard)
    CherryInterval = setInterval(placeCherry, 5000)

    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL

            }
            if (board[i][j] === FOOD) {
                gFoodCount++
            }

        }

    }
    gFoodCount--
    console.log(gFoodCount);
    board[1][8] = POWERFOOD
    board[8][8] = POWERFOOD
    board[1][1] = POWERFOOD
    board[8][1] = POWERFOOD
    return board
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff
    var elSpan = document.querySelector('h2 span')
    elSpan.innerText = gGame.score

}


function gameOver() {
    console.log('Game Over')
    gGame.isOn = false
    clearInterval(gGhostsInterval)
    clearInterval(CherryInterval)
    renderCell(gPacman.location, EMPTY)
}

function placeCherry() {
    var cell = getEmptyCell()
    if (!cell) return
    // console.log(cell);
    gBoard[cell.i][cell.j] = CHERRY
    renderCell(cell, CHERRY)
}
