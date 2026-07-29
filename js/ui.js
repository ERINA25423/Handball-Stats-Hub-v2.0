// =======================================================
// Handball Stats Hub v2
// ui.js
// Part 1
// UI Controller
// =======================================================

"use strict";

// =======================================================
// DOM
// =======================================================

const UI = {

    half: document.getElementById("halfDisplay"),

    timer: document.getElementById("timerDisplay"),

    toast: document.getElementById("toast"),

    loading: document.getElementById("loadingScreen"),

    historyPanel:
        document.getElementById("historyPanel"),

    myHistory:
        document.getElementById("myHistoryList"),

    opponentHistory:
        document.getElementById("opponentHistoryList"),

    myTeamButton:
        document.getElementById("myTeamBtn"),

    opponentButton:
        document.getElementById("opponentBtn")

};

// =======================================================
// Initialize
// =======================================================

function initializeUI() {

    updateHalfDisplay();

    updateTeamDisplay();

    hideLoading();

}

// =======================================================
// Half
// =======================================================

function updateHalfDisplay() {

    if (!UI.half) return;

    UI.half.textContent =
        state.currentHalf === 1
            ? "1st Half"
            : "2nd Half";

}

// =======================================================
// Team
// =======================================================

function updateTeamDisplay() {

    if (!UI.myTeamButton) return;

    UI.myTeamButton.classList.remove("active");

    UI.opponentButton.classList.remove("active");

    if (state.currentTeam === "my") {

        UI.myTeamButton.classList.add("active");

    } else {

        UI.opponentButton.classList.add("active");

    }

}

// =======================================================
// Timer
// =======================================================

function updateTimerDisplay(text) {

    if (!UI.timer) return;

    UI.timer.textContent = text;

}

// =======================================================
// Loading
// =======================================================

function showLoading() {

    if (!UI.loading) return;

    UI.loading.classList.remove("hidden");

}

function hideLoading() {

    if (!UI.loading) return;

    UI.loading.classList.add("hidden");

}

// =======================================================
// Toast
// =======================================================

let toastTimeout = null;

function showToast(message) {

    if (!UI.toast) return;

    clearTimeout(toastTimeout);

    UI.toast.textContent = message;

    UI.toast.classList.add("show");

    toastTimeout = setTimeout(() => {

        UI.toast.classList.remove("show");

    }, 2000);

}

// =======================================================
// Handball Stats Hub v2
// ui.js
// Part 2
// History / Modal / Button Control
// =======================================================

// =======================================================
// History
// =======================================================

function renderHistory(history = []) {

    if (!UI.myHistory || !UI.opponentHistory) return;

    UI.myHistory.innerHTML = "";

    UI.opponentHistory.innerHTML = "";

    if (!event.shot) {
    return;
}
 
    history.forEach(event => {

        const row = createHistoryRow(event);

      if (event.team === "my") {

            UI.myHistory.prepend(row);

        } else {

            UI.opponentHistory.prepend(row);

        }

    });

}

// =======================================================

function createHistoryRow(event) {

    const div = document.createElement("div");

    div.className = "history-item";

    div.dataset.id = event.id;

    div.innerHTML = `

        <span class="history-time">${event.time}</span>

        <span class="history-shot">${event.shot.type}</span>

<span class="history-result">${event.shot.result}</span>

        <span class="history-result">${event.result}</span>

    `;

    return div;

}

// =======================================================

function clearHistory() {

    if (UI.myHistory) {

        UI.myHistory.innerHTML = "";

    }

    if (UI.opponentHistory) {

        UI.opponentHistory.innerHTML = "";

    }

}

// =======================================================
// History Panel
// =======================================================

function openHistory() {

    UI.historyPanel?.classList.add("open");

}

function closeHistory() {

    UI.historyPanel?.classList.remove("open");

}

function toggleHistory() {

    UI.historyPanel?.classList.toggle("open");

}

// =======================================================
// Modal
// =======================================================

function openModal(id) {

    const modal = document.getElementById(id);

    if (!modal) return;

    modal.classList.add("show");

}

