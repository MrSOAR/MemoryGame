document.addEventListener('DOMContentLoaded', () => {
    //card options
    const cardArray = [
        {
        name: 'Aatrox-1',
        img: 'images/Aatrox-1.png'
        },
        {
        name: 'Ahri-2',
        img: 'images/Ahri-2.png'
        },
        {
        name: 'Akali-3',
        img: 'images/Akali-3.png'
        },
        {
        name: 'Alistar-4',
        img: 'images/Alistar-4.png'
        },
        {
        name: 'Amumu-5',
        img: 'images/Amumu-5.png'
        },
        {
        name: 'Anivia-6',
        img: 'images/Anivia-6.png'
        },
        {
        name: 'Aatrox-1',
        img: 'images/Aatrox-1.png'
        },
        {
        name: 'Ahri-2',
        img: 'images/Ahri-2.png'
        },
        {
        name: 'Akali-3',
        img: 'images/Akali-3.png'
        },
        {
        name: 'Alistar-4',
        img: 'images/Alistar-4.png'
        },
        {
            name: 'Amumu-5',
            img: 'images/Amumu-5.png'
            },
        {
        name: 'Anivia-6',
        img: 'images/Anivia-6.png'
        },
    ]

    cardArray.sort(() => 0.5 - Math.random())

    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector ('#result')
    var cardsChosen =[]
    var cardsChosenId = []
    var cardsWon =[]

    //create board
    let createBoard = () => {
    // function createBoard() {
        for (let i=0; i<cardArray.length; i++) {
            var card = document.createElement('img')
            card.setAttribute('src', 'images/blank.png')
            card.setAttribute('data-id',i)
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
    }

    //check for matches
    let checkForMatch = () => {
    // function checkForMatch() {
        var cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId [1]
        if (optionOneId === optionTwoId) {
            cards[optionOneId].setAttribute('src', 'images/blank.png')
            cards[optionOneId].setAttribute('src', 'images/blank.png')
            alert('You have clicked the same image before!')
        } 
        else if (cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].setAttribute('src', 'images/blank.png')
            cards[optionOneId].setAttribute('src', 'images/blank.png')
            cards[optionOneId].removeEventListener('click',flipCard)
            cards[optionTwoId].removeEventListener('click',flipCard)
            cardsWon.push(cardsChosen)
        }
        else { //this is the part that I need to edit because it is irritating.
            cards[optionOneId].setAttribute('src','images/blank.png')
            cards[optionTwoId].setAttribute('src','images/blank.png')
            alert('Sorry, try again')
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length
        if (cardsWon.length === cardArray.length/2) {
            resultDisplay.textContent = 'Congratulations! You found them all!'
        }
    }

    //flip your cards
    // let flipCard = () => {
    function flipCard() {
        var cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }
    createBoard()

})

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

//Carousel. 
//I do not know if I should put it inside or outside of the event listener.
$('.carousel').carousel()

