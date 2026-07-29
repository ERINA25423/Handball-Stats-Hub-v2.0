// ======================================================
// Handball Stats Hub v2
// models/Team.js
// ======================================================

"use strict";

class Team {

    constructor(data = {}) {

        this.id = data.id || crypto.randomUUID();

        this.name = data.name || "";

        this.side = data.side || "my"; // "my" or "opponent"

        this.players = Array.isArray(data.players)
            ? [...data.players]
            : [];

        this.createdAt = data.createdAt || new Date().toISOString();

        this.updatedAt = data.updatedAt || new Date().toISOString();

    }

    // ==================================================
    // Team Name
    // ==================================================

    setName(name) {

        this.name = String(name).trim();

        this.touch();

    }

    getName() {

        return this.name;

    }

    // ==================================================
    // Side
    // ==================================================

    setSide(side) {

        if (side === "my" || side === "opponent") {

            this.side = side;

            this.touch();

        }

    }

    getSide() {

        return this.side;

    }

    // ==================================================
    // Players
    // ==================================================

    addPlayer(player) {

        this.players.push(player);

        this.touch();

    }

    removePlayer(playerId) {

        this.players = this.players.filter(

            player => player.id !== playerId

        );

        this.touch();

    }

    getPlayer(playerId) {

        return this.players.find(

            player => player.id === playerId

        ) || null;

    }

    getPlayers() {

        return [...this.players];

    }

    clearPlayers() {

        this.players = [];

        this.touch();

    }

    getPlayerCount() {

        return this.players.length;

    }

    // ==================================================
    // Timestamp
    // ==================================================

    touch() {

        this.updatedAt = new Date().toISOString();

    }

    // ==================================================
    // JSON
    // ==================================================

    toJSON() {

        return {

            id: this.id,

            name: this.name,

            side: this.side,

            players: this.players,

            createdAt: this.createdAt,

            updatedAt: this.updatedAt

        };

    }

    static fromJSON(data) {

        return new Team(data);

    }

}
