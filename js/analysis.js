// ======================================================
// analysis.js
// ======================================================

"use strict";

// ======================================================
// Analyze Match
// ======================================================

function analyzeMatch(match) {

    if (!match) {

        return null;

    }

    return {

        team: analyzeTeam(match),

        players: analyzePlayers(match),

        goalkeeper: analyzeGoalkeeper(match)

    };

}

// ======================================================
// Team Analysis
// ======================================================

function analyzeTeam(match) {

    const events = match.getEvents();

    const shots = events.filter(

        event => event.shot

    );

    const goals = shots.filter(

        event => event.shot.result === "Goal"

    );

    return {

        shotCount: shots.length,

        goalCount: goals.length,

        successRate:

            shots.length === 0

                ? 0

                : Number(

                    (

                        goals.length /

                        shots.length *

                        100

                    ).toFixed(1)

                )

    };

}

// ======================================================
// Player Analysis
// ======================================================

function analyzePlayers(match) {

    const result = {};

    match.getEvents().forEach(event => {

        if (!event.player) return;

        const id = event.player;

        if (!result[id]) {

            result[id] = {

                player: id,

                shots: 0,

                goals: 0

            };

        }

        result[id].shots++;

        if (

            event.shot.result ===

            "Goal"

        ) {

            result[id].goals++;

        }

    });

    Object.values(result).forEach(player => {

        player.successRate =

            player.shots === 0

                ? 0

                : Number(

                    (

                        player.goals /

                        player.shots *

                        100

                    ).toFixed(1)

                );

    });

    return result;

}

// ======================================================
// Goalkeeper Analysis
// ======================================================

function analyzeGoalkeeper(match) {

    const shots = match.getEvents().filter(

        event =>

            event.team === "opponent" &&

            event.shot

    );

    const saves = shots.filter(

        event =>

            event.shot.result === "Save"

    );

    return {

        facedShots: shots.length,

        saves: saves.length,

        saveRate:

            shots.length === 0

                ? 0

                : Number(

                    (

                        saves.length /

                        shots.length *

                        100

                    ).toFixed(1)

                )

    };

}

// ======================================================
// Course Analysis
// ======================================================

function analyzeShotCourse(match) {

    const result = {};

    match.getEvents().forEach(event => {

        if (!event.shot) return;

        const course = event.shot.course;

        if (!result[course]) {

            result[course] = {

                shots: 0,

                goals: 0

            };

        }

        result[course].shots++;

        if (

            event.shot.result === "Goal"

        ) {

            result[course].goals++;

        }

    });

    Object.keys(result).forEach(course => {

        result[course].successRate =

            result[course].shots === 0

                ? 0

                : Number(

                    (

                        result[course].goals /

                        result[course].shots *

                        100

                    ).toFixed(1)

                );

    });

    return result;

}

// ======================================================
// Shot Type Analysis
// ======================================================

function analyzeShotType(match) {

    const result = {};

    match.getEvents().forEach(event => {

        if (!event.shot) return;

        const type = event.shot.type;

        if (!result[type]) {

            result[type] = {

                shots: 0,

                goals: 0

            };

        }

        result[type].shots++;

        if (

            event.shot.result === "Goal"

        ) {

            result[type].goals++;

        }

    });

    Object.keys(result).forEach(type => {

        result[type].successRate =

            result[type].shots === 0

                ? 0

                : Number(

                    (

                        result[type].goals /

                        result[type].shots *

                        100

                    ).toFixed(1)

                );

    });

    return result;

}

// ======================================================
// Half Analysis
// ======================================================

function analyzeHalf(match) {

    const first =

        match.getEvents().filter(

            event => event.half === 1

        );

    const second =

        match.getEvents().filter(

            event => event.half === 2

        );

    return {

        firstHalf: first.length,

        secondHalf: second.length

    };

}

// ======================================================
// Player Ranking
// ======================================================

function getPlayerRanking(match) {

    const players = Object.values(

        analyzePlayers(match)

    );

    return players.sort(

        (a, b) => {

            if (b.goals !== a.goals) {

                return b.goals - a.goals;

            }

            return b.successRate - a.successRate;

        }

    );

}

// ======================================================
// Course Ranking
// ======================================================

function getCourseRanking(match) {

    const courses = Object.entries(

        analyzeShotCourse(match)

    );

    return courses.sort(

        (a, b) =>

            b[1].successRate -

            a[1].successRate

    );

}

// ======================================================
// Match Summary
// ======================================================

function getAnalysisSummary(match) {

    if (!match) {

        return null;

    }

    return {

        team: analyzeTeam(match),

        goalkeeper: analyzeGoalkeeper(match),

        players: analyzePlayers(match),

        course: analyzeShotCourse(match),

        shotType: analyzeShotType(match),

        half: analyzeHalf(match)

    };

}

// ======================================================
// Export
// ======================================================

function exportAnalysis(match) {

    return JSON.stringify(

        getAnalysisSummary(match),

        null,

        2

    );

}

// ======================================================
// Public API
// ======================================================

window.Analysis = {

    analyzeMatch,

    analyzeTeam,

    analyzePlayers,

    analyzeGoalkeeper,

    analyzeShotCourse,

    analyzeShotType,

    analyzeHalf,

    getPlayerRanking,

    getCourseRanking,

    getAnalysisSummary,

    exportAnalysis

};

// ======================================================
// Ready
// ======================================================

console.log(

    "analysis.js loaded"

);
