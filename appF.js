let lockBoard = true;

let start = document.getElementById('startBtn');

let gameStart =function () {
    startBtn.style.display='none';
    lockBoard = false;
}

start.addEventListener('click', gameStart)



let timeSeconds = 0;
let timeMinutes = 0;
let timeHour = 0;
let interval;
let timer = document.querySelector('#startBtn');
let timerClicked = false;

function initialize() {
    if (timerClicked ===false) {
        timerClicked = true;

        interval = setInterval(function() {
            timer.innerText = `minute ${timeMinutes} second ${timeSeconds}`;
            timeSeconds++;
            
            if (timeSeconds == 60) {
                timeMinutes++;
                timeSeconds=0;
            }
            if (timeMinutes ==60) {
                timeHour++;
                timeMinutes = 0;
            }
        }, 1000);
    }
}
timer.addEventListener('click',initialize)



let cards=document.querySelectorAll('.memory-card');
function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  };

shuffle();


let firstCard, secondCard;
let flippedCards = false;

for (i=0; i<cards.length; i++){
    cards[i].addEventListener('click', flipCard)
}
// for (i=0; i<cards.length;i++) {
//     cards[i].addEventListener("click",flipCard)
// }

function flipCard() {
    if (lockBoard === true) return;
    if (this===firstCard) return;
    this.classList.add('flip'); 

    if (!flippedCards) {
        flippedCards = true;
        firstCard = this;

        return;
    }

    secondCard = this;

    calculation();
}



let totalScore = 0;
let count = 0;
let flipCount = document.querySelector('#count');

let calculation = () => {

    count = count+1;
    flipCount.innerText = count;


    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch) {
        disableCard();
        totalScore = totalScore +1;
        if (totalScore === 10) {
            gameWon()
        };
        }else {
            unflipCard();
        };
};



let  disableCard = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    resetGame();
}




let unflipCard = () => {
    lockBoard=true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetGame();
    }, 1500)
}



function resetGame() { //reset to the original
    [flippedCards, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}



let gameOver = document.querySelector("#game-over");

let gameWon = () => {
    finalTime = timer.innerText;
    finalCount = flipCount.innerText;

    congratulation = document.querySelector('#congratulations')
    congratulation.innerText = `You took ${finalTime} and ${finalCount} moves! The Justice League survives!`;

    let unhide = document.querySelector(".hide");
    unhide.classList.remove("hide");
}
