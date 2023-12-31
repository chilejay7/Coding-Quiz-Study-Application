const startQuiz = document.querySelector('#start-btn');
const introParagraph = document.querySelector('#intro')
const timerDisplay = document.querySelector('#timer');
const docMain = document.querySelector('main')
const answerOL = document.querySelector('#answers');

// This hides the answserOL when the page first loads.  Properties and their corresponding values for many statements were pulled through the console using the console.dir(name of variable command).
let hideOL = answerOL.hidden = true;

let timeLeft = 45;

timerCountdown = () => {
        let countdownInterval = setInterval(function() {
        // console.log(timeLeft);
        timeLeft--;
        timerDisplay.innerHTML = `Timer: ${timeLeft}`;

        // This comparison operator had to be updated to less than or equals due to a bug when decrementing time.  If a wrong answer was given and time was subtracted to a value below zero, the clock would run indefinitely.
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            console.log('Time is up!')
            gameOver();
        } else { 
            // console.log('Keep going!')
        }
    }, 1000);
}

//This function triggers when the start button is clicked.  It will remove the start button (id of startQuiz) and the introductory paragraph (id of introParagraph) from the document, allowing only the quetsion and answers to be displayed.  It also triggers the countdown timer and question generator.

startQuiz.addEventListener('click', function() {
    console.log("You started the quiz!");
    startQuiz.remove() & introParagraph.remove();
    timerCountdown();
    questionGen();
    displayAnswerOL();
    // correctDisplay.remove();
})

// This function sets the hidden property of the answerOL to false to display the possible answers.
displayAnswerOL = () => {
    answerOL.hidden = false;
}

// Generate random questions.  Four potential answers with buttons to select answer.  This is an ol to generate the four button elements with possible answers.  Questions and their answers can be placed in objects.

const q1 = {
    question: 'Which is not a primitive data type?', 
    false1: 'Number',
    false2: 'Boolean',
    true: 'Object',
    false3: 'All of the above are primitive types.',
}

const q2 = {
    question: 'What is the difference between the == and === operators?',
    false1: `== tests for type and value while === tests for type`,
    false2: 'They are the same.',
    false3: `== assigns a value while === tests for equality`,
    true: `== test for type while === test for type and value`,
}

const q3 = {
    question: 'Which of the following are logical operators?',
    false1: '||',
    false2: '&&',
    false3: '>',
    true: 'Both 1 and 2',
}

const q4 = {
    question: 'What does the NaN property signify?',
    true: 'Shows a value is not a legal number',
    false2: 'Indicates a value is not equal',
    false3: 'States a value is not defined',
    false4: 'Invalid syntax',
}

const q5 = {
    question: 'Is an object iterable in JavaScript?',
    false1: 'Yes',
    true: 'No',
    false3: `I don't know`,
    false4: 'Aboslutely',
}

// This controls the randomization.  The value needs to be updated as questions are added.
const numQuestions = 5

// This function randomizes the question selected based on the arrays above.  This could be done more elegantly if all question objects were placed in one array and saved to variable.  This could be incorporated in future iterations.
randomizeQst = () => {
    let rand = Math.floor(Math.random() * numQuestions + 1);
    if (rand === 1) {
        randomQ = q1
    } else if (rand === 2) {
        randomQ = q2
    } else if (rand === 3) {
        randomQ = q3
    }else if (rand === 4) {
        randomQ = q4
    } else if (rand === 5) {
        randomQ = q5
    }
    return randomQ;
}

// This section establishes variables for use in the functions. A variable for the ordered list (answerOL) to be called in the questionGen function to append child list items.  The h1 used to display questions is also defined (questionTxt).

const questionTxt = document.querySelector('#question-txt')

const correctDisplay = document.querySelector('#correct')

// This function will generate an ordered list using the question arrays.
questionGen = () => {
    randomizeQst();
    questionTxt.innerHTML = randomQ.question;
    console.log(randomQ)
    createBtnListener(); 

      // This will generate an array using the values of the object.  The index of the array can then be used to generate the text in the list items.
      let objValues = Object.values(randomQ);
      let objKeys = Object.keys(randomQ);


// This needs to be debugged.  It generates random questions, but appeneds the answers in a growing list.  The list elements need to be rewritten.  
    for (let i = 0; i < 4; i++) {
           
            // Using +1 is required here because there is no list element named ans0.  If left as i with the value of i defined as 0 above, the console will log an error.
            let newLI = document.getElementById(`ans${i+1}`);
            console.log(newLI)
            
            // +1 is used to skip the question since it has an index of 0 in the array and I do not want it to be used as an item in the list.
            newLI.innerText = objValues[i+1]
        }
    console.log(objValues);
    console.log(objKeys);
}

// The function below establishes an empty answer variable that can be used to hold the value of the event.target.outerText.  This value is then compared against the array's true key.  The correctAnswer function is incorporated into the event listener for the buttons.
let answer = ""

