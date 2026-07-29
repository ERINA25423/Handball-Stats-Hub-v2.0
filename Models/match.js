// ======================================================
// Match.js
// ======================================================

class Match {

    constructor({

        id,

        date,

        opponent

    }) {

        this.id = id;

        this.date = date;

        this.opponent = opponent;

        this.events = [];

    }

    addEvent(event) {

        this.events.push(event);

    }

    undo() {

        this.events.pop();

    }

    getEvents() {

        return this.events;

    }

}
