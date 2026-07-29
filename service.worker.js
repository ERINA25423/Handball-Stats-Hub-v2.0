// =======================================================
// Handball Stats Hub v2
// service-worker.js
// =======================================================

"use strict";

// =======================================================
// Cache
// =======================================================

const CACHE_NAME = "handball-stats-hub-v2";

const FILES_TO_CACHE = [

    "./",

    "./index.html",

    "./style.css",

    "./manifest.json",

    "./js/main.js",

    "./js/ui.js",

    "./js/game.js",

    "./js/timer.js",

    "./js/storage.js",

    "./js/analysis.js",

    "./js/firebase.js",

    "./models/Player.js",

    "./models/Team.js",

    "./models/Match.js",

    "./models/MatchEvent.js",

    "./models/Shot.js"

];

// =======================================================
// Install
// =======================================================

self.addEventListener("install", (event) => {

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(cache => cache.addAll(FILES_TO_CACHE))

    );

    self.skipWaiting();

});

// =======================================================
// Activate
// =======================================================

self.addEventListener("activate", (event) => {

    event.waitUntil(

        caches.keys().then(keys =>

            Promise.all(

                keys.map(key => {

                    if (key !== CACHE_NAME) {

                        return caches.delete(key);

                    }

                })

            )

        )

    );

    self.clients.claim();

});

// =======================================================
// Fetch
// =======================================================

self.addEventListener("fetch", (event) => {

    event.respondWith(

        caches.match(event.request)

            .then(response => {

                if (response) {

                    return response;

                }

                return fetch(event.request);

            })

    );

});

// =======================================================
// Message
// =======================================================

self.addEventListener("message", (event) => {

    if (event.data === "skipWaiting") {

        self.skipWaiting();

    }

});

console.log("service-worker loaded");
