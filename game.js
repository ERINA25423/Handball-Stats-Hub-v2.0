// =======================================================
// Handball Stats Hub v2
// game.js
// Part 1
// Match Controller
// =======================================================

"use strict";

// =======================================================
// Current Match
// =======================================================

let currentMatch = null;

// =======================================================
// Initialize
// =======================================================

function initializeGame() {

    console.log("Game initialized");

}

// =======================================================
// New Match
// =======================================================

function createMatch(matchInfo) {

    currentMatch = new Match({

        id: crypto.randomUUID(),

        date: matchInfo.date,

        opponent: matchInfo.opponent

    });

    resetUI();

    emit("match:new");

}

// =======================================================
// Get Match
// =======================================================

function getCurrentMatch() {

    return currentMatch;

}

// =======================================================
// Finish Match
// =======================================================

function finishMatch() {

    if (!currentMatch) return;

    stopTimer();

    emit("match:finished");

}

// =======================================================
// Add Event
// =======================================================

function addMatchEvent({

    player,

    shot,

    memo = ""

}) {

    if (!currentMatch) return;

    const event = new MatchEvent({

        id: crypto.randomUUID(),

        team: getCurrentTeam(),

        half: getCurrentHalf(),

        time: getCurrentMatchTime(),

        elapsedSeconds: getCurrentSeconds(),

        player,

        shot,

        memo

    });

    currentMatch.addEvent(event);

    renderHistory(currentMatch.getEvents());

    emit("event:added", event);

}

// =======================================================
// Undo
// =======================================================

function undoLastEvent() {

    if (!currentMatch) return;

    currentMatch.undo();

    renderHistory(currentMatch.getEvents());

    emit("event:undo");

}

// =======================================================
// Event Count
// =======================================================

function getEventCount() {

    if (!currentMatch) return 0;

    return currentMatch.getEvents().length;

}

// =======================================================
// Handball Stats Hub v2
// game.js
// Part 2
// Event Input Controller
// =======================================================

// =======================================================
// Current Selection
// =======================================================

const GameSelection = {

    player: null,

    shotCourse: null,

    shotType: null,

    result: null,

    memo: ""

};

// =======================================================
// Player
// =======================================================

function selectPlayer(player) {

    GameSelection.player = player;

}

// =======================================================
// Shot Course
// =======================================================

function selectShotCourse(course) {

    GameSelection.shotCourse = course;

}

// =======================================================
// Shot Type
// =======================================================

function selectShotType(type) {

    GameSelection.shotType = type;

}

// =======================================================
// Result
// =======================================================

function selectResult(result) {

    GameSelection.result = result;

}

// =======================================================
// Memo
// =======================================================

function setMemo(text) {

    GameSelection.memo = text;

}

// =======================================================
// Validate
// =======================================================

function validateEvent() {

    if (!GameSelection.player) {

        showToast("選手を選択してください");

        return false;

    }

    if (!GameSelection.shotCourse) {

        showToast("コースを選択してください");

        return false;

    }

    if (!GameSelection.shotType) {

        showToast("シュート種類を選択してください");

        return false;

    }

    if (!GameSelection.result) {

        showToast("結果を選択してください");

        return false;

    }

    return true;

}

// =======================================================
// Save Event
// =======================================================

function saveCurrentEvent() {

    if (!validateEvent()) {

        return;

    }

    const shot = new Shot({

        course: GameSelection.shotCourse,

        type: GameSelection.shotType,

        result: GameSelection.result

    });

    addMatchEvent({

        player: GameSelection.player,

        shot,

        memo: GameSelection.memo

    });

    clearCurrentSelection();

    showToast("保存しました");

}

// =======================================================
// Clear Selection
// =======================================================

function clearCurrentSelection() {

    GameSelection.player = null;

    GameSelection.shotCourse = null;

    GameSelection.shotType = null;

    GameSelection.result = null;

    GameSelection.memo = "";

    if (typeof clearSelections === "function") {

        clearSelections();

    }

}

// =======================================================
// Team
// =======================================================

function changeTeam(team) {

    setTeam(team);

    updateTeamDisplay();

}

// =======================================================
// Half
// =======================================================

function changeHalf(half) {

    setHalf(half);

    updateHalfDisplay();

}

// =======================================================
// Handball Stats Hub v2
// game.js
// Part 3
// Position / Finish
// =======================================================

// =======================================================
// Position
// =======================================================

function selectPosition(position) {

    GameSelection.position = position;

}

function getCurrentPosition() {

    return GameSelection.position;

}

// =======================================================
// Validate
// =======================================================

function validateEvent() {

    if (!GameSelection.player) {

        showToast("選手を選択してください");

        return false;

    }

    if (!GameSelection.position) {

        showToast("ポジションを選択してください");

        return false;

    }

    if (!GameSelection.shotCourse) {

        showToast("コースを選択してください");

        return false;

    }

    if (!GameSelection.shotType) {

        showToast("シュート種類を選択してください");

        return false;

    }

    if (!GameSelection.result) {

        showToast("結果を選択してください");

        return false;

    }

    return true;

}

// =======================================================
// Save Event
// =======================================================

function saveCurrentEvent() {

    if (!validateEvent()) {

        return;

    }

    const shot = new Shot({

        course: GameSelection.shotCourse,

        type: GameSelection.shotType,

        result: GameSelection.result

    });

    addMatchEvent({

        player: GameSelection.player,

        position: GameSelection.position,

        shot,

        memo: GameSelection.memo

    });

    clearCurrentSelection();

    showToast("イベントを保存しました");

}

// =======================================================
// Clear
// =======================================================

function clearCurrentSelection() {

    GameSelection.player = null;

    GameSelection.position = null;

    GameSelection.shotCourse = null;

    GameSelection.shotType = null;

    GameSelection.result = null;

    GameSelection.memo = "";

    clearSelections();

}

// =======================================================
// Match Info
// =======================================================

function getMatchSummary() {

    if (!currentMatch) return null;

    return {

        id: currentMatch.id,

        opponent: currentMatch.opponent,

        totalEvents: currentMatch.getEvents().length,

        half: getCurrentHalf(),

        timer: getCurrentMatchTime()

    };

}

// =======================================================
// Public API
// =======================================================

window.GameController = {

    initializeGame,

    createMatch,

    finishMatch,

    addMatchEvent,

    undoLastEvent,

    saveCurrentEvent,

    selectPlayer,

    selectPosition,

    selectShotCourse,

    selectShotType,

    selectResult,

    setMemo,

    changeTeam,

    changeHalf,

    getCurrentMatch,

    getMatchSummary,

    getEventCount

};

console.log("game.js loaded");



