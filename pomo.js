var timerInterval;
var secs;
var activeMode = null;
var paused = false;

function updateTimerDisplay(secs) {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    document.querySelector("#pomotimer").innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
function startTimer() {
    timerInterval = setInterval(function() {
        if (secs > 0) {
            secs--;
            updateTimerDisplay(secs);
        } else {
            clearInterval(timerInterval);
            document.querySelector(".start").disabled = false;
        }
    }, 1000);
}

function resetTimer(initialTime) {
    clearInterval(timerInterval);
    secs = initialTime;
    updateTimerDisplay(secs);
    document.querySelector(".start").disabled = false;
    paused = false;
    document.querySelector(".pause").innerHTML = "Pause";
}
document.querySelector(".focus").addEventListener("click", function() {
    activeMode = "focus";
    resetTimer(1500);
});

document.querySelector(".shortbreak").addEventListener("click", function() {
    activeMode = "shortbreak";
    resetTimer(300); 
});
document.querySelector(".longbreak").addEventListener("click", function() {
    activeMode = "longbreak";
    resetTimer(900);
});

document.querySelector(".start").addEventListener("click", function() {
    if (!paused) {
        startTimer();
        document.querySelector(".start").disabled = true;
    } else {
        paused = false;
        startTimer();
        document.querySelector(".pause").innerHTML = "Pause";
    }
});
document.querySelector(".Reset").addEventListener("click", function() {
    if (activeMode === "focus") {
        resetTimer(1500); 
    } else if (activeMode === "shortbreak") {
        resetTimer(300);
    } else if (activeMode === "longbreak") {
        resetTimer(900);
    }
});

document.querySelector(".pause").addEventListener("click", function() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        paused = true;
        document.querySelector(".pause").innerHTML = "Resume";
    } else if (paused==true) {
        startTimer();
        document.querySelector(".pause").innerHTML = "Pause";
    }
});
