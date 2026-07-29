// ======================================================
// Player.js
// ======================================================

class Player {

    constructor({

        id,

        number,

        name = "",

        position = ""

    }) {

        this.id = id;

        this.number = number;

        this.name = name;

        this.position = position;

    }
    // ==================================================
    // Getter
    // ==================================================

    getId() {

        return this.id;

    }

    getNumber() {

        return this.number;

    }

    getName() {

        return this.name;

    }

    getPosition() {

        return this.position;

    }

    // ==================================================
    // Setter
    // ==================================================

    setNumber(number) {

        this.number = number;

    }

    setName(name) {

        this.name = name;

    }

    setPosition(position) {

        this.position = position;

    }

    // ==================================================
    // JSON
    // ==================================================

    toJSON() {

        return {

            id: this.id,

            number: this.number,

            name: this.name,

            position: this.position

        };

    }

    static fromJSON(data) {

        return new Player(data);

    }

}
