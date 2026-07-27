// ============================================
// Handball Stats Hub v2
// main.js
// Part 1
// ============================================

// -----------------------------
// Match State
// -----------------------------

let currentTeam = "my";
let currentHalf = 1;

let selectedPlayer = null;
let selectedPosition = null;
let selectedCourse = null;
let selectedShotType = null;
let selectedResult = null;

let matchStarted = false;

// -----------------------------
// Data
// -----------------------------

let events = [];

let currentEvent = {};

// -----------------------------
// DOM
// -----------------------------

const timerDisplay =
document.getElementById("timerDisplay");

const halfDisplay =
document.getElementById("halfDisplay");

const myTeamBtn =
document.getElementById("myTeamBtn");

const opponentBtn =
document.getElementById("opponentBtn");

const saveEventButton =
document.getElementById("saveEventButton");

const undoButton =
document.getElementById("undoButton");

const historyButton =
document.getElementById("historyButton");

const finishMatchButton =
document.getElementById("finishMatchButton");

const changeHalfButton =
document.getElementById("changeHalfButton");

const historyPanel =
document.getElementById("historyPanel");

const myHistoryList =
document.getElementById("myHistoryList");

const opponentHistoryList =
document.getElementById("opponentHistoryList");

// -----------------------------
// Buttons
// -----------------------------

const positionButtons =
document.querySelectorAll(".positionButton");

const courseButtons =
document.querySelectorAll(".course");

const shotTypeButtons =
document.querySelectorAll(".shotType");

const resultButtons =
document.querySelectorAll(".result");

// -----------------------------
// Initialization
// -----------------------------

window.addEventListener("load", () => {

    initializeApplication();

});

// -----------------------------

function initializeApplication() {

    console.log("Handball Stats Hub v2");

    updateHalfDisplay();

    updateTeamDisplay();

    clearSelections();

    renderHistory();

}

// -----------------------------

function clearSelections() {

    selectedPlayer = null;
    selectedPosition = null;
    selectedCourse = null;
    selectedShotType = null;
    selectedResult = null;

}

// -----------------------------

function updateHalfDisplay() {

    if (currentHalf === 1) {

        halfDisplay.textContent = "1st Half";

    } else {

        halfDisplay.textContent = "2nd Half";

    }

}

// -----------------------------

function updateTeamDisplay() {

    myTeamBtn.classList.remove("active");
    opponentBtn.classList.remove("active");

    if (currentTeam === "my") {

        myTeamBtn.classList.add("active");

    } else {

        opponentBtn.classList.add("active");

    }

}

// ============================================
// main.js
// Part 2
// Selection Events
// ============================================

// -----------------------------
// Position Selection
// -----------------------------

positionButtons.forEach(button => {

    button.addEventListener("click", () => {

        positionButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedPosition = button.textContent.trim();

        const numberInput =
            button.parentElement.querySelector(".numberInput");

        selectedPlayer = numberInput.value || "";

    });

});

// -----------------------------
// Shot Course Selection
// -----------------------------

courseButtons.forEach(button => {

    button.addEventListener("click", () => {

        courseButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedCourse = button.textContent.trim();

    });

});

// -----------------------------
// Shot Type Selection
// -----------------------------

shotTypeButtons.forEach(button => {

    button.addEventListener("click", () => {

        shotTypeButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedShotType = button.textContent.trim();

    });

});

// -----------------------------
// Result Selection
// -----------------------------

resultButtons.forEach(button => {

    button.addEventListener("click", () => {

        resultButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedResult = button.textContent.trim();

    });

});

// -----------------------------
// Update Player Number
// -----------------------------

document.querySelectorAll(".numberInput").forEach(input => {

    input.addEventListener("input", () => {

        const row = input.parentElement;

        const button =
            row.querySelector(".positionButton");

        if (
            selectedPosition === button.textContent.trim()
        ) {

            selectedPlayer = input.value;

        }

    });

});

// -----------------------------
// Team Switch
// -----------------------------

myTeamBtn.addEventListener("click", () => {

    currentTeam = "my";

    updateTeamDisplay();

});

opponentBtn.addEventListener("click", () => {

    currentTeam = "opponent";

    updateTeamDisplay();

});

// ============================================
// main.js
// Part 3
// Save Event / History / Undo
// ============================================

// -----------------------------
// Save Event
// -----------------------------

saveEventButton.addEventListener("click", saveEvent);

function saveEvent() {

    if (
        !selectedPosition ||
        !selectedCourse ||
        !selectedShotType ||
        !selectedResult
    ) {

        alert("入力が完了していません。");
        return;

    }

    const event = {

        id: Date.now(),

        team: currentTeam,

        half: currentHalf,

        time: timerDisplay.textContent,

        player: selectedPlayer,

        position: selectedPosition,

        course: selectedCourse,

        shotType: selectedShotType,

        result: selectedResult

    };

    events.push(event);

    renderHistory();

    resetSelections();

}

// -----------------------------
// Reset Selection
// -----------------------------

function resetSelections() {

    selectedPlayer = null;
    selectedPosition = null;
    selectedCourse = null;
    selectedShotType = null;
    selectedResult = null;

    document
        .querySelectorAll(".selected")
        .forEach(element => {

            element.classList.remove("selected");

        });

}

// -----------------------------
// Render History
// -----------------------------

function renderHistory() {

    myHistoryList.innerHTML = "";

    opponentHistoryList.innerHTML = "";

    events.forEach(event => {

        const row = document.createElement("div");

        row.className = "historyRow";

        row.innerHTML = `
            <span>${event.time}</span>
            <span>${event.position}</span>
            <span>#${event.player}</span>
            <span>${event.course}</span>
            <span>${event.shotType}</span>
            <span>${event.result}</span>
        `;

        if (event.team === "my") {

            myHistoryList.appendChild(row);

        } else {

            opponentHistoryList.appendChild(row);

        }

    });

}

