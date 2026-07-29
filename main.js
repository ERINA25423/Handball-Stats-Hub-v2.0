// =====================================================
// Handball Stats Hub v2
// main.js
// Part 1
// =====================================================

"use strict";

// =====================================================
// App Information
// =====================================================

const APP = {

    name: "Handball Stats Hub",

    version: "2.0.0"

};

// =====================================================
// Global State
// =====================================================

const state = {

    initialized: false,

    currentMatchId: null,

    currentTeam: "my",

    currentHalf: 1,

    matchRunning: false,

    selectedPlayer: null,

    selectedPosition: null,

    selectedShotType: null,

    selectedCourse: null,

    selectedResult: null

};

// =====================================================
// DOM Cache
// =====================================================

const ui = {};

// =====================================================
// Application Start
// =====================================================

document.addEventListener("DOMContentLoaded", boot);

// =====================================================

function boot() {

    console.log(`${APP.name} v${APP.version}`);

    cacheDOM();

    initializeModules();

    createNewMatch();

    state.initialized = true;

}

// =====================================================
// Cache DOM
// =====================================================

function cacheDOM() {

    ui.timer =
        document.getElementById("timerDisplay");

    ui.half =
        document.getElementById("halfDisplay");

    ui.history =
        document.getElementById("historyPanel");

    ui.loading =
        document.getElementById("loadingScreen");

    ui.toast =
        document.getElementById("toast");

}

// =====================================================
// Initialize Modules
// =====================================================

function initializeModules() {

    initializeUI();

    initializeGame();

    initializeTimer();

    initializeStorage();

    initializeAnalysis();

    initializeFirebase();

    initializePWA();

}

// =====================================================
// Create Match
// =====================================================

function createNewMatch() {

    state.currentMatchId = crypto.randomUUID();

    state.currentHalf = 1;

    state.currentTeam = "my";

    state.matchRunning = false;

    updateHalfDisplay();

    updateTeamDisplay();

}

// =====================================================
// Global Getters
// =====================================================

function getState() {

    return state;

}

function getMatchId() {

    return state.currentMatchId;

}

function getCurrentHalf() {

    return state.currentHalf;

}

function getCurrentTeam() {

    return state.currentTeam;

}

// =====================================================
// Global Setters
// =====================================================

function setHalf(half) {

    state.currentHalf = half;

    updateHalfDisplay();

}

function setTeam(team) {

    state.currentTeam = team;

    updateTeamDisplay();

}

function setRunning(flag) {

    state.matchRunning = flag;

}

// =====================================================
// Debug
// =====================================================

window.app = {

    state,

    getState,

    createNewMatch

};

// =====================================================
// Handball Stats Hub v2
// main.js
// Part 2
// Event Registration
// =====================================================

// =====================================================
// Register Events
// =====================================================

function registerApplicationEvents() {

    window.addEventListener("beforeunload", beforeExit);

    window.addEventListener("online", onOnline);

    window.addEventListener("offline", onOffline);

    document.addEventListener("keydown", keyboardShortcut);

}

// =====================================================
// Boot Complete
// =====================================================

function finishBoot() {

    registerApplicationEvents();

    restoreAutoSave();

    console.log("Boot Complete");

}

// =====================================================
// Update boot()
// =====================================================

const originalBoot = boot;

boot = function () {

    console.log(`${APP.name} v${APP.version}`);

    cacheDOM();

    initializeModules();

    createNewMatch();

    finishBoot();

    state.initialized = true;

};

// =====================================================
// Before Exit
// =====================================================

function beforeExit() {

   if (window.Game?.getCurrentMatch) {

    saveCurrentMatch(

        window.Game.getCurrentMatch()

    );

}

}

// =====================================================
// Network
// =====================================================

function onOnline() {

    console.log("Online");

    if (typeof showToast === "function") {

        showToast("Online");

    }

}

function onOffline() {

    console.log("Offline");

    if (typeof showToast === "function") {

        showToast("Offline");

    }

}

// =====================================================
// Keyboard Shortcut
// =====================================================

function keyboardShortcut(event) {

    if (event.target.tagName === "INPUT") return;

    if (event.target.tagName === "TEXTAREA") return;

    switch (event.key.toLowerCase()) {

        case "s":

            if (typeof saveCurrentEvent === "function") {

                saveCurrentEvent();

            }

            break;

        case "z":

            if (typeof undoLastEvent === "function") {

                undoLastEvent();

            }

            break;

        case "h":

            if (typeof toggleHistory === "function") {

                toggleHistory();

            }

            break;

        case " ":

            event.preventDefault();

            if (typeof toggleTimer === "function") {

                toggleTimer();

            }

            break;

    }

}

// =====================================================
// Global Reset
// =====================================================

function resetSelections() {

    state.selectedPlayer = null;

    state.selectedPosition = null;

    state.selectedShotType = null;

    state.selectedCourse = null;

    state.selectedResult = null;

}

// =====================================================
// New Match
// =====================================================

function resetMatchState() {

    resetSelections();

    state.currentHalf = 1;

    state.currentTeam = "my";

    state.matchRunning = false;

    updateHalfDisplay();

    updateTeamDisplay();

}

// =====================================================
// Utility
// =====================================================

function generateId() {

    return crypto.randomUUID();

}

function getTimestamp() {

    return new Date().toISOString();

}

// =====================================================
// Debug
// =====================================================

window.debug = {

    resetMatchState,

    generateId,

    getTimestamp,

    state

};

// =====================================================
// Handball Stats Hub v2
// main.js
// Part 3
// Application Core
// =====================================================

// =====================================================
// Config
// =====================================================

const CONFIG = {

    autoSaveInterval: 30000,

    debug: true,

    appVersion: APP.version

};

// =====================================================
// Event Bus
// =====================================================

const EventBus = new EventTarget();

// -----------------------------

function emit(eventName, detail = {}) {

    EventBus.dispatchEvent(

        new CustomEvent(eventName, {

            detail

        })

    );

}

// -----------------------------

function on(eventName, callback) {

    EventBus.addEventListener(eventName, callback);

}

// =====================================================
// Common Events
// =====================================================

on("match:new", () => {

    console.log("New Match");

});

on("match:saved", () => {

    console.log("Match Saved");

});

on("timer:start", () => {

    state.matchRunning = true;

});

on("timer:stop", () => {

    state.matchRunning = false;

});

// =====================================================
// Auto Save
// =====================================================

setInterval(() => {

    if (!state.initialized) {

        return;

    }

    if (typeof saveAuto === "function") {

        saveAuto();

    }

}, CONFIG.autoSaveInterval);

// =====================================================
// Error Handler
// =====================================================

window.addEventListener("error", (event) => {

    console.error(event.error);

    if (typeof showToast === "function") {

        showToast("Application Error");

    }

});

// =====================================================
// Promise Error
// =====================================================

window.addEventListener(

    "unhandledrejection",

    (event) => {

        console.error(event.reason);

    }

);

// =====================================================
// Version
// =====================================================

function getVersion() {

    return CONFIG.appVersion;

}

// =====================================================
// Health Check
// =====================================================

function healthCheck() {

    return {

        initialized: state.initialized,

        matchId: state.currentMatchId,

        running: state.matchRunning,

        version: getVersion(),

        online: navigator.onLine

    };

}

// =====================================================
// Export
// =====================================================

window.HSH = {

    state,

    config: CONFIG,

    emit,

    on,

    healthCheck,

    getVersion,

    createNewMatch,

    getCurrentHalf,

    getCurrentTeam,

    setHalf,

    setTeam

};

// =====================================================
// Ready
// =====================================================

console.log("main.js loaded");

