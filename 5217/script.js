window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
      document.body.classList.add('loaded');
      document.body.classList.remove('loaded_hiding');
    }, 500);
  }

const header = document.getElementById('header');
const cycleCounter = document.getElementById('cycle-counter');
const startPauseButton = document.getElementById('start-pause');
const resetButton = document.getElementById('reset');

let workDuration = 52 * 60;
let breakDuration = 17 * 60;
let timeRemaining = workDuration;
let isWorkTime = true;
let timerInterval = null;
let isRunning = false;
let cyclesCompleted = 0;

const notificationSound = new Audio('cycle.mp3');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function updateHeader() {
    header.textContent = formatTime(timeRemaining);
}

function updateCycleCounter() {
    cycleCounter.textContent = `CYCLES PASSED: ${cyclesCompleted}`;
}

function sendNotification(message) {
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification(message);
    } else if ("Notification" in window && Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification(message);
            }
        });
    }
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        timerInterval = null;
        startPauseButton.textContent = 'CONTINUE';
        isRunning = false;
    } else {
        startPauseButton.textContent = 'PAUSE';
        isRunning = true;
        timerInterval = setInterval(() => {
            if (timeRemaining > 0) {
                timeRemaining--;
                updateHeader();
            } else {
                isWorkTime = !isWorkTime;
                if (!isWorkTime) {
                    sendNotification('Break time! Have a good tea for 17 minutes.');
                } else {
                    sendNotification('It\'s time to work! Now focus for 52 minutes.');
                    cyclesCompleted++;
                    updateCycleCounter();
                }
                notificationSound.play();
                timeRemaining = isWorkTime ? workDuration : breakDuration;
                updateHeader();
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isWorkTime = true;
    timeRemaining = workDuration;
    cyclesCompleted = 0;
    updateHeader();
    updateCycleCounter();
    startPauseButton.textContent = 'START';
    isRunning = false;
}

startPauseButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);

updateHeader();
updateCycleCounter();

if ("Notification" in window) {
    Notification.requestPermission();
}
