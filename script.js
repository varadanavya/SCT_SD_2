// =============================================
// ☁️ SKY QUEST
// Number Adventure Game
// =============================================


// ===============================
// DOM ELEMENTS
// ===============================


const welcomeScreen = document.getElementById("welcome-screen");

const gameScreen = document.getElementById("game-screen");

const startBtn = document.getElementById("start-btn");


const difficultyButtons =
document.querySelectorAll(".difficulty");


const guessInput =
document.getElementById("guess-input");


const guessBtn =
document.getElementById("guess-btn");


const message =
document.getElementById("message");


const timerText =
document.getElementById("timer");


const attemptsText =
document.getElementById("attempts");


const scoreText =
document.getElementById("score");


const bestScoreText =
document.getElementById("best-score");


const historyList =
document.getElementById("history-list");


const hintBtn =
document.getElementById("hint-btn");


const restartBtn =
document.getElementById("restart-btn");


const gamePanel =
document.getElementById("game-panel");




// ===============================
// GAME VARIABLES
// ===============================


let maxNumber = 50;

let secretNumber;

let attempts;

let timer;

let score;

let history=[];

let firstGuess=true;

let hintUsed=false;

let timerInterval;



// ===============================
// PLAYER DATA
// ===============================


let bestScore =
Number(localStorage.getItem("bestScore")) || 0;


bestScoreText.textContent = bestScore;



// ===============================
// START BUTTON
// ===============================


startBtn.onclick=()=>{


welcomeScreen.style.display="none";


gameScreen.classList.remove("hidden");


initializeGame();


};





// ===============================
// DIFFICULTY
// ===============================


difficultyButtons.forEach(btn=>{


btn.onclick=()=>{


difficultyButtons.forEach(b=>

b.classList.remove("active")

);


btn.classList.add("active");



maxNumber =
Number(btn.dataset.max);



initializeGame();



};



});





// ===============================
// INITIALIZE GAME
// ===============================


function initializeGame(){



secretNumber =
Math.floor(Math.random()*maxNumber)+1;



attempts=10;


timer=60;


score=100;


history=[];


firstGuess=true;


hintUsed=false;



attemptsText.textContent=attempts;


timerText.textContent=timer;


scoreText.textContent=score;



historyList.textContent=
"No guesses yet";



message.textContent=
`☁️ Guess a number between 1 and ${maxNumber}`;



guessInput.value="";


guessInput.disabled=false;


guessBtn.disabled=false;


hintBtn.disabled=false;



clearInterval(timerInterval);



gamePanel?.classList.add("hidden");



console.log(
"Secret Number:",
secretNumber
);



}






// ===============================
// TIMER
// ===============================


function startTimer(){


clearInterval(timerInterval);



timerInterval=setInterval(()=>{


timer--;


timerText.textContent=timer;



if(timer<=0){


clearInterval(timerInterval);



message.textContent=
`⏰ Time Over! Number was ${secretNumber}`;



guessBtn.disabled=true;

hintBtn.disabled=true;



}



},1000);



}



function stopTimer(){

clearInterval(timerInterval);

}








// ===============================
// GUESS BUTTON
// ===============================


guessBtn.onclick=()=>{



let guess =
Number(guessInput.value);





if(guessInput.value===""){


message.textContent=
"⚠ Enter a number first";


return;


}




if(guess<1 || guess>maxNumber){


message.textContent=
`⚠ Enter between 1 and ${maxNumber}`;


return;


}





if(firstGuess){


firstGuess=false;


gamePanel?.classList.remove("hidden");


startTimer();


}





history.push(guess);


historyList.textContent=
history.join(" ➜ ");





// WIN


if(guess===secretNumber){



stopTimer();



score+=attempts*10;



scoreText.textContent=score;



message.textContent=
`🎉 Amazing! ${secretNumber} is Correct!`;



guessBtn.disabled=true;

hintBtn.disabled=true;

guessInput.disabled=true;



updateBestScore();



createConfetti();



return;



}






// WRONG GUESS


attempts--;


attemptsText.textContent=
attempts;



score-=10;



if(score<0)

score=0;



scoreText.textContent=score;




if(guess<secretNumber){


message.textContent=
"📈 Too Low! Fly Higher ☁️";


}

else{


message.textContent=
"📉 Too High! Come Down ☁️";


}






if(attempts===0){


stopTimer();



message.textContent=
`💀 Adventure Failed! Number was ${secretNumber}`;


guessBtn.disabled=true;


hintBtn.disabled=true;


guessInput.disabled=true;



}




guessInput.value="";


};







// ===============================
// HINT
// ===============================


hintBtn.onclick=()=>{


if(hintUsed){


message.textContent=
"💡 Hint already used";


return;


}



hintUsed=true;



if(secretNumber%2===0){


message.textContent=
"💡 Secret number is EVEN";


}

else{


message.textContent=
"💡 Secret number is ODD";


}



};







// ===============================
// RESTART
// ===============================


restartBtn.onclick=()=>{


initializeGame();


};







// ===============================
// ENTER KEY
// ===============================


guessInput.addEventListener(
"keypress",
e=>{


if(e.key==="Enter"){


guessBtn.click();


}


});








// ===============================
// BEST SCORE
// ===============================


function updateBestScore(){


if(score>bestScore){


bestScore=score;


localStorage.setItem(
"bestScore",
bestScore
);



bestScoreText.textContent=
bestScore;



message.textContent+=
" 🏆 New Record!";


}


}








// ===============================
// CONFETTI EFFECT
// ===============================


function createConfetti(){



for(let i=0;i<60;i++){


let c=document.createElement("div");


c.className="confetti";


c.style.left=
Math.random()*100+"vw";


c.style.top="-20px";



c.style.animationDuration=
(2+Math.random()*3)+"s";



document.body.appendChild(c);



setTimeout(()=>{


c.remove();


},4000);



}



}






// ===============================
// BUTTON SOUND
// ===============================


const clickSound =
new Audio("assets/sounds/click.mp3");


document.querySelectorAll("button")
.forEach(btn=>{


btn.addEventListener(
"click",
()=>{


clickSound.currentTime=0;


clickSound.play()
.catch(()=>{});


});


});





// ===============================
// LOAD GAME
// ===============================


initializeGame();


console.log(
"☁️ Sky Quest Loaded Successfully"
);