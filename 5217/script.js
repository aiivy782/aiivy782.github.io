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

const workDuration = 52 * 60;
const breakDuration = 17 * 60;
let isWorkTime = true;
let isRunning = false;
let cyclesCompleted = 0;
let worker = null;

const notificationSound = new Audio('cycle.mp3');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function updateHeader(seconds) {
    header.textContent = formatTime(seconds);
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

function initializeWorker() {
    if (worker) {
        worker.terminate();
    }
    worker = new Worker('worker.js');
    
    worker.onmessage = function(e) {
        const { remainingTime, completed } = e.data;
        
        if (completed) {
            isWorkTime = !isWorkTime;
            if (!isWorkTime) {
                sendNotification('Break time! Have a good tea for 17 minutes.');
            } else {
                sendNotification('It\'s time to work! Now focus for 52 minutes.');
                cyclesCompleted++;
                updateCycleCounter();
            }
            notificationSound.play();
            initializeWorker();
            if (isRunning) {
                startTimer();
            }
        } else {
            updateHeader(remainingTime);
        }
    };
}

function startTimer() {
    worker.postMessage({
        action: 'start',
        duration: isWorkTime ? workDuration : breakDuration
    });
}

function toggleTimer() {
    if (!worker) {
        initializeWorker();
    }
    
    if (isRunning) {
        worker.postMessage({ action: 'pause' });
        startPauseButton.textContent = 'CONTINUE';
    } else {
        startTimer();
        startPauseButton.textContent = 'PAUSE';
    }
    isRunning = !isRunning;
}

function resetTimer() {
    isWorkTime = true;
    isRunning = false;
    cyclesCompleted = 0;
    updateCycleCounter();
    startPauseButton.textContent = 'START';
    initializeWorker();
    updateHeader(workDuration);
}

startPauseButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);

initializeWorker();
updateHeader(workDuration);
updateCycleCounter();

if ("Notification" in window) {
    Notification.requestPermission();
}