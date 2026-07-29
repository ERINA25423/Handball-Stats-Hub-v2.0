// ======================================================
// Handball Stats Hub v2
// game.js
// Part 1 / 4
// ======================================================

"use strict";

// ======================================================
// Current Match
// ======================================================

let currentMatch = null;

// ======================================================
// Current Input State
// ======================================================

const GameState = {

    team: "my",

    half: 1,

    player: null,

    position: null,

    shotType: null,

    shotCourse: null,

    result: null,

    memo: ""

};

// ======================================================
// Initialize
// ======================================================

function initializeGame() {

    console.log("Game initialized");

}

// ======================================================
// Match
// ======================================================

function createMatch(matchInfo) {

    currentMatch = new Match({

        id: crypto.randomUUID(),

        date: matchInfo.date,

        opponent: matchInfo.opponent

    });

    resetInput();

    refreshUI();

    emit("match:new");

}

// ======================================================
// Finish Match
// ======================================================

function finishMatch() {

    if (!currentMatch) return;

    stopTimer();

    emit("match:finished");

}

// ======================================================
// Getter
// ======================================================

function getCurrentMatch() {

    return currentMatch;

}

function getCurrentEvents() {

    if (!currentMatch) return [];

    return currentMatch.getEvents();

}

// ======================================================
// Team
// ======================================================

function selectMyTeam() {

    GameState.team = "my";

    setTeam("my");

    updateTeamDisplay();

}

function selectOpponentTeam() {

    GameState.team = "opponent";

    setTeam("opponent");

    updateTeamDisplay();

}

// ======================================================
// Half
// ======================================================

function setFirstHalf() {

    GameState.half = 1;

    setHalf(1);

    updateHalfDisplay();

}

function setSecondHalf() {

    GameState.half = 2;

    setHalf(2);

    updateHalfDisplay();

}

// ======================================================
// Player
// ======================================================

function selectPlayer(player) {

    GameState.player = player;

}

// ======================================================
// Position
// ======================================================

function selectPosition(position) {

    GameState.position = position;

}

// ======================================================
// Shot Type
// ======================================================

function selectShotType(type) {

    GameState.shotType = type;

}

// ======================================================
// Shot Course
// ======================================================

function selectShotCourse(course) {

    GameState.shotCourse = course;

}

// ======================================================
// Result
// ======================================================

function selectGoal() {

    GameState.result = "Goal";

}

function selectSave() {

    GameState.result = "Save";

}

function selectMiss() {

    GameState.result = "Miss";

}

function selectBlock() {

    GameState.result = "Block";

}

// ======================================================
// Memo
// ======================================================

function setMemo(text) {

    GameState.memo = text;

}

// ======================================================
// Reset Input
// ======================================================

function resetInput() {

    GameState.player = null;

    GameState.position = null;

    GameState.shotType = null;

    GameState.shotCourse = null;

    GameState.result = null;

    GameState.memo = "";

    if (typeof clearSelections === "function") {

        clearSelections();

    }

}

// ======================================================
// Validation
// ======================================================

function validateInput() {

    if (!GameState.player) {

        showToast("選手を選択してください");

        return false;

    }

    if (!GameState.position) {

        showToast("ポジションを選択してください");

        return false;

    }

    if (!GameState.shotType) {

        showToast("シュート種類を選択してください");

        return false;

    }

    if (!GameState.shotCourse) {

        showToast("シュートコースを選択してください");

        return false;

    }

    if (!GameState.result) {

        showToast("結果を選択してください");

        return false;

    }

    return true;

}

// ======================================================
// Handball Stats Hub v2
// game.js
// Part 2 / 4
// Event Save
// ======================================================

// ======================================================
// Save Event
// ======================================================

function saveCurrentEvent() {

    if (!currentMatch) {

        showToast("試合を開始してください");

        return;

    }

    if (!validateInput()) {

        return;

    }

    const shot = createShot();

    const event = createMatchEvent(shot);

    currentMatch.addEvent(event);

    afterSave(event);

}

// ======================================================
// Shot
// ======================================================

function createShot() {

    return new Shot({

        course: GameState.shotCourse,

        type: GameState.shotType,

        result: GameState.result

    });

}

// ======================================================
// Match Event
// ======================================================

function createMatchEvent(shot) {

    return new MatchEvent({

        id: crypto.randomUUID(),

        team: GameState.team,

        half: GameState.half,

        time: getCurrentMatchTime(),

        elapsedSeconds: getCurrentSeconds(),

        player: GameState.player,

        position: GameState.position,

        shot: shot,

        memo: GameState.memo

    });

}

// ======================================================
// After Save
// ======================================================

function afterSave(event) {

    renderHistory(

        currentMatch.getEvents()

    );

    emit("event:saved", event);

    autoSaveMatch();

    resetInput();

    showToast("保存しました");

}

// ======================================================
// Auto Save
// ======================================================

function autoSaveMatch() {

    if (

        typeof saveCurrentMatch ===

        "function"

    ) {

        saveCurrentMatch(

            currentMatch

        );

    }

}

// ======================================================
// Event Count
// ======================================================

function getEventCount() {

    if (!currentMatch) {

        return 0;

    }

    return currentMatch

        .getEvents()

        .length;

}

// ======================================================
// Last Event
// ======================================================

function getLastEvent() {

    if (!currentMatch) {

        return null;

    }

    const events =

        currentMatch.getEvents();

    if (

        events.length === 0

    ) {

        return null;

    }

    return events[

        events.length - 1

    ];

}

// ======================================================
// Statistics
// ======================================================

function getGoalCount() {

    if (!currentMatch) return 0;

    return currentMatch

        .getEvents()

        .filter(

            event =>

                event.shot.result ===

                "Goal"

        )

        .length;

}

