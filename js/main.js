const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrong-letters')
const popup = document.getElementById('popup-container')
const finalMessage = document.getElementById('final-message')
const btnPlay = document.getElementById('play-again')
const notificationEl = document.getElementById('notification-container')
// this is for mobile phones, so keyboard will trigger on mobile
const hiddenInput = document.querySelector('.hidden-input input')

const figureParts = document.querySelectorAll('.figure-part')

const wordsArray = ['anksioznost', 'aceton', 'asocijalan', 'azbuka', 'afrodizijak', 'autsajder', 'autoritet', 'autobiografija', 'auditorijum', 'aspirator', 'asteroid', 'ambiciozan', 'avanturista', 'automatizovati', 'bumerang', 'bungalov', 'buzdovan', 'botanicar', 'bankar', 'bombonjera', 'biblioteka', 'bakterija', 'balansiranje', 'cirkulacija', 'cirkus', 'cirkulisati', 'cinican', 'cementirati', 'cenzurisati', 'centrala', 'centimetar', 'centrifuga', 'duplikat', 'duvan', 'dukat', 'dramatizacija', 'dresiranje', 'dominantan', 'doberman', 'distributer', 'disciplinovan', 'distanciran', 'disponiran', 'diskutovati', 'diskrecija', 'diskreditovan', 'diskontinuitet', 'diskvalifikovan', 'diplomatija', 'dijalekat', 'dijagnostika', 'dizajner', 'emotivan', 'efikasan', 'euforican', 'elektricar', 'espreso', 'estetika', 'eskadrila', 'eukaliptus', 'epopeja', 'epidemiologija', 'entuzijast', 'enterijer', 'ekologija', 'elektricitet', 'ekonomija', 'funkcionalan', 'frizer', 'fotograf', 'fotografija', 'fotogenican', 'flaster', 'finansirati', 'fikus', 'farmerke', 'familija', 'formatirati', 'favozirovati', 'fakultet']

let selectedWord = wordsArray[Math.floor(Math.random() * wordsArray.length)]

// console.log(selectedWord)

const correctLetters = []
const wrongLetters = []

// SHOW THE HIDDEN WORD
function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord
            .split('')
            .map(letter => `
                    <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                    </span>
                    `
            )
            .join('')
        }
    `
    // console.log(wordEl.innerText)
    // delete another line
    const innerWord = wordEl.innerText.replace(/\n/g, "")
    // console.log(innerWord)

    // check if guessed the word
    if (innerWord === selectedWord) {
        finalMessage.innerText = `Congratulations! You Won! ???? 
        Hidden word was: ${selectedWord}
        `
        popup.style.display = "flex"
    }
    hiddenInput.focus()
}

// UPDATE WRONG LETTERS
function updateWrongLettersEl() {
    // display wrong letters
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ""}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `
    // display parts of figure
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length
        // console.log(errors)
        // if index of parts are lower then number of errors, display part
        if (index < errors) {
            part.style.display = 'block'
        } else {
            part.style.display = 'none'
        }
    })

    // check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = `Unfortunately you lost. ????`
        popup.style.display = 'flex'
    }
}

// SHOW NOTIFICATION
function showNotification() {
    notificationEl.classList.add('show')

    setTimeout(() => {
        notificationEl.classList.remove('show')
    }, 2000);
}

// INPUT EVENT SPLIT FOR DESKTOP AND MOBILE
if (window.innerWidth > 700) {
    hiddenInput.style.display = 'none'
    // KEYDOWN EVENT - FOR DESKTOP
    document.body.addEventListener('keydown', (e) => {
        // console.log(e.key)

        // check only for letters
        const test = (/[a-z]/gi).test(e.key)
        const char = e.key.toLowerCase()

        if (test) {
            // console.log(char)

            // if hidden word includes letter that is pressed
            if (selectedWord.includes(char)) {
                if (!correctLetters.includes(char)) {
                    correctLetters.push(char)
                    displayWord()
                } else {
                    showNotification()
                }
            } else {
                if (!wrongLetters.includes(char)) {
                    wrongLetters.push(char)

                    updateWrongLettersEl()
                } else {
                    showNotification()
                }
            }
        }
    })
}

if (window.innerWidth <= 700) {
    // TEXT INPUT EVENT - FOR MOBILE DEVICES
    window.addEventListener('textInput', (e) => {
        // console.log(e.data)

        // check only for letters
        const test = (/[a-z]/gi).test(e.data)
        const char = e.data.toLowerCase()

        if (test) {
            console.log(char)
            // if hidden word includes letter that is pressed
            if (selectedWord.includes(char)) {
                if (!correctLetters.includes(char)) {
                    correctLetters.push(char)
                    displayWord()
                } else {
                    showNotification()
                }
            } else {
                if (!wrongLetters.includes(char)) {
                    wrongLetters.push(char)

                    updateWrongLettersEl()
                } else {
                    showNotification()
                }
            }
        }
        hiddenInput.focus()
    })
}

// PLAY AGAIN BUTTON
btnPlay.addEventListener('click', () => {
    // empty arrays
    correctLetters.splice(0)
    wrongLetters.splice(0)
    // get random word again
    selectedWord = wordsArray[Math.floor(Math.random() * wordsArray.length)]
    // display word
    displayWord()
    // update letters in arrays
    updateWrongLettersEl()
    // hide the popup
    popup.style.display = 'none'
    // this is for mobile phones, so keyboard will trigger on mobile
    hiddenInput.value = ''
})

displayWord()