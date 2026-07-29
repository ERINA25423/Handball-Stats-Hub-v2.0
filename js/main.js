"use strict";

/* ==========================================
   Handball Stats Hub
   main.js
========================================== */

const App = {

    currentPage: "homePage",

    pages: {},

    init() {

        this.cachePages();

        this.bindEvents();

        this.showPage("homePage");

    },

    cachePages() {

        document
            .querySelectorAll(".page")
            .forEach(page => {

                this.pages[page.id] = page;

            });

    },

    showPage(pageId) {

        Object.values(this.pages)
            .forEach(page => {

                page.classList.remove("active");

            });

        this.pages[pageId]
            .classList.add("active");

        this.currentPage = pageId;

        window.scrollTo({

            top:0,

            behavior:"instant"

        });

    },

    bindEvents() {

        /* ==========================
           HOME
        ========================== */

        document
            .getElementById("newMatchButton")
            .addEventListener("click", () => {

                this.showPage("newMatchPage");

            });

        document
            .getElementById("historyPageButton")
            .addEventListener("click", () => {

                this.showPage("historyPage");

            });

        /* ==========================
           BACK
        ========================== */

        document
            .getElementById("backHomeButton")
            .addEventListener("click", () => {

                this.showPage("homePage");

            });

        document
            .getElementById("historyBackButton")
            .addEventListener("click", () => {

                this.showPage("homePage");

            });

        document
            .getElementById("analysisBackButton")
            .addEventListener("click", () => {

                this.showPage("historyPage");

            });

    }

};

document.addEventListener("DOMContentLoaded", () => {

    App.init();

});

/* ==========================================
   NEW MATCH
========================================== */

document
    .getElementById("startMatchButton")
    .addEventListener("click", () => {

        const match = {

            date:
                document.getElementById("matchDate").value,

            competition:
                document.getElementById("competition").value,

            venue:
                document.getElementById("venue").value,

            ourTeam:
                document.getElementById("ourTeam").value,

            opponent:
                document.getElementById("opponent").value

        };

        localStorage.setItem(

            "currentMatch",

            JSON.stringify(match)

        );

        App.showPage("gamePage");

    });

/* ==========================================
   TEAM SWITCH
========================================== */

const ourSideButton =
document.getElementById("ourSideButton");

const opponentSideButton =
document.getElementById("opponentSideButton");

ourSideButton.addEventListener("click", () => {

    ourSideButton.classList.add("active");

    opponentSideButton.classList.remove("active");

});

opponentSideButton.addEventListener("click", () => {

    opponentSideButton.classList.add("active");

    ourSideButton.classList.remove("active");

});

/* ==========================================
   POSITION
========================================== */

const positionButtons =
document.querySelectorAll(".positionButton");

positionButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        positionButtons.forEach(b=>{

            b.classList.remove("selected");

        });

        button.classList.add("selected");

    });

});

/* ==========================================
   SHOT COURSE
========================================== */

const shotButtons =
document.querySelectorAll(".shotCell");

shotButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        shotButtons.forEach(b=>{

            b.classList.remove("selected");

        });

        button.classList.add("selected");

    });

});

/* ==========================================
   SHOT TYPE
========================================== */

const typeButtons =
document.querySelectorAll(".typeButton");

typeButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        typeButtons.forEach(b=>{

            b.classList.remove("selected");

        });

        button.classList.add("selected");

    });

});

/* ==========================================
   RESULT
========================================== */

const resultButtons =
document.querySelectorAll(".resultButton");

resultButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        resultButtons.forEach(b=>{

            b.classList.remove("selected");

        });

        button.classList.add("selected");

    });

});

/* ==========================================
   SAVE EVENT
========================================== */

const eventHistory = [];

document
.getElementById("saveEventButton")
.addEventListener("click",()=>{

    const event={

        team:
        document.querySelector(".teamButton.active")?.textContent,

        position:
        document.querySelector(".positionButton.selected")?.textContent,

        course:
        document.querySelector(".shotCell.selected")?.textContent,

        type:
        document.querySelector(".typeButton.selected")?.textContent,

        result:
        document.querySelector(".resultButton.selected")?.textContent,

        memo:
        document.getElementById("memo").value,

        time:
        document.getElementById("gameTimer").textContent

    };

    eventHistory.push(event);

    console.log(eventHistory);

    clearSelections();

});


/* ==========================================
   CLEAR SELECTIONS
========================================== */

