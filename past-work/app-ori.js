/* card flip V2 */
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false; /*if you don't have "lockBoard", 
your board will hang. Because, the first wrong pair 
has not unflip (after it has flipped) yet, but you have 
started on the next few pairs to unflip. */
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return; /*to prevent from you unflipping the next card 
    before the previous unmatched pair flips back. */
    if (this === firstCard) return; //prevent double clicking.
    // console.log('The flip function works!')
    // console.log(this); /*represents the element of the flipped card*/
    this.classList.add('flip'); /*changes the class from "memory-card" 
    to "memory-card flip". */

    if (!hasFlippedCard) {
        //this is the first time the player has clicked the card
        hasFlippedCard =  true;
        firstCard = this;
        // console.log({hasFlippedCard, firstCard});
    } return;/*else {
        //this is the second time that the card ahs been clicked
        // hasFlippedCard = false;
        secondCard = this;
        checkForMatch()
    }*/
    secondCard = this;
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    //do cards match?
    // console.log(firstCard.dataset.framework);
    // console.log(secondCard.dataset.framework);
    
    /*if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
    } else {
        unflipCards()*/ /*changing the if else statements into a 
        ternary operator. Make it swee swee */
    isMatch ? disableCards() : unflipCards();

}

function disableCards() {
    //it's a match. 
    //Once it is a match, it will remove the eventlistener 'click'
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    resetBoard()
}

function unflipCards() {
    lockBoard = true; /*to prevent from you unflipping the next card 
    before the previous unmatched pair flips back. */
    //not a match
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        // lockBoard = false; /*to prevent from you unflipping the next card 
        //before the previous unmatched pair flips back. */

        resetBoard()
    }, 1500);
}

function resetBoard() { //after each pair of flip, you will reset the function
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null]; //??
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
})(); /*What you are doing here is called IIFE 
(Immeidately Invoked Function Expression). The function is executed
immediately after its definition. */

cards.forEach(card=> card.addEventListener('click', flipCard))

//countdown timer
const timeLeftDisplay=document.querySelector('#time-left')
const startBtn=document.querySelector('#start-button')
let timeLeft = 10

function countDown() {
    setInterval(function() {
        if(timeLeft <= 0 ) {
            clearInterval(timeLeft=0)
        }
        timeLeftDisplay.innerHTML = timeLeft
        timeLeft -=1
    }, 1000)
}

startBtn.addEventListener('click', countDown)