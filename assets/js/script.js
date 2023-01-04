const playGameButton = document.querySelector("#play");
let timeLeft = 1000;

const gameCards = [
    {
        question: "What did the boy have to offer Jesus when he needed to feed the crowd?",
        optionOne: "",
        optionTwo: "",
        optionThree: "",
        optionFour: ""
    },
    {
        question: "How many men carried the lame man to Jesus?",
        optionOne: "",
        optionTwo: "",
        optionThree: "",
        optionFour: ""
    },
    {
        question: "What pierced Jesus's side on the cross.",
        optionOne: "",
        optionTwo: "",
        optionThree: "",
        optionFour: ""
    },
    {
        question: "What did the boy have to offer Jesus when he needed to feed the crowd?",
        optionOne: "",
        optionTwo: "",
        optionThree: "",
        optionFour: ""
    },
    {
        question: "What did the boy have to offer Jesus when he needed to feed the crowd?",
        optionOne: "",
        optionTwo: "",
        optionThree: "",
        optionFour: ""
    },
    {
        question: "What did the boy have to offer Jesus when he needed to feed the crowd?",
        optionOne: "",
        optionTwo: "",
        optionThree: "",
        optionFour: ""
    },
    {
        question: "What did the boy have to offer Jesus when he needed to feed the crowd?",
        optionOne: "",
        optionTwo: "",
        optionThree: "",
        optionFour: ""
    },
    {
        question: "What did the boy have to offer Jesus when he needed to feed the crowd?",
        optionOne: "",
        optionTwo: "",
        optionThree: "",
        optionFour: ""
    },
    {
        question: "What did the boy have to offer Jesus when he needed to feed the crowd?",
        optionOne: "",
        optionTwo: "",
        optionThree: "",
        optionFour: ""
    },
    {
        question: "What did the boy have to offer Jesus when he needed to feed the crowd?",
        optionOne: "",
        optionTwo: "",
        optionThree: "",
        optionFour: ""
    }
];

const timer = () => {

}
const displayQuestion = () => {

}
const recieveAnswer = () => {

}
const judgeAnswer = () => {

}
const listenForNextButton = () => {

}

const playGame = function(){
    console.log("You've played the game!");
    startTimer();
    displayQuestion();
    recieveAnswer();
    judgeAnswer();
    listenForNextButton();
}

playGameButton.addEventListener("click", playGame);