// -----------------------------
// Undo
// -----------------------------

undoButton.addEventListener("click", undoLastEvent);

function undoLastEvent() {

    if (events.length === 0) {

        return;

    }

    events.pop();

    renderHistory();

}

// -----------------------------
// History Panel
// -----------------------------

historyButton.addEventListener("click", () => {

    historyPanel.classList.toggle("hidden");

});

// ============================================
// main.js
// Part 4
// Match Control
// ============================================

// -----------------------------
// Change Half
// -----------------------------

changeHalfButton.addEventListener("click", changeHalf);

function changeHalf() {

    if (currentHalf === 1) {

        currentHalf = 2;

    } else {

        currentHalf = 1;

    }

    updateHalfDisplay();

    showToast("Half Changed");

}

// -----------------------------
// New Match
// -----------------------------

const newMatchButton =
document.getElementById("newMatchButton");

if (newMatchButton) {

    newMatchButton.addEventListener("click", newMatch);

}

function newMatch() {

    if (!confirm("新しい試合を開始しますか？")) {

        return;

    }

    events = [];

    currentHalf = 1;

    clearSelections();

    renderHistory();

    updateHalfDisplay();

    if (typeof resetTimer === "function") {

        resetTimer();

    }

    showToast("New Match");

}

// -----------------------------
// Finish Match
// -----------------------------

finishMatchButton.addEventListener("click", finishMatch);

function finishMatch() {

    if (events.length === 0) {

        alert("保存するデータがありません。");

        return;

    }

    if (typeof saveMatch === "function") {

        saveMatch(events);

    }

    showToast("Match Saved");

}

// -----------------------------
// Match Information
// -----------------------------

function getMatchInformation() {

    return {

        date:
        document.getElementById("matchDate").value,

        competition:
        document.getElementById("competition").value,

        venue:
        document.getElementById("venue").value,

        ourTeam:
        document.getElementById("ourTeamName").value,

        opponent:
        document.getElementById("opponentTeamName").value

    };

}

// -----------------------------
// Toast
// -----------------------------

const toast =
document.getElementById("toast");

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}

// -----------------------------
// Loading
// -----------------------------

const loadingScreen =
document.getElementById("loadingScreen");

function showLoading() {

    if (!loadingScreen) return;

    loadingScreen.classList.remove("hidden");

}

function hideLoading() {

    if (!loadingScreen) return;

    loadingScreen.classList.add("hidden");

}

// -----------------------------
// Modal
// -----------------------------

const modal =
document.getElementById("modal");

const modalTitle =
document.getElementById("modalTitle");

const modalMessage =
document.getElementById("modalMessage");

const modalOk =
document.getElementById("modalOk");

const modalCancel =
document.getElementById("modalCancel");

function openModal(title, message) {

    modalTitle.textContent = title;

    modalMessage.textContent = message;

    modal.classList.remove("hidden");

}

function closeModal() {

    modal.classList.add("hidden");

}

if (modalCancel) {

    modalCancel.addEventListener("click", closeModal);

}

if (modalOk) {

    modalOk.addEventListener("click", closeModal);

}

// ============================================
// main.js
// Part 5
// Startup / Firebase / Local Storage / PWA
// ============================================

// -----------------------------
// Application Start
// -----------------------------

document.addEventListener("DOMContentLoaded", () => {

    console.log("Handball Stats Hub v2 Started");

    initializeApplication();

    loadLocalMatch();

    initializeFirebase();

    initializePWA();

});

// -----------------------------
// Local Storage
// -----------------------------

function loadLocalMatch() {

    const data = localStorage.getItem("currentMatch");

    if (!data) return;

    try {

        const match = JSON.parse(data);

        events = match.events || [];

        currentHalf = match.currentHalf || 1;

        renderHistory();

        updateHalfDisplay();

        console.log("Local Match Loaded");

    } catch (error) {

        console.error(error);

    }

}

function saveLocalMatch() {

    const data = {

        currentHalf,

        events

    };

    localStorage.setItem(

        "currentMatch",

        JSON.stringify(data)

    );

}

// -----------------------------
// Auto Save
// -----------------------------

setInterval(() => {

    saveLocalMatch();

}, 5000);

// -----------------------------
// Firebase
// -----------------------------

function initializeFirebase() {

    if (typeof window.initializeFirebaseApp === "function") {

        window.initializeFirebaseApp();

    }

}

// -----------------------------
// Online / Offline
// -----------------------------

window.addEventListener("online", () => {

    showToast("Online");

});

window.addEventListener("offline", () => {

    showToast("Offline");

});

// -----------------------------
// Before Exit
// -----------------------------

window.addEventListener("beforeunload", () => {

    saveLocalMatch();

});

// -----------------------------
// PWA
// -----------------------------

function initializePWA() {

    if (!("serviceWorker" in navigator)) {

        return;

    }

    navigator.serviceWorker.ready.then(() => {

        console.log("PWA Ready");

    });

}

// -----------------------------
// Keyboard Shortcuts
// -----------------------------

document.addEventListener("keydown", (event) => {

    switch (event.key) {

        case "s":

            saveEvent();

            break;

        case "z":

            undoLastEvent();

            break;

        case "h":

            historyPanel.classList.toggle("hidden");

            break;

        default:

            break;

    }

});

// -----------------------------
// Global Error
// -----------------------------

window.addEventListener("error", (event) => {

    console.error(event.error);

});

// ============================================
// End of main.js
// ============================================
