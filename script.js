let tieCounter=0;
let computerWinCounter=0;
let playerWinCounter=0;
let playerSelection;
let computerSelection;
let roundCounter=0;

function playerSelectionFunction() {
    playerSelection=window.prompt("choose your fighter: type \"rock\" , \"paper\"  , \"scissors\"","rock").toLowerCase().trim();
}
function computerSelectionFunction() {
    randomNumber=Math.floor(Math.random()*(3-1+1)+1);
    if (randomNumber===1){
        computerSelection="rock";
    }
    else if (randomNumber===2){
        computerSelection="paper";
    }
    else {
        computerSelection="scissors";
    }
}
function round(){
    if (playerSelection==="rock") {
        if (computerSelection==="rock") {
            ++tieCounter;
        }
        else if (computerSelection==="paper") {
            ++computerWinCounter;
        }
        else if (computerSelection==="scissors") {
            ++playerWinCounter;
        }
    }
    if (playerSelection==="paper") {
        if (computerSelection==="rock") {
            ++playerWinCounter;
        }
        else if (computerSelection==="paper") {
            ++tieCounter;
        }
        else if (computerSelection==="scissors") {
            ++computerWinCounter;
        }
    }
    if (playerSelection==="scissors") {
        if (computerSelection==="rock") {
            ++computerWinCounter;
        }
        else if (computerSelection==="paper") {
            ++playerWinCounter;
        }
        else if (computerSelection==="scissors") {
            ++tieCounter;
        }
    }
    ++roundCounter;
}
function game() {
    do {
        playerSelectionFunction();
        computerSelectionFunction();
        round();
        console.log(playerWinCounter);
        console.log(computerWinCounter);
        console.log(tieCounter);
        console.log(roundCounter);
    }
    while (computerWinCounter<5 && playerWinCounter<5);
    if (computerWinCounter===5) {
        window.prompt("Computer has won");
    }
    else if ( playerWinCounter===5) {
        window.prompt("You have won!!");
    }
}
game();
console.log(tieCounter);
console.log(computerWinCounter);
console.log(playerWinCounter);
console.log(roundCounter);