function clearSelections(){

    document
        .querySelectorAll(".positionButton")
        .forEach(button=>{

            button.classList.remove("selected");

        });

    document
        .querySelectorAll(".shotCell")
        .forEach(button=>{

            button.classList.remove("selected");

        });

    document
        .querySelectorAll(".typeButton")
        .forEach(button=>{

            button.classList.remove("selected");

        });

    document
        .querySelectorAll(".resultButton")
        .forEach(button=>{

            button.classList.remove("selected");

        });

    document
        .getElementById("memo").value="";

}

/* ==========================================
   UNDO
========================================== */

document
    .getElementById("undoButton")
    .addEventListener("click",()=>{

        if(eventHistory.length===0){

            return;

        }

        eventHistory.pop();

        console.log(eventHistory);

    });

/* ==========================================
   HISTORY
========================================== */

document
    .getElementById("historyButton")
    .addEventListener("click",()=>{

        renderHistory();

        App.showPage("historyPage");

    });

function renderHistory(){

    const list=
    document.getElementById("historyList");

    list.innerHTML="";

    if(eventHistory.length===0){

        list.innerHTML=`

        <div class="emptyState">

            <h3>No Events</h3>

            <p>

                No events have been saved yet.

            </p>

        </div>

        `;

        return;

    }

    eventHistory.forEach((event,index)=>{

        const card=document.createElement("div");

        card.className="historyCard";

        card.innerHTML=`

        <h3>Event ${index+1}</h3>

        <p><strong>Time:</strong> ${event.time}</p>

        <p><strong>Team:</strong> ${event.team}</p>

        <p><strong>Position:</strong> ${event.position}</p>

        <p><strong>Course:</strong> ${event.course}</p>

        <p><strong>Type:</strong> ${event.type}</p>

        <p><strong>Result:</strong> ${event.result}</p>

        `;

        list.appendChild(card);

    });

}

/* ==========================================
   ANALYSIS
========================================== */

document
    .querySelectorAll(".historyCard")
    .forEach(card => {

        card.addEventListener("click", () => {

            App.showPage("analysisPage");

            updateAnalysis();

        });

    });

function updateAnalysis(){

    const shots = eventHistory.length;

    const goals = eventHistory.filter(

        e => e.result === "GOAL"

    ).length;

    const saves = eventHistory.filter(

        e => e.result === "SAVE"

    ).length;

    const misses = eventHistory.filter(

        e => e.result === "MISS"

    ).length;

    const blocks = eventHistory.filter(

        e => e.result === "BLOCK"

    ).length;

    document.getElementById("totalShots").textContent =
        shots;

    document.getElementById("totalGoals").textContent =
        goals;

    document.getElementById("shotPercentage").textContent =
        shots === 0
            ? "0%"
            : Math.round(goals / shots * 100) + "%";

    document.getElementById("mistakeCount").textContent =
        misses + blocks;

    document.getElementById("attackPercentage").textContent =
        "0%";

    document.getElementById("fastBreakPercentage").textContent =
        "0%";

    document.getElementById("setPercentage").textContent =
        "0%";

    document.getElementById("turnoverRate").textContent =
        "0%";

    document.getElementById("gkShots").textContent =
        shots;

    document.getElementById("gkSaves").textContent =
        saves;

    document.getElementById("gkGoals").textContent =
        goals;

    document.getElementById("gkSaveRate").textContent =
        shots === 0
            ? "0%"
            : Math.round(saves / shots * 100) + "%";

}

/* ==========================================
   TAB SWITCH
========================================== */

document
.querySelectorAll(".tabButton")
.forEach(button=>{

    button.addEventListener("click",()=>{

        document
        .querySelectorAll(".tabButton")
        .forEach(b=>{

            b.classList.remove("active");

        });

        button.classList.add("active");

        document
        .querySelectorAll(".tabContent")
        .forEach(tab=>{

            tab.classList.remove("active");

        });

        document
        .getElementById(

            button.dataset.tab + "Tab"

        ).classList.add("active");

    });

});

/* ==========================================
   END MATCH
========================================== */

document
.getElementById("finishMatchButton")
.addEventListener("click",()=>{

    if(confirm("試合を終了して保存しますか？")){

        localStorage.setItem(

            "matchHistory",

            JSON.stringify(eventHistory)

        );

        App.showPage("homePage");

    }

});

/* ==========================================
   END OF MAIN.JS
========================================== */


/* =====================================
   GAME UI SELECT
===================================== */

let selectedPosition = null;
let selectedCourse = null;
let selectedShotType = null;
let selectedResult = null;

