// =======================================================
// Handball Stats Hub v2
// timer.js
// Part 1
// Timer Engine
// =======================================================

"use strict";

// =======================================================
// Timer State
// =======================================================

const Timer = {

    seconds: 0,

    interval: null,

    running: false,

    lastUpdate: null

};

// =======================================================
// Initialize
// =======================================================

function initializeTimer() {

    resetTimer();

    updateTimerUI();

}

// =======================================================
// Start
// =======================================================

function startTimer() {

    if (Timer.running) return;

    Timer.running = true;

    Timer.lastUpdate = Date.now();

    Timer.interval = setInterval(updateTimer, 1000);

    emit("timer:start");

}

// =======================================================
// Stop
// =======================================================

function stopTimer() {

    if (!Timer.running) return;

    clearInterval(Timer.interval);

    Timer.interval = null;

    Timer.running = false;

    emit("timer:stop");

}

// =======================================================
// Toggle
// =======================================================

function toggleTimer() {

    if (Timer.running) {

        stopTimer();

    } else {

        startTimer();

    }

}

// =======================================================
// Reset
// =======================================================

function resetTimer() {

    stopTimer();

    Timer.seconds = 0;

    updateTimerUI();

}

// =======================================================
// Tick
// =======================================================

function updateTimer() {

    Timer.seconds++;

    Timer.lastUpdate = Date.now();

    updateTimerUI();

}

// =======================================================
// Display
// =======================================================

function updateTimerUI() {

    const text = formatTime(Timer.seconds);

    if (typeof updateTimerDisplay === "function") {

        updateTimerDisplay(text);

    }

}

// =======================================================
// Format
// =======================================================

function formatTime(totalSeconds) {

    const minutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

}

// =======================================================
// Handball Stats Hub v2
// timer.js
// Part 2
// High Precision Timer
// =======================================================

// =======================================================
// Internal Clock
// =======================================================

Timer.baseElapsed = 0;
Timer.startTimestamp = 0;

// =======================================================
// Start
// =======================================================

function startTimer() {

    if (Timer.running) return;

    Timer.running = true;

    Timer.startTimestamp = performance.now();

    Timer.interval = setInterval(updateTimer, 100);

    emit("timer:start");

}

// =======================================================
// Stop
// =======================================================

function stopTimer() {

    if (!Timer.running) return;

    Timer.baseElapsed += performance.now() - Timer.startTimestamp;

    clearInterval(Timer.interval);

    Timer.interval = null;

    Timer.running = false;

    emit("timer:stop");

}

// =======================================================
// Update
// =======================================================

function updateTimer() {

    if (!Timer.running) return;

    const elapsed =

        Timer.baseElapsed +
        (performance.now() - Timer.startTimestamp);

    Timer.seconds = Math.floor(elapsed / 1000);

    updateTimerUI();

}

// =======================================================
// Reset
// =======================================================

function resetTimer() {

    stopTimer();

    Timer.seconds = 0;

    Timer.baseElapsed = 0;

    Timer.startTimestamp = 0;

    updateTimerUI();

}

// =======================================================
// Manual Adjustment
// =======================================================

function addSeconds(sec) {

    Timer.baseElapsed += sec * 1000;

    if (Timer.baseElapsed < 0) {

        Timer.baseElapsed = 0;

    }

    updateTimer();

}

function addMinute() {

    addSeconds(60);

}

function subtractMinute() {

    addSeconds(-60);

}

function addTenSeconds() {

    addSeconds(10);

}

function subtractTenSeconds() {

    addSeconds(-10);

}

// =======================================================
// Jump
// =======================================================

function jumpTo(minutes, seconds) {

    Timer.baseElapsed =

        ((minutes * 60) + seconds) * 1000;

    if (Timer.running) {

        Timer.startTimestamp = performance.now();

    }

    updateTimer();

}

// =======================================================
// Current Time
// =======================================================

function getCurrentMatchTime() {

    return formatTime(Timer.seconds);

}

function getCurrentSeconds() {

    return Timer.seconds;

}

// =======================================================
// Handball Stats Hub v2
// timer.js
// Part 3
// Match Timer Controller
// =======================================================

// =======================================================
// Match Settings
// =======================================================

Timer.matchLength = 30 * 60; // 30分（秒）
Timer.warningPlayed = false;
Timer.finished = false;

// =======================================================
// Match Length
// =======================================================

function setMatchLength(minutes) {

    Timer.matchLength = minutes * 60;

}

function getMatchLength() {

    return Timer.matchLength;

}

// =======================================================
// Update (Override)
// =======================================================

const originalUpdateTimer = updateTimer;

updateTimer = function () {

    originalUpdateTimer();

    checkMatchTime();

};

// =======================================================
// Match Time Check
// =======================================================

function checkMatchTime() {

    if (Timer.finished) return;

    const remain = Timer.matchLength - Timer.seconds;

    if (remain <= 60 && !Timer.warningPlayed) {

        Timer.warningPlayed = true;

        showToast("残り1分");

    }

    if (Timer.seconds >= Timer.matchLength) {

        finishMatchTime();

    }

}

// =======================================================
// Finish
// =======================================================

function finishMatchTime() {

    Timer.finished = true;

    stopTimer();

    playBuzzer();

    showToast("試合終了");

    emit("timer:finished");

}

// =======================================================
// Buzzer
// =======================================================

function playBuzzer() {

    try {

        const audio = new Audio("assets/buzzer.mp3");

        audio.play();

    } catch (e) {

        console.warn("Buzzer unavailable");

    }

}

// =======================================================
// Save / Restore
// =======================================================

function saveTimerState() {

    localStorage.setItem(

        "timerState",

        JSON.stringify({

            seconds: Timer.seconds,

            elapsed: Timer.baseElapsed,

            running: Timer.running,

            matchLength: Timer.matchLength

        })

    );

}

function restoreTimerState() {

    const raw = localStorage.getItem("timerState");

    if (!raw) return;

    const data = JSON.parse(raw);

    Timer.seconds = data.seconds ?? 0;

    Timer.baseElapsed = data.elapsed ?? 0;

    Timer.matchLength = data.matchLength ?? 1800;

    updateTimerUI();

}

// =======================================================
// Visibility
// =======================================================

document.addEventListener("visibilitychange", () => {

    if (!document.hidden && Timer.running) {

        updateTimer();

    }

});

// =======================================================
// Public API
// =======================================================

window.TimerController = {

    startTimer,

    stopTimer,

    toggleTimer,

    resetTimer,

    addSeconds,

    addMinute,

    subtractMinute,

    addTenSeconds,

    subtractTenSeconds,

    jumpTo,

    getCurrentMatchTime,

    getCurrentSeconds,

    setMatchLength,

    getMatchLength,

    saveTimerState,

    restoreTimerState

};

console.log("timer.js loaded");

