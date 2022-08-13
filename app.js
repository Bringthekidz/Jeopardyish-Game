const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score')

const jeopardyCatergories = [
    {
        genre: "WHO",
        questions: [
            {
                question: 'Who wrote the Harry Potter series?',
                answers: ['JK Rowling', 'JRR Tolkien'],
                correct: 'JK Rowling',
                level: 'easy',
            },
            {
                question: 'Who sings the song Fix My Eyes?',
                answers: ['Katy Perry','for KING and COUNTRY'],
                correct: 'for KING and COUNTRY',
                level: 'medium'
            },
            {

                question: 'Who is the creator of the L.O.L. dolls?',
                answers: ['Isaac Larian', 'Harry Styles'],
                correct: 'Isaace Larian',
                level: 'hard',
            },
        
        ]
    },
    {
        genre: "WHERE",
        questions:  [
            {
                question: 'Where does the US President live?',
                answers: ['Washington, D.C.', 'Bacon Level, Alabama'],
                correct: 'Washington, D.C',
                level: 'easy',
             },

            {
                question: 'Where is the Dude Perfect Headquarters?',
                answers: [ 'Miami,Florida', 'Frisco,Texas'],
                correct: 'Frisco,Texas',
                level: 'medium',
            
             },
             {
                question: 'Where is the Wailing Wall?',
                answers: ['Jerusalem','Dijbouti'],
                correct: 'Jerusalem',
                level: 'hard'


             },      
          
         ]
    },
    {
        genre: 'WHAT',
        questions: [
            {
                question: 'What is the color of a ruby?',
                answers: ['Purple' , 'Red'],
                correct: 'Red',
                level: 'easy',

            },
            {
                question: 'What is an americano?',
                anwers: ['espresso shots with hot water', 'Coffee,cream and sugar'],
                correct: 'espresso shots with hot water',
                level: 'medium',
            },
            {
                question: 'What is the strongest material in the world?',
                answers:[ 'Diamonds', 'Graphene'],
                correct: 'Graphene',
                level: 'hard',
            },

        ]
    }
]

let score = 0




function addCatergory(catergory){
    const column = document.createElement('div')
    column.classList.add('genre-column')
    

    const genreTitle = document.createElement('div')
    genreTitle.classList.add('genre-title')
    genreTitle.innerHTML = catergory.genre

    column.appendChild(genreTitle)
    game.append(column)

    catergory.questions.forEach(question => {
        const card = document.createElement('div')
        card.classList.add('card')
        column.append(card)

        if(question.level === 'easy') {
            card.innerHTML = 100
        }
        if (question.level === 'medium') {
            card.innerHTML = 200
        }
        if (question.level === 'hard') {
            card.innerHTML = 300
        }

        card.setAttribute('data-question', question.question)
        card.setAttribute('data-answer-1', question.answers[0])
        card.setAttribute('data-answer-2', question.answers[1])
        card.setAttribute('data-correct', question.correct)
        card.setAttribute('data-value', card.getInnerHTML())

        card.addEventListener('click', flipCard)
    })

}

jeopardyCatergories.forEach(catergory => addCatergory(catergory))

function flipCard() {
    this.innerHTML = ""
    this.style.fontSize = "15px"
    this.style.lineHeight = "30px"
    const textDisplay = document.createElement('div')
    textDisplay.classList.add('card-text')
    textDisplay.innerHTML = this.getAttribute('data-question')
    const firstButton = document.createElement('button')
    const secondButton = document.createElement('button')
    firstButton.classList.add('first-button')
    secondButton.classList.add('second-button')
    firstButton.innerHTML = this.getAttribute('data-answer-1')
    secondButton.innerHTML = this.getAttribute('data-answer-2')
    this.append(textDisplay, firstButton, secondButton)

    const allCards = Array.from(document.querySelectorAll('card'))
    allCards.forEach(card => card.removeEventListener('click',flipCard))

}

function getResult(){
    const allCards = Array.from(document.querySelectorAll('card'))
    allCards.forEach(card => card.addEventListener('click', flipCard))
    const cardOfButton = this.parentElement

    if(cardOfButton.getAttribute('data-correct') == this.innerHTML) {
        score = score + parseInt(cardOfButton.getAttribute('data-value'))
        scoreDisplay.innerHTML = score
        cardOfButton.classList.add('correct-answer')
        setTimeout(() => {
            while(cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
                cardOfButton.innerHTML = cardOfButton.getAttribute('data-value')
        },100)
        

        } else {
             cardOfButton.classList.add('wrong-answer')
        setTimeout(() => {
            while(cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = 0
        }, 100)

    }
    cardOfButton.removeEventListener('click', flipCard)
}


