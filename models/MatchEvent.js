// ======================================================
// MatchEvent.js
// ======================================================

"use strict";

class MatchEvent {

    constructor({

        id,

        team,

        half,

        time,

        elapsedSeconds,

        player,

        position,

        shot,

        memo = ""

    }) {

        this.id = id;

        this.team = team;

        this.half = half;

        this.time = time;

        this.elapsedSeconds = elapsedSeconds;

        this.player = player;

        this.position = position;

        this.shot = shot;

        this.memo = memo;

    }

    // ==================================================
    // Getter
    // ==================================================

    getId() {

        return this.id;

    }

    getTeam() {

        return this.team;

    }

    getHalf() {

        return this.half;

    }

    getTime() {

        return this.time;

    }

    getElapsedSeconds() {

        return this.elapsedSeconds;

    }

    getPlayer() {

        return this.player;

    }

    getPosition() {

        return this.position;

    }

    getShot() {

        return this.shot;

    }

    getMemo() {

        return this.memo;

    }

    // ==================================================
    // Setter
    // ==================================================

    setMemo(memo) {

        this.memo = memo;

    }

    // ==================================================
    // JSON
    // ==================================================

    toJSON() {

        return {

            id: this.id,

            team: this.team,

            half: this.half,

            time: this.time,

            elapsedSeconds: this.elapsedSeconds,

            player: this.player,

            position: this.position,

            shot: this.shot,

            memo: this.memo

        };

    }

    static fromJSON(data) {

        return new MatchEvent({

            id: data.id,

            team: data.team,

            half: data.half,

            time: data.time,

            elapsedSeconds: data.elapsedSeconds,

            player: data.player,

            position: data.position,

            shot: data.shot,

            memo: data.memo

        });

    }

}
