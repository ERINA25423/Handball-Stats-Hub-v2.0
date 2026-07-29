// ======================================================
// Shot.js
// ======================================================

"use strict";

class Shot {

    constructor({

        course,

        type,

        result

    }) {

        this.course = course;

        this.type = type;

        this.result = result;

    }

    // ==================================================
    // Getter
    // ==================================================

    getCourse() {

        return this.course;

    }

    getType() {

        return this.type;

    }

    getResult() {

        return this.result;

    }

    // ==================================================
    // Setter
    // ==================================================

    setCourse(course) {

        this.course = course;

    }

    setType(type) {

        this.type = type;

    }

    setResult(result) {

        this.result = result;

    }

    // ==================================================
    // JSON
    // ==================================================

    toJSON() {

        return {

            course: this.course,

            type: this.type,

            result: this.result

        };

    }

    static fromJSON(data) {

        return new Shot({

            course: data.course,

            type: data.type,

            result: data.result

        });

    }

}
