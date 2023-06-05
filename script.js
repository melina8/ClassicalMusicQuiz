
const initBox = document.querySelector(".init-box");
const quizBox = document.querySelector(".quiz-box");
const finalBox = document.querySelector(".final-box");
const questionNumber = document.querySelector(".question-number");
const question = document.querySelector(".question");
const options = document.querySelector(".options");
const answerNumbering = document.querySelector(".answer-number")


let counter = 0;
let correctAnswers = 0;


//get the first question and options
function getQuery(){
    
    questionNumber.innerHTML = `Question ${counter +1} of ${queries.length}`;
    question.innerHTML = queries[counter].question;
    options.innerHTML = '';

    let animationDelay = 0.1;

    if(queries[counter].hasOwnProperty("img")){
        console.log(queries[counter].img)
        const image = document.createElement("img")
        image.src = queries[counter].img;
        question.appendChild(image);
    }

    //create options in HTML
    for (let i=0; i<queries[counter].options.length; i++){
        const option = document.createElement("div");
        option.innerHTML = queries[counter].options[i];
        option.id = i;
        option.className = "option";
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.1;
        options.appendChild(option);
        option.setAttribute("onclick", "checkAnswer(this, counter)");
    }
    counter++;
}

//check whether the option selected by the user is correct or not 
function checkAnswer(element, counter){
   
    if (element.innerHTML == queries[counter-1].answer){
        element.classList.add("correct");
        console.log("correct");

        indicateAnswerNumber("correct");
        correctAnswers++;

    }else{
       element.classList.add("wrong");
       console.log("wrong");
       console.log(element.innerHTML);
       console.log(queries[counter-1].answer)

       indicateAnswerNumber("wrong");

       //highlight the correct answer with green color
       for (let i= 0; i< options.children.length; i++){
            if (options.children[i].innerHTML === queries[counter-1].answer){
                options.children[i].classList.add("correct");
        }
       }
    }

    restrictOtherOptions();

}
//restrict user from selecting another option
function restrictOtherOptions(){
    for(let i=0; i<options.children.length; i++){
        options.children[i].classList.add("restricted");
    }
}

function showAnswerNumber(){
    answerNumbering.innerHTML = '';

    for (let i=0; i<queries.length; i++){
        const answerNumber = document.createElement("div");
        answerNumber.innerHTML = i+1;
        answerNumbering.appendChild(answerNumber);
    }
}

function indicateAnswerNumber(markType){
    console.log('markType: ' + markType);
    answerNumbering.children[counter-1].classList.add(markType);

}

//get next question and options
function nextQuestion(){
    if (counter === queries.length){
        getFinalResults();
        console.log("end of questions");
    }else{
        getQuery();
    }
}

function getFinalResults(){
    
    quizBox.classList.add("hide");
    finalBox.classList.remove("hide");

    finalBox.querySelector(".total-questions").innerHTML = queries.length;
    finalBox.querySelector(".score").innerHTML = correctAnswers + "/" + queries.length;
    const percent = (correctAnswers/queries.length)*100;
    finalBox.querySelector(".percentage").innerHTML = percent.toFixed(2) + "%";

}

function startQuiz(){
    counter = 0;
    correctAnswers = 0;
    getQuery();
    showAnswerNumber();
    initBox.classList.add("hide");
    quizBox.classList.remove("hide");
}

function tryAgain(){
    finalBox.classList.add("hide");
    quizBox.classList.remove("hide");
    counter = 0;
    correctAnswers = 0;
    getQuery();
    showAnswerNumber();
}

function quit(){
    counter = 0;
    correctAnswers = 0;
    finalBox.classList.add("hide");
    initBox.classList.remove("hide");
}

window.onload = function(){
      
    initBox.querySelector(".number-of-questions").innerHTML = queries.length;

}

