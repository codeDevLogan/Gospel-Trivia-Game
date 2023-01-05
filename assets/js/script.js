const playGameButton = document.getElementById("play");
let $timeLeft = document.getElementById("counter")
const $root = document.getElementById("root");
const $question = document.getElementById("question");
const $optionOne = document.getElementById("option-1");
const $optionTwo = document.getElementById("option-2");
const $optionThree = document.getElementById("option-3");
const $optionFour = document.getElementById("option-4");
const $questionNum = document.getElementById("questionNum");
const $score = document.getElementById('score');
const $options = document.getElementById('options');
let questionNum = 0;
let timer = 100;
let currentScore = 0;
let numAnswered = 0;
let endState = 0;
let indexOfScore = -1;
let playerName = '';
let randomQuestion = 0;
if(!(localStorage.getItem("highScores"))){
    localStorage.setItem("highScores", JSON.stringify([0]));
}
if(!(localStorage.getItem("highScoresNames"))){
    localStorage.setItem("highScoresNames", JSON.stringify(['']));
}
let highScores = JSON.parse(localStorage.getItem("highScores"));
let highScoresNames = JSON.parse(localStorage.getItem("highScoresNames"));

const gameCards = [
    {
        question: "What did the boy have to offer Jesus when he needed to feed the crowd?",
        optionOne: "5 Loaves & 2 Fish",
        optionTwo: "3 Loaves & 6 Pieces of Cheese",
        optionThree: "4 Cups of Wine & 3 Lambchops",
        optionFour: "2 Cups of Wine & 16 Apples",
        verseReference: 'John 6:9 "There is a lad here, which hath five barley loaves, and two small fishes: but what are they among so many?"',
        correctOption: $optionOne,
        hasBeenAnswered: false
    },
    {
        question: "How many men carried the lame man to Jesus?",
        optionOne: "4",
        optionTwo: "6",
        optionThree: "12",
        optionFour: "2",
        verseReference: 'Mark 2:3-4 "And they come unto him, bringing one sick of the palsy, which was borne of four. And when they could not come nigh unto him for the press, they uncovered the roof where he was: and when they had broken it up, they let down the bed wherein the sick of the palsy lay."',
        correctOption: $optionOne,
        hasBeenAnswered: false
    },
    {
        question: "What pierced Jesus's side on the cross.",
        optionOne: "A Spear",
        optionTwo: "A Sword",
        optionThree: "A Dagger",
        optionFour: "An Arrow",
        verseReference: 'John 19:34 "But one of the soldiers with a spear pierced his side, and forthwith came there out blood and water."',
        correctOption: $optionOne,
        hasBeenAnswered: false
    },
    {
        question: "What was offered to Jesus on the cross.",
        optionOne: "Vinegar",
        optionTwo: "Water",
        optionThree: "Wine",
        optionFour: "Juice",
        verseReference: 'John 19:29 "Now there was set a vessel full of vinegar: and they filled a spunge with vinegar, and put it upon hyssop, and put it to his mouth."',
        correctOption: $optionOne,
        hasBeenAnswered: false
    },
    {
        question: "Who was the desciple beloved of Christ?",
        optionOne: "John",
        optionTwo: "Paul",
        optionThree: "Matthew",
        optionFour: "The sons of Thunder",
        verseReference: 'John 20:2 "Then she runneth, and cometh to Simon Peter, and to the other disciple, whom Jesus loved, and saith unto them, They have taken away the Lord out of the sepulchre, and we know not where they have laid him."',
        correctOption: $optionOne,
        hasBeenAnswered: false
    },
    {
        question: "In which verse of John Chapter 3 does Jesus lay out the most basic salvation message?",
        optionOne: "16",
        optionTwo: "30",
        optionThree: "19",
        optionFour: "7",
        verseReference: 'John 3:16 "For God so loved the world that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
        correctOption: $optionOne,
        hasBeenAnswered: false
    },
    {
        question: "How long did the man who waited by the Bethesda Pool have the infirmity?",
        optionOne: "38 Years",
        optionTwo: "12 Years",
        optionThree: "52 Years",
        optionFour: "25 Years",
        verseReference: 'John 5:5 "And a certain man was there, which had an infirmity thirty and eight years."',
        correctOption: $optionOne,
        hasBeenAnswered: false
    },
    {
        question: "Who requested John the Baptist's Head?",
        optionOne: "Herodias's Daughter",
        optionTwo: "Herodias's Son",
        optionThree: "Herod's Brother",
        optionFour: "Herod's Daughter",
        verseReference: `Matthew 14:6-8 "But when Herod's birthday was kept, the daughter of Herodias danced before them, and pleased Herod. Whereupon he promised with an oath to give her whatsoever she would ask. And she, being before instructed of her mother, said, Give me here John Baptist's head in a charger.`,
        correctOption: $optionOne,
        hasBeenAnswered: false
    },
];


