// ======================================================
// MatchEvent.js
// ======================================================

class MatchEvent {

    constructor({

        id,

        team,

        half,

        time,

        elapsedSeconds,

        player,

        shot,

        memo = ""

    }) {

        this.id = id;

        this.team = team;

        this.half = half;

        this.time = time;

        this.elapsedSeconds = elapsedSeconds;

        this.player = player;

        this.shot = shot;

        this.memo = memo;

    }

}

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
