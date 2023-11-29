//giving variables to html elements 
const theQuestion = document.getElementById("question");
const choices = document.getElementById("answerChoices");
const nextButton = document.getElementById("nextQuestion");
const box = document.getElementById("box");

//10 Questions put into the questions object
const questions = {
    1: {
        q: "What is the largest country in the world?",
        correct: "Russia",
        other1: "United States",
        other2: "China",
        other3: "Canada"
    },
    2: {
        q: "What is the most popular sport in the world?",
        correct: "Soccer",
        other1: "Hockey",
        other2: "Cricket",
        other3: "Tennis"
    },
    3: {
        q: "What is the most popular fruit in the world?",
        correct: "Banana",
        other1: "Strawberry",
        other2: "Mango",
        other3: "Tomato"
    },
    4: {
        q: "How many rings does Saturn have?",
        correct: "7",
        other1: "3",
        other2: "80",
        other3: "27"
    },
    5: {
        q: "How many officially recognized dog breeds are there?",
        correct: "360",
        other1: "450",
        other2: "289",
        other3: "342"
    },
    6: {
        q: "About what percentage of the world population are women?",
        correct: "49.6%",
        other1: "52.3%",
        other2: "45%",
        other3: "57.2%"
    },
    7: {
        q: "Where was boba invented?",
        correct: "Taiwan",
        other1: "Korea",
        other2: "Japan",
        other3: "Hong Kong"
    },
    8: {
        q: "How many letters are in the English Alphabet?",
        correct: "26",
        other1: "29",
        other2: "24",
        other3: "27"
    },
    9: {
        q: "What is the oldest age in years someone has lived to?",
        correct: "122",
        other1: "100",
        other2: "132",
        other3: "119"
    },
    10: {
        q: "What is the most popular pet in the world?",
        correct: "Dog",
        other1: "Cat",
        other2: "Bird",
        other3: "Fish" 
    }
}

//variable to keep track of their score 
var score = 0;

//variable to keep track of what question the user is on
var questionNum = 1;

//selects all answer choices to use in my functions
var allChoices = choices.querySelectorAll(".buttons");
console.log(allChoices);
//to hide the next button until they choose an answer
nextButton.classList.add("hide");

//function for checking if the answer chosen is correct
function checkAnswer(event){
    //checks to see if the user has already selected an answer so that they cannot answer twice
    var alreadyAnswered = 0;
    for(let i = 0; i < allChoices.length; i++){
        if(allChoices[i].classList.contains("correctAnswer") || allChoices[i].classList.contains("wrongAnswer")){
            alreadyAnswered++;
        }
    }
    if(alreadyAnswered > 0){
        return;
    }

    //gets the text of the button that the user clicked on
    var userAnswer = event.target.innerText;

    //adds the class correctAnswer to the button chosen if it is correct
    if (userAnswer === questions[questionNum].correct){
        event.target.classList.add("correctAnswer");
        console.log(event.target.classList);
        score++;
    }
    //adds the class wrongAnswer to the button chosen if it is wrong
    else{
        event.target.classList.add("wrongAnswer");
    }
    nextButton.classList.remove("hide");      
}

//function for going to the next question
function nextQuestion(){
    //removing the background colors from the answerss and hiding the next button
    for(let i = 0; i < allChoices.length; i++){
        allChoices[i].classList.remove("correctAnswer");
        allChoices[i].classList.remove("wrongAnswer");
    }
    nextButton.classList.add("hide");

    //checks if they are on the last question to calculate their score
    if(questionNum === 10){
        theQuestion.style.display = "none";
        choices.style.display = "none";

        var scoreTitle = document.createElement("h1");
        scoreTitle.innerText = "Your Score:";
        scoreTitle.classList.add("title");
        box.appendChild(scoreTitle);
        var percentage = document.createElement("h2");
        percentage.innerText = score*10 + "%";
        percentage.classList.add("result");
        box.appendChild(percentage);
        var result = document.createElement("h2");
        result.innerText = "You got " + score + " out of 10 questions correct.";
        result.classList.add("result");
        box.appendChild(result);
        return;
    }
    
    //changing the question
    questionNum++;
    theQuestion.innerText = questions[questionNum].q;

    //for assigning a random position for the correct answer
    var answerOptions = "0123";
    var randomNum = Math.floor(Math.random() * 4);
    allChoices[randomNum].innerText = questions[questionNum].correct;

    //going through the answerOptions string to remove the index of where the correct value is
    for(var i = 0; i < answerOptions.length; i++){
        if (parseInt(answerOptions[i]) === randomNum){
            answerOptions = answerOptions.replace(answerOptions[i], "");
        }
    }

    //assigning the other answer choices to the other buttons
    allChoices[parseInt(answerOptions.charAt(0))].innerText = questions[questionNum].other1;
    allChoices[parseInt(answerOptions.charAt(1))].innerText = questions[questionNum].other2;
    allChoices[parseInt(answerOptions.charAt(2))].innerText = questions[questionNum].other3;
}


//event listener for clicking on one of the answer buttons
nextButton.addEventListener("click", nextQuestion);

//checking if user chose an answer
for(let i = 0; i < allChoices.length; i++){
    allChoices[i].addEventListener("click", checkAnswer);
}
