//---CATEGORy ANNOUNCER
let categoryTime;
var category = document.getElementById("category");
var announce = document.getElementById("announce");
var highScore = 0;

function hiscore(){
    if (score > highScore){
        highScore= score;
    }
}

function appearCategory(game){
    category.style.display = "inline-block";
    announce.innerText = game;
   categoryTime = setTimeout(disappearCategory, 1000); 
}

function disappearCategory(){

    category.style.display = "none";
}


//--- AUDIO

const audioElement = document.getElementById("myAudio"); // Reference the audio element

function playAudio() {
  audioElement.currentTime = 0; // Restart from the beginning
  audioElement.play();
}

function pauseAudio() {
  audioElement.currentTime = 0; // Restart from the beginning
  audioElement.play();
}

const playButton = document.getElementById('playBtn');

playButton.addEventListener(
  'click', () => {
    playAudio();
    
  }
);

//audio effects
const buttonPress = new Audio("../audios/buttonPress.wav");
const death = new Audio("../audios/death.wav");
const damage = new Audio("../audios/damage.wav");
const keyIT = new Audio("../audios/KeyIT.wav");
const typeIT = new Audio("../audios/TypeIT.wav");
const clickIT = new Audio("../audios/ClickIT.wav");
const point = new Audio("../audios/point.mp3");

//--- END OF AUDIO


//--- FOR STARTING GAME
var startTime, currentTime, endTime, running = true;
var lives = 3;
function startMercy(){
    buttonPress.play();
    updateLife();
    startTimer();
    document.getElementById("btnContainer").style.display = "none";
    randomCategory();    
}

function playCategoryAnimation() {

  var categoryText = document.getElementById("category").getElementsByTagName("h1")[0];


  categoryText.style.opacity = 1;  

  categoryText.classList.add("text-animation"); 
}


function updateLife(){
    var disp = "Lives: ";
    for(var i = 0; i < lives; i++){
        disp += '<img src="heart.png" alt="life" class="heart"></img>'
    }
    document.getElementById('life').innerHTML = disp;
}

var initialTime = 10;
var initialScore = 10;
var msTimeConverted = initialTime*1000;
var timeleft = initialTime;
var downloadTimer;
document.getElementById('countdown').innerHTML = initialTime;
function countdownTimer(){
    downloadTimer = setInterval(function() {
        if (timeleft < 1) {
            document.getElementById("countdown").innerHTML = timeleft;
            clearInterval(downloadTimer); 
        } else {
            document.getElementById("countdown").innerHTML = timeleft;
        }
        timeleft -= 1;
        initialScore -= 1;
    }, 1000);
}

function resetCountdown(){
    clearInterval(downloadTimer)
    timeleft = initialTime;
    initialScore = 10;
}

var score = 0;
function addScore(){
    if(initialScore <= 10 && initialScore >= 9){
        score += 20;
    }
    else if(initialScore < 9 && initialScore >= 7){
        score+=10;
    }
    else if(initialScore < 7 && initialScore <= 3){
        score+=5;
    }
    else{
        score += 3;
    }
    document.getElementById("scoreDisp").innerHTML = "Score: "+score.toString().padStart(4,"0");

}

function randomCategory(){
    console.log("Life is "+lives)
    countdownTimer();
    if(lives > 0){
        let game = random(3,1)
        switch(game){
        case 1: mouseGame(); break;
        case 2: typingGame(); break; //should be typing
        case 3: arrowGame(); break; //should be arrow
        }
    }
    else {
        console.log("dapat tapos nako dito")
        endGame();
        document.getElementById("btnContainer").style.display = "flex";
        document.getElementById("playBtn").style.display = "none";

        document.getElementById("typingContainer").style.display = "none";
    }

}

var timer;
function startTimer(){
    startTime = new Date()
    timer = setInterval(() => {
        currentTime = getTimerTime(startTime)
        console.log(currentTime);
    }, 1000)
}

function getTimerTime(startTime){
    return Math.floor((new Date() - startTime) / 1000 )
}

function random(max, min){
    return Math.floor((Math.random() * max)+min);
}

//Ending the game
function endGame(){
    pauseAudio();
    death.play();
    running = false;
    endTime = currentTime;
    clearInterval(timer);
    clearInterval(downloadTimer)
	document.getElementById("gameoverBody").style.display="block";
    hiscore();
    document.getElementById("highscore").innerHTML = "Highscore: "+highScore.toString().padStart(4,"0");
    document.getElementById("score").innerHTML = "Score: "+score.toString().padStart(4,"0");
}

function no(){
    window.location.href = "../index.html";
}

//--- END OF STARTING GAME


//--- FUNCTIONS FOR GAME PROGRESSION

