// const for everything that move or is UI, be it a counter, be it a result display or  be it a player clickable //

const selections=document.querySelectorAll('.selection');
const computerSelections=document.querySelectorAll('.computerSelection');
const roundCountBox = document.querySelector('.round-count-box');
const roundCountNumber = document.querySelector('.round-count-number');
const winCountBox = document.querySelector('.win-count-box');
const winCountNumber = document.querySelector('.win-count-number');
const looseCountBox = document.querySelector('.loose-count-box');
const looseCountNumber = document.querySelector('.loose-count-number');
const drawCountBox = document.querySelector('.draw-count-box');
const drawCountNumber = document.querySelector('.draw-count-number');
const statBox = document.querySelectorAll('.stat-box'); //to reset them to 0
const roundResult = document.querySelector('.round-result');
const finalResult = document.querySelector('.final-result');
const newGame = document.querySelector('.new-game');


// counters that are updated with playRound and the resetgame funcitons //

let winCounter = 0;
let looseCounter = 0;
let drawCounter = 0;
let roundCounter = 0;

let roundArray = [];

// Whenever the player clicks rock paper or scissors, it calls on playRound with the value selected as input //
function resetGame () {
    roundCounter= 0;
    winCounter = 0;
    looseCounter = 0;
    drawCounter = 0;
    roundCountNumber.innerText = '0';
    winCountNumber.innerText = "0";
    looseCountNumber.innerText = '0';
    drawCountNumber.innerText = '0';
    finalResult.innerText = 'Fight!';
    roundResult.innerText = '';
    roundCountBox.classList.remove('lost');
    roundCountBox.classList.remove('won');
    roundCountBox.classList.remove('drew');
    roundCountBox.classList.add('game-start-class');
    winCountBox.classList.remove('lost');
    winCountBox.classList.remove('won');
    winCountBox.classList.remove('drew');
    winCountBox.classList.add('game-start-class');
    looseCountBox.classList.remove('lost');
    looseCountBox.classList.remove('won');
    looseCountBox.classList.remove('drew');
    looseCountBox.classList.add('game-start-class');
    drawCountBox.classList.remove('lost');
    drawCountBox.classList.remove('won');
    drawCountBox.classList.remove('drew');
    drawCountBox.classList.add('game-start-class');
    finalResult.classList.remove('won');
    finalResult.classList.remove('lost');

    selections.forEach((selection) => {
        selection.classList.remove('game-ended');
        selection.setAttribute('disabled', '');
        selection.addEventListener('click',userClick);

    })


    
}
function startGame() {
    selections.forEach((selection) => { 
        selection.addEventListener('click',() => {
            if (selection.classList.contains('rock')) {
                playRound('rock');
                console.log('savedra');
            }
            else if (selection.classList.contains('paper')) {
                playRound('paper');
            }
            else {
                playRound('scissors');
            }
        });
    });
}

