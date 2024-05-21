function start(){
    buttonPress.play();
    document.getElementById("startButton").style.display = "none";
    document.getElementById("gameButton").style.display = "block";
}

function mercy(){
    buttonPress.play();
    window.location.href = "mercy/mercy.html";
}

function endless(){
    buttonPress.play();
    window.location.href = "endless/endless.html";
}

//AUDIOS
const audioElement = document.getElementById("myAudio"); // Use audioElement

function playAudio() {
  audioElement.play();
}

function pauseAudio() {
  audioElement.pause();
}

const playButton = document.getElementById('start');

playButton.addEventListener(
'click', () => {
  if (audioElement.paused) {
    playAudio();
  } else {
    pauseAudio();
  }
});

//audio effects
const buttonPress = new Audio("audios/buttonPress.wav");
const death = new Audio("audios/death.wav");
const damage = new Audio("audios/damage.wav");
const keyIT = new Audio("audios/KeyIT.wav");
const typeIT = new Audio("audios/TypeIT.wav");
const clickIT = new Audio("audios/ClickIT.wav");
const point = new Audio("audios/point.mp3");

//END OF AUDIOS

//onscroll event
document.addEventListener("DOMContentLoaded", function() {
    var instructionsCont = document.querySelector('.instructions-cont');
    var isInView = false;

    function fadeInElement(entries, observer) {
        entries.forEach(entry => {
            if (!isInView && entry.isIntersecting) {
                instructionsCont.style.opacity = 1;
                instructionsCont.style.transform = 'translateY(0)';
                isInView = true;
            } else if (isInView && !entry.isIntersecting) {
                instructionsCont.style.opacity = 0;
                instructionsCont.style.transform = 'translateY(20px)';
                isInView = false;
            }
        });
    }

    var observer = new IntersectionObserver(fadeInElement, { threshold: 0.5});
    observer.observe(instructionsCont);
});