function closeModal(id) {

    const modal = document.getElementById(id);

    if (!modal) return;

    modal.classList.remove("show");

}

// =======================================================
// Button Active
// =======================================================

function setActiveButton(groupSelector, targetButton) {

    const buttons = document.querySelectorAll(groupSelector);

    buttons.forEach(button => {

        button.classList.remove("active");

    });

    targetButton.classList.add("active");

}

// =======================================================
// Button Enable
// =======================================================

function enableButton(id) {

    const button = document.getElementById(id);

    if (!button) return;

    button.disabled = false;

}

function disableButton(id) {

    const button = document.getElementById(id);

    if (!button) return;

    button.disabled = true;

}

// =======================================================
// Selection
// =======================================================

function clearSelections() {

    document.querySelectorAll(".selected").forEach(button => {

        button.classList.remove("selected");

    });

}

// =======================================================
// Status
// =======================================================

function updateConnectionStatus(isOnline) {

    document.body.classList.toggle(

        "offline",

        !isOnline

    );

    showToast(

        isOnline

            ? "オンライン"

            : "オフライン"

    );

}

// =======================================================
// Handball Stats Hub v2
// ui.js
// Part 3
// Dynamic UI / Event Binding
// =======================================================

// =======================================================
// Player Buttons
// =======================================================

function renderPlayerButtons(players = []) {

    const container = document.getElementById("playerContainer");

    if (!container) return;

    container.innerHTML = "";

    players.forEach(player => {

        const button = document.createElement("button");

        button.className = "player-button";

        button.textContent = player.number;

        button.dataset.playerId = player.id;

        button.addEventListener("click", () => {

            setActiveButton(".player-button", button);

            if (typeof selectPlayer === "function") {

                selectPlayer(player.id);

            }

        });

        container.appendChild(button);

    });

}

// =======================================================
// Shot Course Buttons
// =======================================================

function renderShotCourseGrid() {

    const grid = document.getElementById("shotGrid");

    if (!grid) return;

    grid.innerHTML = "";

    for (let i = 1; i <= 9; i++) {

        const button = document.createElement("button");

        button.className = "shot-course";

        button.dataset.course = i;

        button.textContent = i;

        button.onclick = () => {

            setActiveButton(".shot-course", button);

            if (typeof selectShotCourse === "function") {

                selectShotCourse(i);

            }

        };

        grid.appendChild(button);

    }

}

// =======================================================
// Result Buttons
// =======================================================

function initializeResultButtons() {

    document.querySelectorAll(".result-button")

        .forEach(button => {

            button.addEventListener("click", () => {

                setActiveButton(".result-button", button);

            });

        });

}

// =======================================================
// Simple Animation
// =======================================================

function flashElement(element) {

    if (!element) return;

    element.classList.add("flash");

    setTimeout(() => {

        element.classList.remove("flash");

    }, 300);

}

// =======================================================
// Reset UI
// =======================================================

function resetUI() {

    clearSelections();

    clearHistory();

    updateHalfDisplay();

    updateTeamDisplay();

}

// =======================================================
// Refresh
// =======================================================

function refreshUI() {

    updateHalfDisplay();

    updateTeamDisplay();

}

// =======================================================
// Bind Events
// =======================================================

function bindUIEvents() {

    initializeResultButtons();

}

// =======================================================
// Initialize Extension
// =======================================================

const previousInitializeUI = initializeUI;

initializeUI = function () {

    previousInitializeUI();

    renderShotCourseGrid();

    bindUIEvents();

};

// =======================================================
// Public API
// =======================================================

window.UIController = {

    initializeUI,

    updateHalfDisplay,

    updateTeamDisplay,

    updateTimerDisplay,

    showToast,

    showLoading,

    hideLoading,

    renderHistory,

    clearHistory,

    openHistory,

    closeHistory,

    toggleHistory,

    openModal,

    closeModal,

    enableButton,

    disableButton,

    renderPlayerButtons,

    renderShotCourseGrid,

    refreshUI,

    resetUI

};

console.log("ui.js loaded");
