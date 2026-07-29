// ======================================================
// storage.js
// ======================================================

"use strict";

// ======================================================
// Storage Key
// ======================================================

const STORAGE_KEY = "handball_stats_hub_matches";

const CURRENT_MATCH_KEY = "handball_stats_hub_current";

// ======================================================
// Save Current Match
// ======================================================

function saveCurrentMatch(match) {

    if (!match) return;

    localStorage.setItem(

        CURRENT_MATCH_KEY,

        JSON.stringify(match.toJSON())

    );

}

// ======================================================
// Load Current Match
// ======================================================

function loadCurrentMatch() {

    const json = localStorage.getItem(

        CURRENT_MATCH_KEY

    );

    if (!json) {

        return null;

    }

    const data = JSON.parse(json);

    return Match.fromJSON(data);

}

// ======================================================
// Delete Current Match
// ======================================================

function deleteCurrentMatch() {

    localStorage.removeItem(

        CURRENT_MATCH_KEY

    );

}

// ======================================================
// Save Finished Match
// ======================================================

function saveFinishedMatch(match) {

    if (!match) return;

    const matches = loadMatches();

    matches.push(match.toJSON());

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(matches)

    );

}

// ======================================================
// Load Matches
// ======================================================

function loadMatches() {

    const json = localStorage.getItem(

        STORAGE_KEY

    );

    if (!json) {

        return [];

    }

    return JSON.parse(json);

}

// ======================================================
// Delete Match
// ======================================================

function deleteMatch(matchId) {

    const matches = loadMatches().filter(

        match => match.id !== matchId

    );

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(matches)

    );

}

// ======================================================
// Clear All Matches
// ======================================================

function clearAllMatches() {

    localStorage.removeItem(STORAGE_KEY);

    localStorage.removeItem(CURRENT_MATCH_KEY);

}

// ======================================================
// Export JSON
// ======================================================

function exportMatches() {

    return JSON.stringify(

        loadMatches(),

        null,

        2

    );

}

// ======================================================
// Import JSON
// ======================================================

function importMatches(json) {

    try {

        const matches = JSON.parse(json);

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(matches)

        );

        return true;

    } catch (error) {

        console.error(error);

        return false;

    }

}

// ======================================================
// Storage Size
// ======================================================

function getStorageSize() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {

        return 0;

    }

    return new Blob([data]).size;

}

// ======================================================
// Storage Info
// ======================================================

function getStorageInfo() {

    return {

        matchCount: loadMatches().length,

        currentMatch: loadCurrentMatch() !== null,

        storageSize: getStorageSize()

    };

}

// ======================================================
// Storage Available
// ======================================================

function isStorageAvailable() {

    try {

        const key = "__storage_test__";

        localStorage.setItem(key, key);

        localStorage.removeItem(key);

        return true;

    } catch {

        return false;

    }

}

// ======================================================
// Initialize
// ======================================================

function initializeStorage() {

    if (!isStorageAvailable()) {

        console.error(

            "LocalStorage is unavailable."

        );

    }

}

// ======================================================
// Public API
// ======================================================

window.StorageManager = {

    initializeStorage,

    saveCurrentMatch,

    loadCurrentMatch,

    deleteCurrentMatch,

    saveFinishedMatch,

    loadMatches,

    deleteMatch,

    clearAllMatches,

    exportMatches,

    importMatches,

    getStorageInfo,

    getStorageSize

};