const delPlayButton = () => {
    playGameButton.remove();
}
const startTimer = () => {
    timer = 100;
    $timeLeft.textContent = "Time Left: "+ timer;
    let timeInterval = setInterval(function(){
        if(timer !== 0){
            timer--;
        }
        $timeLeft.textContent = "Time Left: "+ timer;
    }, 1000);
}
const displayQuestion = () => {
    randomQuestion = getRandom(1, gameCards.length)-1;
    $questionNum.textContent = "Question #" +questionNum;
    $score.textContent = "Score: " +currentScore;
    
    
    for(let i = 0; i<gameCards.length; i++){
        if(gameCards[i].hasBeenAnswered){
            numAnswered++;
        }
    }
    if(numAnswered === 8){
        endState = 1;
    }
    if(timer <= 0){
        endState = 2;
    }
    if(endState != 0){
        console.log("It's here.")
        gameEnd();
    }
    if(gameCards[randomQuestion].hasBeenAnswered){
        try{
            displayQuestion();
        } catch (error) {
            gameEnd();
        }
    }

    $question.textContent = gameCards[randomQuestion].question;
    
    $options.style.display = 'flex';

    $optionOne.textContent = "A: " +  gameCards[randomQuestion].optionOne;
    $optionTwo.textContent = "B: " +  gameCards[randomQuestion].optionTwo;
    $optionThree.textContent = "C: " +  gameCards[randomQuestion].optionThree;
    $optionFour.textContent = "D: " +  gameCards[randomQuestion].optionFour;
    recieveAnswer();
}

/* getRandom
Use: The getRandom function is used to get random numbers between given parameters.
Call with: variable = getRandom(lowerLim, upperLim);
variable being the location you want the randomly generated number stored.
lowerLim being the lower limit number so the function will not return a number less than this.
upperLim being the upper limit number so the function will not return a number greater than this.
*/
function getRandom(lowerLim, upperLim){
    let randomNum = Math.random().toString().split('');
    while (randomNum[2] < lowerLim || randomNum[2] > upperLim){
      randomNum = Math.random().toString().split('');
    }
    return randomNum[2];
  }

const recieveAnswer = () => {
    $optionOne.addEventListener("click", judgeAnswer);
    $optionTwo.addEventListener("click", judgeAnswer);
    $optionThree.addEventListener("click", judgeAnswer);
    $optionFour.addEventListener("click", judgeAnswer);
}
const judgeAnswer = (event) => {
    event.preventDefault();
    
    console.log(event.target);
    if(event.target === gameCards[randomQuestion].correctOption){
        currentScore = currentScore + 25;
        gameCards[randomQuestion].hasBeenAnswered = true;
        displayQuestion();
    }else{
        timer = timer-10
        alert("Incorrect Answer! You lost 10 Seconds!");
        displayQuestion();
    }
    // if (wrong answer) then subtract 10 seconds from timer and re-run displayQuestion();

}
const gameEnd = () => {
    console.log("Game Over!");
    currentScore = currentScore + timer;
    localStorage.setItem("playedGame", true);
    if(currentScore >= 50){
        for(let i = 0; i < highScores.length; i++){
            if(currentScore > highScores[i]){
                if(i === 0){
                    playerName = prompt("New Highscore! Enter You Name, Champion:"); 
                }else{
                    playerName = prompt("You made it to the leaderboard! Enter Your Name:");
                }
                indexOfScore = i;
                break;
            }
        }
        if(indexOfScore >= 0){
            highScores.splice(indexOfScore, 0, currentScore);
            highScoresNames.splice(indexOfScore, 0, playerName);
            localStorage.setItem("highScores", JSON.stringify(highScores));
            localStorage.setItem("highScoresNames", JSON.stringify(highScoresNames));
        }
    }
    resetGame();
}

const resetGame = () => {
    questionNum = 0;
    timer = 100;
    currentScore = 0;
    numAnswered = 0;
    endState = 0;
    indexOfScore = -1;
    playerName = '';
    randomQuestion = 0;
    $options.style.display = 'none';
    for(let i = 0; i < gameCards.length; i++){
        gameCards[i].hasBeenAnswered = false;
    }

}

const displayScores = () =>{
    
}

const playGame = (event) => {
    questionNum = 1;
    currentScore = 0;
    event.preventDefault();
    console.log("You've played the game!");
    startTimer();
    delPlayButton();
    displayQuestion();
}

playGameButton.addEventListener("click", playGame);
if(localStorage.getItem("playedGame")){
    const highScoreButton = $root.appendChild(document.createElement('button'));
    highScoreButton.textContent = "High Scores";
    highScoreButton.setAttribute('id', 'highScoreBtn');
    highScoreButton.addEventListener("click", displayScores);
}