function computerAnimation(computerMoveResult) {
    if (computerMoveResult === 'rock') {
        removeAnimation();
        computerSelections[0].classList.add('userClick');
    } 
    if (computerMoveResult === 'paper') {
        removeAnimation();
        computerSelections[1].classList.add('userClick');
    }
    if (computerMoveResult === 'scissors') {
        removeAnimation();
        computerSelections[2].classList.add('userClick');
    }   
}
function removeAnimation() {
    computerSelections[0].classList.remove('userClick');
    computerSelections[1].classList.remove('userClick');
    computerSelections[2].classList.remove('userClick');
}
// Calls on function checkWinner with player move as input, updates round, socres and the DOM accordingly //
function playRound(playerMove) {
    if (winCounter >=5 || looseCounter >=5) {
        return;
    }
    else {
        roundArray = checkWinner(playerMove,computerMove()); //feeds into roundArray the chcekwiiner array
        roundCounter += 1;
        roundCountNumber.innerText = roundCounter;
        computerAnimation(roundArray[2]);
        if (roundArray[0] === 'win') {
            winCounter += 1;
            winCountNumber.innerText = winCounter;
    // This is uneficcient, but it's my first attempt at the stats box change color
            roundCountBox.classList.remove('lost');
            roundCountBox.classList.remove('drew');
            roundCountBox.classList.add('won');
            roundResult.classList.remove('lost');
            roundResult.classList.remove('drew');
            roundResult.classList.add('won');
            winCountBox.classList.remove('lost');
            winCountBox.classList.remove('drew');
            winCountBox.classList.add('won');
            drawCountBox.classList.remove('lost');
            drawCountBox.classList.remove('drew');
            drawCountBox.classList.add('won');
            looseCountBox.classList.remove('lost');
            looseCountBox.classList.remove('drew');
            looseCountBox.classList.add('won');

            roundResult.innerText = `You ${roundArray[0]} the round! ${roundArray[1]} beats ${roundArray[2]}`;
            

        }
        else if (roundArray[0] === 'loose') {

            looseCounter += 1;
            looseCountNumber.innerText = looseCounter;
            roundCountBox.classList.remove('won');
            roundCountBox.classList.remove('drew');
            roundCountBox.classList.add('lost');
            roundResult.classList.remove('won');
            roundResult.classList.remove('drew');
            roundResult.classList.add('lost');
            winCountBox.classList.remove('won');
            winCountBox.classList.remove('drew');
            winCountBox.classList.add('lost');
            drawCountBox.classList.remove('won');
            drawCountBox.classList.remove('drew');
            drawCountBox.classList.add('lost');
            looseCountBox.classList.remove('won');
            looseCountBox.classList.remove('drew');
            looseCountBox.classList.add('lost');

            roundResult.innerText = `You ${roundArray[0]} the round :( ${roundArray[1]} gets btfo by ${roundArray[2]}`;
        }
        else {
            drawCounter += 1;
            drawCountNumber.innerText = drawCounter;

            roundCountBox.classList.remove('lost');
            roundCountBox.classList.remove('won');
            roundCountBox.classList.add('drew');
            roundResult.classList.remove('lost');
            roundResult.classList.remove('won');
            roundResult.classList.add('drew');
            winCountBox.classList.remove('won');
            winCountBox.classList.remove('lost');
            winCountBox.classList.add('drew');
            drawCountBox.classList.remove('won');
            drawCountBox.classList.remove('lost');
            drawCountBox.classList.add('drew');
            looseCountBox.classList.remove('won');
            looseCountBox.classList.remove('lost');
            looseCountBox.classList.add('drew');

            roundResult.innerText = `${roundArray[0]}`;
        }
        if (winCounter >= 5) {
            endGame(true);
        } else if (looseCounter >=5) {
            endGame(false);
        }
    }
}
// Takes in both the playermove selection and the randomly generated computer move, and returns a string, either "win" "draw" or "loose"//
function checkWinner (playerMove,computerMove) {
    let result;
    switch (true) {
        case playerMove === computerMove:
            result = "draw";
            break;
        case playerMove === "rock" && computerMove === 'scissors':
        case playerMove === "paper" && computerMove === 'rock':
        case playerMove === "scissors" && computerMove === 'paper':
            result = 'win';
            break; 
        case playerMove === 'rock' && computerMove === 'paper':
        case playerMove === 'paper' && computerMove === 'scissors':
        case playerMove === 'scissors' && computerMove === 'rock':
            result = "loose";
            break;
            default:
                result = "checkwinnerisflawedcheckYourCode";
            break;
    }
    return [result, playerMove, computerMove];
}
// gives a random move: rock, paper or scissors that will be used as the computer move in both playRound and checkwinner//
function computerMove() {
    const moves = ['rock','paper','scissors'];
    const cpuMove = moves[Math.floor(Math.random()*moves.length)];
    return cpuMove
}
// when called ( reached 5 wins or looses) it will prompt the user saying he won or lost, play the sound , offer a button tu replay and lock all further selections

function endGame(result) {
    finalResult.innerText = result === true ? 'You have beaten Bog, Pamp eet!' : 'Ring ring... he bought... Damp eet';
    finalResult.classList.add(result === true ? 'won' : 'lost');

    selections.forEach((selection) => {
        selection.classList.add('game-ended');
        selection.setAttribute('disabled', '');
        selection.removeEventListener('click',userClick);
    })
}
//makes the animated box around the object
function userHover() {
    if (winCounter<5 && looseCounter<5) {
        this.classList.add('userHover');
        console.log('hovvered');
    }
}
// self explanatory
function removeHover() {
    this.classList.remove('userHover');
}
// Animates selection for clicking and computer "clicking" //
function userClick(WinDrawLoose) {
        this.classList.remove('userClick');
        this.classList.add('userClick');
}

function removeClick() {
    this.classList.remove('userClick');
}

//removes hover animations when mouse leaves
selections.forEach((selection) => {
    selection.addEventListener('mouseleave', removeHover);
});

//adds hover animation
selections.forEach((selection) => { 
    selection.addEventListener('mouseover', userHover);
});
//adds on click animation
selections.forEach((selection) => {
    if (winCounter< 5 && looseCounter < 5) {
        selection.addEventListener('click',userClick);
    }
    else {
        selection.removeEventListener('click',userClick);
    }
});
// after x seconds removes animation elemente user chose
selections.forEach((selection) => {
    selection.addEventListener('transitionend',removeClick); 
});

computerSelections.forEach((computerSelection) => {
    computerSelection.addEventListener('transitionend',removeClick);
})

newGame.addEventListener('click', () => {
    resetGame();
    console.log('dalee');
})

startGame();