function getSaveCount() {

    if (!currentMatch) return 0;

    return currentMatch

        .getEvents()

        .filter(

            event =>

                event.shot.result ===

                "Save"

        )

        .length;

}

function getMissCount() {

    if (!currentMatch) return 0;

    return currentMatch

        .getEvents()

        .filter(

            event =>

                event.shot.result ===

                "Miss"

        )

        .length;

}

function getBlockCount() {

    if (!currentMatch) return 0;

    return currentMatch

        .getEvents()

        .filter(

            event =>

                event.shot.result ===

                "Block"

        )

        .length;

}

// ======================================================
// Handball Stats Hub v2
// game.js
// Part 3 / 4
// Other Event / Undo / Summary
// ======================================================

// ======================================================
// OTHER Event
// ======================================================

function saveOtherEvent(type, memo = "") {

    if (!currentMatch) {

        showToast("試合を開始してください");

        return;

    }

    const event = {

        id: crypto.randomUUID(),

        category: "OTHER",

        type: type,

        team: GameState.team,

        half: GameState.half,

        time: getCurrentMatchTime(),

        elapsedSeconds: getCurrentSeconds(),

        memo: memo

    };

    currentMatch.addEvent(event);

    renderHistory(currentMatch.getEvents());

    autoSaveMatch();

    emit("other:saved", event);

    showToast(type + " を記録しました");

}

// ======================================================
// Turnover
// ======================================================

function saveTurnover() {

    saveOtherEvent("Turnover");

}

// ======================================================
// Undo
// ======================================================

function undoLastEvent() {

    if (!currentMatch) {

        return;

    }

    const events = currentMatch.getEvents();

    if (events.length === 0) {

        showToast("取り消すデータがありません");

        return;

    }

    events.pop();

    renderHistory(events);

    autoSaveMatch();

    emit("event:undo");

    showToast("1件取り消しました");

}

// ======================================================
// Delete All Events
// ======================================================

function clearMatchEvents() {

    if (!currentMatch) return;

    currentMatch.events = [];

    renderHistory([]);

    autoSaveMatch();

}

// ======================================================
// Match Summary
// ======================================================

function getMatchSummary() {

    if (!currentMatch) {

        return null;

    }

    return {

        id: currentMatch.id,

        date: currentMatch.date,

        opponent: currentMatch.opponent,

        eventCount: getEventCount(),

        goal: getGoalCount(),

        save: getSaveCount(),

        miss: getMissCount(),

        block: getBlockCount(),

        currentHalf: GameState.half,

        currentTime: getCurrentMatchTime()

    };

}

// ======================================================
// Export Data
// ======================================================

function exportMatchData() {

    if (!currentMatch) {

        return null;

    }

    return {

        match: currentMatch,

        summary: getMatchSummary(),

        events: currentMatch.getEvents()

    };

}

// ======================================================
// Sync
// ======================================================

function syncCurrentMatch() {

    if (

        typeof syncMatchToFirebase ===

        "function"

    ) {

        syncMatchToFirebase(

            currentMatch

        );

    }

}

// ======================================================
// Analysis
// ======================================================

function analyzeCurrentMatch() {

    if (

        typeof analyzeMatch ===

        "function"

    ) {

        analyzeMatch(

            currentMatch

        );

    }

}

// ======================================================
// Reset Match
// ======================================================

function resetMatch() {

    currentMatch = null;

    resetInput();

    resetTimer();

    clearHistory();

}

// ======================================================
// Handball Stats Hub v2
// game.js
// Part 4 / 4
// Public API / Initialization
// ======================================================

// ======================================================
// Public API
// ======================================================

window.Game = {

    initializeGame,

    createMatch,

    finishMatch,

    resetMatch,

    getCurrentMatch,

    getCurrentEvents,

    getMatchSummary,

    exportMatchData,

    saveCurrentEvent,

    saveOtherEvent,

    saveTurnover,

    undoLastEvent,

    clearMatchEvents,

    analyzeCurrentMatch,

    syncCurrentMatch,

    selectMyTeam,

    selectOpponentTeam,

    setFirstHalf,

    setSecondHalf,

    selectPlayer,

    selectPosition,

    selectShotType,

    selectShotCourse,

    selectGoal,

    selectSave,

    selectMiss,

    selectBlock,

    setMemo

};

// ======================================================
// Event Registration
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    initializeGame();

});

// ======================================================
// Auto Restore
// ======================================================

window.addEventListener("load", () => {

    if (

        typeof loadCurrentMatch ===

        "function"

    ) {

        const match = loadCurrentMatch();

        if (match) {

            currentMatch = match;

            renderHistory(

                currentMatch.getEvents()

            );

        }

    }

});

// ======================================================
// Before Unload
// ======================================================

window.addEventListener("beforeunload", () => {

    autoSaveMatch();

});

// ======================================================
// Visibility
// ======================================================

document.addEventListener(

    "visibilitychange",

    () => {

        if (

            document.hidden

        ) {

            autoSaveMatch();

        }

    }

);

// ======================================================
// Keyboard Shortcuts
// ======================================================

document.addEventListener(

    "keydown",

    (event) => {

        if (

            event.ctrlKey &&

            event.key === "z"

        ) {

            event.preventDefault();

            undoLastEvent();

        }

        if (

            event.ctrlKey &&

            event.key === "s"

        ) {

            event.preventDefault();

            saveCurrentEvent();

        }

    }

);

// ======================================================
// Debug
// ======================================================

function debugGameState() {

    console.table(GameState);

    console.log(currentMatch);

}

// ======================================================
// Version
// ======================================================

const GAME_VERSION = "2.0.0";

// ======================================================
// Ready
// ======================================================

console.log(

    "Handball Stats Hub v2",

    GAME_VERSION,

    "game.js loaded"

);

