'use strict'

const GHOST = '&#9781'
var gGhosts
var gGhostsInterval
var gDeadGhosts = []
function createGhost(board) {

    const ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor(),
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    // 3 ghosts and an interval
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }

    gGhostsInterval = setInterval(moveGhosts, 1000)

}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        moveGhost(ghost)
    }

}

function moveGhost(ghost) {
    // console.log('ghost', ghost)
    // figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    // console.log('moveDiff', moveDiff)

    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    // console.log('nextLocation', nextLocation)

    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell', nextCell)

    // return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    // hitting a pacman? call gameOver
    if (nextCell === GHOST && gPacman.isSuper) {
        for (var i = 0; i < gGhosts.length; i++) {
            if (gGhosts[i].location.i === nextCell.i && gGhosts[i].location.j === nextCell.j) {
                gGhosts.splice(i, 1)
            }
        }
    }
    else if (nextCell === PACMAN) {
        var elModal = document.querySelector('.modal')
        var elH2 = document.querySelector('.modal h2')
        elH2.innerText = 'you lose '
        elModal.style.display = 'block'
        gameOver()
        return
    }

    // moving from current location:
    // update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent)


    // Move the ghost to new location:
    // update the model (save cell contents so we can restore later)
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[ghost.location.i][ghost.location.j] = GHOST

    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    if (!gPacman.isSuper) return `<span style="color: ${getRandomColor()};">${GHOST}</span>`
    else { return `<span style="color: Blue;">${GHOST}</span>` }
}