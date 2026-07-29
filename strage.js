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
