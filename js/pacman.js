'use strict'
// style="transform: rotate(0);
var PACMAN = `<img style="transform: rotate(0deg)"; src="img/Pac.gif">`

var gPacman
function createPacman(board) {
    // initialize gPacman...
    gPacman = {
        location: {
            i: 6,
            j: 7
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev)
    // console.log('nextLocation', nextLocation)
    if (!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell', nextCell)

    // return if cannot move
    if (nextCell === WALL) return
    // hitting a ghost? call gameOver

    if (gPacman.isSuper && nextCell === GHOST) {

        for (var i = 0; i < gGhosts.length; i++) {
            // console.log();
            if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
                gDeadGhosts.push(gGhosts[i])
                gGhosts.splice(i, 1)
                setTimeout(() => {
                    gGhosts.push(...gDeadGhosts)
                }, 5000);
                console.log(gGhosts);
            }

        }

    }
    else if (nextCell === GHOST) {
        var elModal = document.querySelector('.modal')
        var elH2 = document.querySelector('.modal h2')
        elH2.innerText = 'you lose '
        elModal.style.display = 'block'
        gameOver()
        return
    }
    if (nextCell === FOOD) {
        gCollectedFood++
        updateScore(1)
        // console.log(gFoodCount);
        if (gCollectedFood === gFoodCount) {
            var elModal = document.querySelector('.modal')
            var elH2 = document.querySelector('.modal h2')
            elH2.innerText = 'YOU WON '
            elModal.style.display = 'block'
            gameOver()
        }

    }
    if (nextCell === POWERFOOD) {
        if (gPacman.isSuper) return
        powerFoodEffect()
        moveGhosts()
        gCollectedFood++
    }

    if (nextCell === CHERRY) {
        console.log(CHERRY);
        updateScore(10)
    }

    // moving from current location:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman to new location:
    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // console.log('eventKeyboard.code', eventKeyboard.code)
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--
            // console.log(PACMAN);
            PACMAN = `<img style="transform: rotate(270deg)"; src="img/Pac.gif">`
            break
        case 'ArrowDown':
            nextLocation.i++
            PACMAN = `<img style="transform: rotate(85deg)"; src="img/Pac.gif">`
            break
        case 'ArrowLeft':
            nextLocation.j--
            PACMAN = `<img style="transform: rotate(180deg)"; src="img/Pac.gif">`
            break
        case 'ArrowRight':
            nextLocation.j++
            PACMAN = `<img style="transform: rotate(0deg)"; src="img/Pac.gif">`
            break
        default: return null
    }
    return nextLocation
}

function powerFoodEffect() {
    gPacman.isSuper = true
    setTimeout(() => {
        gPacman.isSuper = false
    }, 5000);
}