//changes the given time to finish a category by 1s every 10s but only until 1s
    var gameProgression = setInterval(() => {
        if(initialTime === 1){
            clearInterval(gameProgression)
        }
        else initialTime -= 1;

}, 10000)

//--- END OF GAME PROGRESSION


//---FUNCTIONS FOR BUTTONS
function restartGame(){

    buttonPress.play();
    startTime = null, currentTime = null, endTime = null, running = true;
    lives = 3;
    initialTime = 10;
    score = 0;
    document.getElementById("gameoverBody").style.display="none";
    resetCountdown();
    updateLife();
    document.getElementById("scoreDisp").innerHTML = "Score: 0000";
    document.getElementById("playBtn").style.display = "flex";
}

//---END OF FUNCTIONS FOR BUTTONS

//---FOR MOUSE CATEGORY
var gameBodyWidth = document.getElementById("gameBody").offsetWidth;
var gameBodyHeight = document.getElementById("gameBody").offsetHeight
var object = document.getElementById("object");
var score = 0;

//Randomizes Y position of Object within the Div
function YPos(){
    return Math.floor(Math.random()* (gameBodyWidth-object.offsetWidth))
}

//Randomizes X position of Object within the Div
function XPos(){
    return Math.floor(Math.random()* (gameBodyHeight-object.offsetWidth))
}

//Randomizes object size between 3% to 6%;
function objectSize(){
    return Math.floor((Math.random() * 5)+2);
}

function mouseGame(){
    clickIT.play();
    appearCategory("CLICK IT!")
    document.getElementById("object").innerHTML = "<div id='starImg' onclick='objectClick()'> </div>";
    objectRandomizer();
}

let objectTimer;
//Makes the object appear on random places with random size.
function objectRandomizer(){
    object.style.display = "block";
    objectTimer = setTimeout(objectDisappear, msTimeConverted+1000); //Responsible for the how long the object appears.
    let width = objectSize()
    object.style.width = width+"%";
    object.style.height =  (width*2)+"%"; 
    object.style.top = XPos()+"px";
    object.style.left = YPos()+"px";
}

function objectDisappear(){
    if(!objectTimer) return;
    resetCountdown();
    lives--;
    updateLife();
    damage.play();
    object.style.display = "none";
    randomCategory();
}

//Function for when the object is clicked
function objectClick(){
    clearTimeout(objectTimer);
    addScore();
    point.play();
    resetCountdown();
    objectTimer = null;
    object.style.display = "none";
    randomCategory();
}
//--- END OF MOUSE CATEGORY CODE

//--- TYPING CATEGORY
function typingGame() {
    typeIT.play();
    appearCategory("TYPE IT!")
    document.getElementById("typingContainer").style.display = "flex";
    let words = [
        "pear", "fig", "lime", "kiwi", "plum", 
        "lion", "mango", "apple", "grape", "cold", 
        "wolf", "peach", "cat", "bird", "frog", 
        "dog", "fish", "panda", "tiger", "zebra", 
        "bear", "snake", "horse", "mouse", "ocean",
        "tree", "cloud", "trail", "earth", "moon",
        "star", "sun", "rain", "snow", "wind",
        "fire", "rock", "gold", "coin", "ring",
        "cake", "book", "pen", "door", "key",
        "ship", "fish", "bird", "frog", "moon"
    ]; //50 WORDS (3-5 LETTERS) CAN ADD MORE IF NEEDED

    let currentWordIndex = Math.floor(Math.random() * words.length);
    let currentWord = words[currentWordIndex];
    let wordDisplay = document.getElementById("wordDisp");
    wordDisplay.textContent = currentWord;
    
    createInput();

    let typedWord = '';
    let wordArray = currentWord.split('');
    let typingTimer = setTimeout(() => {
        damage.play();
        lives--;
        updateLife();
        removeInput();
        clearTyping();
        resetCountdown();
        randomCategory();
    }, msTimeConverted+1000);
    
    document.getElementById("userInput").addEventListener("input", function(event) {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            damage.play();
            lives--;
            updateLife();
            clearTyping();
            resetCountdown();
            clearTimeout(typingTimer);
            randomCategory();
        }, msTimeConverted+1000);

        let input = event.target.value.trim().toLowerCase(); // Convert input to lowercase
		let typedChar = input.charAt(input.length - 1).toLowerCase(); // Convert typed character to lowercase
		let currentWordLower = currentWord.toLowerCase(); // Convert displayed word to lowercase
        
        if (currentWord.startsWith(typedWord + typedChar)) {
            typedWord += typedChar;

            let displayHTML = '';
            for (let i = 0; i < wordArray.length; i++) {
                if (i < typedWord.length) {
                    if (typedWord.charAt(i) === wordArray[i]) {
                        displayHTML += `<span style="color: green">${typedWord.charAt(i)}</span>`;
                    } else {
                        displayHTML += `<span style="color: red">${typedWord.charAt(i)}</span>`;
                    }
                } else {
                    displayHTML += wordArray[i];
                }
            }
            wordDisplay.innerHTML = displayHTML;

            if (typedWord === currentWord) {
                wordDisplay.textContent = currentWord;
                addScore();
                point.play();
                clearTyping();
                clearTimeout(typingTimer);
                resetCountdown();
                randomCategory();
            }
        } else {
            damage.play();
            lives--;
            updateLife();
            clearTyping();
            resetCountdown();
            clearTimeout(typingTimer);
            randomCategory();
        }
    });
}

