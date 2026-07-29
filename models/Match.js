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

        // ==================================================
    // Clear
    // ==================================================

    clearEvents() {

        this.events = [];

    }

    // ==================================================
    // Count
    // ==================================================

    getEventCount() {

        return this.events.length;

    }

    // ==================================================
    // Last Event
    // ==================================================

    getLastEvent() {

        if (this.events.length === 0) {

            return null;

        }

        return this.events[this.events.length - 1];

    }

    // ==================================================
    // JSON
    // ==================================================

    toJSON() {

        return {

            id: this.id,

            date: this.date,

            opponent: this.opponent,

            events: this.events

        };

    }

    static fromJSON(data) {

        const match = new Match({

            id: data.id,

            date: data.date,

            opponent: data.opponent

        });

        match.events = data.events || [];

        return match;

    }

}
