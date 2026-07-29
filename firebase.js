// ======================================================
// firebase.js
// ======================================================

"use strict";

// ======================================================
// Firebase Config
// ======================================================

const firebaseConfig = {

    apiKey: "",

    authDomain: "",

    projectId: "",

    storageBucket: "",

    messagingSenderId: "",

    appId: ""

};

// ======================================================
// Firebase
// ======================================================

const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = firebase.firestore();

// ======================================================
// Initialize
// ======================================================

function initializeFirebase() {

    console.log("Firebase initialized");

}

// ======================================================
// Current User
// ======================================================

function getCurrentUser() {

    return auth.currentUser;

}

// ======================================================
// Auth State
// ======================================================

function observeAuthState(callback) {

    auth.onAuthStateChanged(callback);

}

// ======================================================
// Google Login
// ======================================================

async function signInWithGoogle() {

    const provider =

        new firebase.auth.GoogleAuthProvider();

    try {

        const result =

            await auth.signInWithPopup(

                provider

            );

        return result.user;

    }

    catch (error) {

        console.error(error);

        return null;

    }

}

// ======================================================
// Logout
// ======================================================

async function signOutUser() {

    try {

        await auth.signOut();

    }

    catch (error) {

        console.error(error);

    }

}

// ======================================================
// Save Match
// ======================================================

async function saveMatchToFirebase(match) {

    const user = getCurrentUser();

    if (!user || !match) {

        return false;

    }

    try {

        await db

            .collection("users")

            .doc(user.uid)

            .collection("matches")

            .doc(match.id)

            .set(match.toJSON());

        return true;

    }

    catch (error) {

        console.error(error);

        return false;

    }

}

// ======================================================
// Load Matches
// ======================================================

async function loadMatchesFromFirebase() {

    const user = getCurrentUser();

    if (!user) {

        return [];

    }

    try {

        const snapshot = await db

            .collection("users")

            .doc(user.uid)

            .collection("matches")

            .orderBy("date", "desc")

            .get();

        return snapshot.docs.map(doc =>

            Match.fromJSON(doc.data())

        );

    }

    catch (error) {

        console.error(error);

        return [];

    }

}

// ======================================================
// Delete Match
// ======================================================

async function deleteMatchFromFirebase(matchId) {

    const user = getCurrentUser();

    if (!user) {

        return;

    }

    try {

        await db

            .collection("users")

            .doc(user.uid)

            .collection("matches")

            .doc(matchId)

            .delete();

    }

    catch (error) {

        console.error(error);

    }

}

// ======================================================
// Sync Current Match
// ======================================================

async function syncMatchToFirebase(match) {

    if (!match) {

        return;

    }

    await saveMatchToFirebase(match);

}

// ======================================================
// User Matches Count
// ======================================================

async function getCloudMatchCount() {

    const matches =

        await loadMatchesFromFirebase();

    return matches.length;

}

// ======================================================
// Connection
// ======================================================

async function checkFirebaseConnection() {

    try {

        await db.collection("health").limit(1).get();

        return true;

    }

    catch (error) {

        console.error(error);

        return false;

    }

}

// ======================================================
// Auto Sync
// ======================================================

async function autoSync(match) {

    if (!navigator.onLine) {

        console.log("Offline");

        return false;

    }

    return await syncMatchToFirebase(match);

}

// ======================================================
// Online / Offline
// ======================================================

window.addEventListener(

    "online",

    () => {

        console.log("Online");

    }

);

window.addEventListener(

    "offline",

    () => {

        console.log("Offline");

    }

);

// ======================================================
// Firestore Timestamp
// ======================================================

function serverTimestamp() {

    return firebase.firestore.FieldValue.serverTimestamp();

}

// ======================================================
// Public API
// ======================================================

window.FirebaseManager = {

    initializeFirebase,

    getCurrentUser,

    observeAuthState,

    signInWithGoogle,

    signOutUser,

    saveMatchToFirebase,

    loadMatchesFromFirebase,

    deleteMatchFromFirebase,

    syncMatchToFirebase,

    autoSync,

    getCloudMatchCount,

    checkFirebaseConnection,

    serverTimestamp

};

// ======================================================
// Initialize
// ======================================================

document.addEventListener(

    "DOMContentLoaded",

    () => {

        initializeFirebase();

    }

);

// ======================================================
// Ready
// ======================================================

console.log(

    "firebase.js loaded"

);