/* ---------- POSITION ---------- */

document.querySelectorAll(".positionButton").forEach(button=>{

    button.addEventListener("click",()=>{

        document.querySelectorAll(".positionButton")
            .forEach(b=>b.classList.remove("active"));

        button.classList.add("active");

        selectedPosition =
            button.querySelector(".positionName").textContent;

    });

});

/* ---------- COURSE ---------- */

document.querySelectorAll(".courseButton").forEach(button=>{

    button.addEventListener("click",()=>{

        document.querySelectorAll(".courseButton")
            .forEach(b=>b.classList.remove("active"));

        button.classList.add("active");

        selectedCourse =
            button.textContent.trim();

    });

});

/* ---------- SHOT TYPE ---------- */

document.querySelectorAll(".shotTypeButton").forEach(button=>{

    button.addEventListener("click",()=>{

        document.querySelectorAll(".shotTypeButton")
            .forEach(b=>b.classList.remove("active"));

        button.classList.add("active");

        selectedShotType =
            button.textContent.trim();

    });

});

/* ---------- RESULT ---------- */

document.querySelectorAll(".resultButton").forEach(button=>{

    button.addEventListener("click",()=>{

        document.querySelectorAll(".resultButton")
            .forEach(b=>b.classList.remove("active"));

        button.classList.add("active");

        selectedResult =
            button.textContent.trim();

    });

});

/* =====================================
   SAVE EVENT
===================================== */

document
    .getElementById("saveEventButton")
    .addEventListener("click", saveCurrentEvent);

function saveCurrentEvent() {

    if (!selectedPosition) {
        alert("Select a position.");
        return;
    }

    if (!selectedCourse) {
        alert("Select a shot course.");
        return;
    }

    if (!selectedShotType) {
        alert("Select a shot type.");
        return;
    }

    if (!selectedResult) {
        alert("Select a result.");
        return;
    }

    const playerNumber =
        document
            .querySelector(".positionButton.active .playerNumber")
            ?.value || "";

    const eventData = {

        team:
            document
                .getElementById("ourSideButton")
                .classList.contains("active")
                ? "MY TEAM"
                : "OPPONENT",

        half:
            document
                .getElementById("currentHalf")
                .textContent,

        time:
            document
                .getElementById("gameTimer")
                .textContent,

        position: selectedPosition,

        player: playerNumber,

        course: selectedCourse,

        shotType: selectedShotType,

        result: selectedResult,

        memo:
            document
                .getElementById("memo")
                .value

    };

    console.log(eventData);

    if (typeof saveEvent === "function") {

        saveEvent(eventData);

    } else {

        eventHistory.push(eventData);

        if (typeof renderHistory === "function") {
            renderHistory();
        }

    }

    clearSelection();

}

/* =====================================
   TEAM SWITCH
===================================== */

const myTeamButton = document.getElementById("ourSideButton");
const opponentButton = document.getElementById("opponentSideButton");

myTeamButton.addEventListener("click", () => {

    myTeamButton.classList.add("active");
    opponentButton.classList.remove("active");

});

opponentButton.addEventListener("click", () => {

    opponentButton.classList.add("active");
    myTeamButton.classList.remove("active");

});

/* =====================================
   CHANGE HALF
===================================== */

const halfButton = document.getElementById("halfButton");

halfButton.addEventListener("click", () => {

    const halfLabel = document.getElementById("currentHalf");

    if (halfLabel.textContent === "1st Half") {

        halfLabel.textContent = "2nd Half";

    } else {

        halfLabel.textContent = "1st Half";

    }

});

/* =====================================
   HISTORY
===================================== */

const historyButton = document.getElementById("historyButton");

historyButton.addEventListener("click", () => {

    if (typeof showHistoryPage === "function") {

        showHistoryPage();
        return;

    }

    if (typeof App !== "undefined" && App.showPage) {

        App.showPage("historyPage");
        return;

    }

    const historyPage = document.getElementById("historyPage");

    if (historyPage) {

        document
            .querySelectorAll(".page")
            .forEach(page => page.classList.remove("active"));

        historyPage.classList.add("active");

    }

});

/* =====================================
   END MATCH
===================================== */

const finishButton = document.getElementById("finishMatchButton");

finishButton.addEventListener("click", () => {

    if (!confirm("End this match and save?")) {

        return;

    }

    if (typeof finishMatch === "function") {

        finishMatch();
        return;

    }

    if (typeof saveCurrentMatch === "function") {

        saveCurrentMatch();

    }

});
