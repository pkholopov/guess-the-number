const 
$startBox   = document.querySelector('.game_start'),
$mainBox    = document.querySelector('.game_main'),
$endBox     = document.querySelector('.game_end'),

guessPhrases = [`Ты загадал число`, 'Возможно, это', 'Предположу, что загаданное число — это', 'Думаю, искомое число —']

let 
start = 1,
end = $startBox.querySelector('input').value,
guess = start + Math.floor((end - start) / 2)

function startGame() {
    toggleVisibility('.game_start', '.game_main')
    guess = start + Math.floor((end - start) / 2)
    showGuess(guess)
}

function guessNumber(answer) {
    if (answer === '<') {
        end = guess
    } else if (answer === '>') {
        start = guess 
    }
    guess = start + Math.floor((end - start) / 2)
    showGuess(guess)
}
function showGuess(guess) {
    $mainBox.querySelector('p').innerHTML = `${guessPhrases[getRandom(0, guesPhrases.length - 1)]} <strong>${guess}</strong>!`
}
function endGame() {
    $endBox.querySelector('p').innerHTML = `Было загадано число <strong>${guess}</strong>! Как я сразу не догадался!`
    toggleVisibility('.game_main', '.game_end')
}

function repeat() {
    start = 1
    end = $startBox.querySelector('input').value
    guess = start + Math.floor((end - start) / 2)
    toggleVisibility('.game_start', '.game_end')
}

function toggleVisibility(...elements) {
    for (let element of elements) {
            document.querySelector(element).classList.toggle('hide')
    }
}

function getRandom(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min))
}

$startBox.querySelector('button').addEventListener('click', startGame)
$startBox.querySelector('input').addEventListener('blur', e => end = e.target.value)
$mainBox.addEventListener('click', (e) => {
    if (e.target.dataset) guessNumber(e.target.dataset.answer)
})
$mainBox.querySelector('.got_it').addEventListener('click', endGame)
$endBox.querySelector('button').addEventListener('click', repeat)