correctAnswer = () => {
    correctDisplay.hidden = false;
    if (answer == randomQ.true) {
        correctDisplay.innerText = 'Correct!'
    } else {
        correctDisplay.innerText = 'Wrong!'
        // A statement was added to decrement the timer with a wrong answer.
        timeLeft -= 10;
    }
// Statements were added to create a next button for use when moving to a new question.
    let newBtn = document.createElement('button')
    correctDisplay.append(newBtn); 
    newBtn.setAttribute('class', 'nextBtn');
    newBtn.innerText = 'Next Question'

    let nextBtn = document.querySelector('.nextBtn') 
    nextBtn.addEventListener('click', function(e){
        console.dir(e.target);
        questionGen();
        correctDisplay.hidden = true
    })
}

// The function below uses a click event listener to determine if the answer is correct or false.
let answerBtns = document.querySelectorAll('.ansBtns');

createBtnListener = () => {
    answerBtns.forEach(function(i) {
        i.addEventListener('click', function(e) {
            // console.dir(e.target);
            let answerClicked = e.target.innerText;
            console.log(answerClicked);
            answer = answerClicked;
            correctAnswer();
        })
    })
}

// This function will trigger a message when the timer reaches zero or all questions have been exhausted.  The function is called in the if statement of the interval timer countdown function.  It removes the ordered list items containing the answer options and rewrites the h1 containing the question (questionTxt).  New form, label, and input elements are created.
const submitBtn = document.createElement('button')
const restartQuiz = document.createElement('button')

gameOver = () => {
    answerOL.remove();
    correctDisplay.remove();
    questionTxt.innerHTML = 'Sorry, the quiz is over.'
    let newForm = document.createElement('form');
    let newInput = document.createElement('input');
    let newLabel = document.createElement('label')
    docMain.appendChild(newForm);
    newForm.appendChild(newLabel);
    newForm.appendChild(newInput);
    newForm.appendChild(submitBtn);
    newLabel.innerText = 'Initials and Final Score'
    newLabel.setAttribute('for', 'initials-score');
    newInput.setAttribute('id', 'initials-score');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('placeholder', 'Initials & Score');
    submitBtn.innerText = 'Submit';
    submitBtn.setAttribute('id', 'submit');
    docMain.appendChild(restartQuiz);
    restartQuiz.innerText = 'Restart Quiz'
    restartQuiz.setAttribute('id', 'restartQuiz')
 }

// Tracking scores.  A submit button was created in the gameOver function.  The input from the form will be captured to store in the scores array.  Local storage is needed to store data in the user's browser.  This is accomplished through the window.  A separate function will be used to retrieve it through the View High Scores link.
const input = document.querySelector('input')
const scoreOL = document.getElementById('quiz-scores')
const highScores = document.getElementById('score-link')

// The following functions and variables are used to add the scores to local storage.
let scores = [];
let getScores = JSON.parse(localStorage.getItem('scores'))

// This function became necessary after evaluating the first run through a quiz without any pre-existing scores in local storage.  The new array created would always add a value of null to the array in these cases.  This function has been added to the submit button listener.
checkScores = () => {
    let storageCheck = localStorage.getItem('scores')
    if (storageCheck === null || storageCheck === 'undefined') {
        return getScores =[];
    } else {
        return getScores;
    }
}

// This function was added to clear the user's input after submitting their initials and score.  It's called within the submit button listener event.
clearForm = () => {
    document.querySelector('form').reset()
}

// This function executes numerous statements when the event is triggered after clicking the submit button.  The value is retrieved from the input field and added to the scores array.  The state of local storage is then checked to see if there is any existing data using the checkScores function defined earlier.  A new array is then generated for storage by concatenating the scores array with the values retrieved from storage, if any.  The new array is then rewrittent storage by stringifying the result.  Finally, the form is cleared to remove the user's previous input values.
submitBtn.addEventListener ('click', function(e){
    let scoreInput = document.getElementById('initials-score').value
    scores.push(scoreInput);

    checkScores();
    let newScoreArray = scores.concat(getScores);
    e.preventDefault();
    console.log(e);
    let scoreString = JSON.stringify(newScoreArray);
    localStorage.setItem('scores', scoreString);
    clearForm();
    console.log(`Thanks for submitting your scores! Your score will be logged as ${scoreInput}`);
    
})

// This function will retrieve the scores from local storage when the view high scores link is clicked.
highScores.addEventListener ('click', function () {
    cleanScoreOL();
    getNewScores();
})

// This was added to address a bug where the score would continue to repeat and add list items indefinitely when the link was clicked.
cleanScoreOL = () => {
    let childCount = scoreOL.childElementCount;
    for (let i = 1; i < childCount; i++) {
        scoreOL.removeChild(i);
    }   
}

let getNewScores = () => {
    let getScores = JSON.parse(localStorage.getItem('scores'))

    for (let i = 0; i < getScores.length; i++) {
        let scoresLI = document.createElement('li');
        scoreOL.appendChild(scoresLI);
        scoresLI.innerText = getScores[i];
    }
}

// The following code allows users to restart the quiz by refreshing the page if they would like to do so.
restartQuiz.addEventListener('click', function(e) {
    reloadQuiz();
    scoreOL.hidden = true;
})

reloadQuiz = () => {
    location.reload();
}