function createInput() {
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "userInput");
    input.setAttribute("autofocus", "autofocus");
    document.getElementById("typingContainer").appendChild(input);
    input.focus();
}

function clearTyping(){
    let wordDisplay = document.getElementById("wordDisp");
    removeInput();
    wordDisplay.innerHTML = "";
}

function removeInput() {
    var input = document.getElementById("userInput");
    if (input) {
        input.parentNode.removeChild(input);
    }
}
//--- END OF TYPING CATEGORY

//--- ARROW CATEGORY
const arrowKeys = [
    { key: 'ArrowLeft', image: '<img src="../resources/leftArrow.png" alt="leftArrow" class="arrowImage">', clicked: '<img src="../resources/clicked_left.png" alt="leftArrow" class="arrowImage">'},
    { key: 'ArrowDown', image: '<img src="../resources/downArrow.png" alt="downArrow" class="arrowImage">', clicked: '<img src="../resources/clicked_down.png" alt="leftArrow" class="arrowImage">'},
    { key: 'ArrowUp', image: '<img src="../resources/upArrow.png" alt="upArrow" class="arrowImage">', clicked: '<img src="../resources/clicked_up.png" alt="leftArrow" class="arrowImage">' },
    { key: 'ArrowRight', image: '<img src="../resources/rightArrow.png" alt="rightArrow" class="arrowImage">', clicked: '<img src="../resources/clicked_right.png" alt="leftArrow" class="arrowImage">' }
];
var sequence = 4;

var arrowTimeout;
function arrowGame() {
    keyIT.play();
    appearCategory("KEY IT!")
    arrowRandomizer();
    arrowTimeout = setTimeout(function() {
        document.removeEventListener('keydown', handleKeyPress);
        console.log("Timeout: Sequence not completed within 10 seconds");
        sequence = 4;
        damage.play();
        lives--;
        updateLife();
        removeArrow();
        resetCountdown();
        randomCategory();
    }, msTimeConverted+1000); // 10 seconds in milliseconds
}

function arrowRandomizer(){
    document.removeEventListener('keydown', handleKeyPress);
    var arrowElement = document.getElementById("arrow");
    var arrowDisplayed = Math.floor(Math.random() * 4);
    arrowElement.innerHTML = arrowKeys[arrowDisplayed].image;
    document.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress(event) {
    var pressedKey = event.key;
    let arrowDisplayed = null;
    for (let i = 0; i < arrowKeys.length; i++) {
        if (arrowKeys[i].image === document.getElementById('arrow').innerHTML) {
            arrowDisplayed = arrowKeys[i];
            break;
        }
    }
    if (arrowDisplayed && pressedKey === arrowDisplayed.key) {
        // Update the arrow to the clicked image
        document.getElementById('arrow').innerHTML = arrowDisplayed.clicked;
        
        // Set a small timeout to allow the clicked image to be shown before moving to the next arrow
        setTimeout(() => {
            sequence--;
            removeArrow();
            if (sequence === 0) {
                document.removeEventListener('keydown', handleKeyPress);
                addScore();
                point.play();
                clearTimeout(arrowTimeout); // Clear the timeout if the sequence is completed within time
                console.log("Sequence completed within time");
                sequence = 4;
                removeArrow();
                resetCountdown();
                randomCategory();
            } else {
                arrowRandomizer();
            }
        }, 50); // Adjust the delay as needed to allow the clicked image to be seen
    } else {
        damage.play();
        document.removeEventListener('keydown', handleKeyPress);
        clearTimeout(arrowTimeout);
        lives--;
        updateLife();
        removeArrow();
        resetCountdown();
        randomCategory();
    }
}

function removeArrow() {
    const arrowElement = document.getElementById('arrow');
    arrowElement.innerHTML = ''; // Remove the displayed arrow
}

//--- END OF ARROW CATEGORY