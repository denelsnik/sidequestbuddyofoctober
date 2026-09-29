// ========================================
// SIDEQUEST BUDDY
// Interactive Invitation
// ========================================


// ========================================
// PLAYER
// ========================================

const guestName = "Alexandru";
// ========================================
// GOOGLE SHEETS TRACKING
// ========================================

const trackingURL =
    "https://script.google.com/macros/s/AKfycbwYHnyQVScslbErJIS5bYo9jJHB82c-puRM_RLDO79uLBmawzlGu937bB3_zU-qj2yC/exec";


const sessionId =
    crypto.randomUUID();


function trackEvent(action, selection = "", result = "") {

    fetch(trackingURL, {

        method: "POST",

        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        },

        body: JSON.stringify({

            sessionId: sessionId,

            player: guestName,

            action: action,

            selection: selection,

            result: result

        })

    })
    .catch(error => {

        console.error(
            "Tracking error:",
            error
        );

    });

}

document.getElementById("guestName").textContent = guestName;


// ========================================
// SCREEN HELPER
// ========================================

function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.add("hidden");
    });

    document
        .getElementById(screenId)
        .classList.remove("hidden");
}


// ========================================
// START QUEST
// ========================================

function acceptQuest() {

    trackEvent(
        "Quest",
        "ACCEPT QUEST",
        "ACCEPTED"
    );

    showScreen("yesScreen");

}


// ========================================
// DECLINE QUEST
// ========================================

function rejectQuest() {

    showScreen("noScreen");

}


// ========================================
// TRY AGAIN
// ========================================

function resetQuest() {

    showScreen("mainChoices");

}


// ========================================
// START QUIZ
// ========================================

function startQuiz() {

    showScreen("question1");

}


// ========================================
// QUESTION 1
// ========================================

function answerQuestion1(correct) {

    const feedback =
        document.getElementById("question1Feedback");


    if (correct) {

        feedback.textContent =
            "> CORRECT. Proceeding...";

        feedback.className =
            "quiz-feedback correct";

        setTimeout(() => {

            showScreen("question2");

        }, 700);

    } else {

        feedback.textContent =
            "> INCORRECT. Try again, genius.";

        feedback.className =
            "quiz-feedback incorrect";

    }

}


// ========================================
// QUESTION 2
// ========================================

function answerQuestion2(correct) {

    const feedback =
        document.getElementById("question2Feedback");


    if (correct) {

        feedback.textContent =
            "> CORRECT. Compatibility confirmed.";

        feedback.className =
            "quiz-feedback correct";

        setTimeout(() => {

            showScreen("passedScreen");

        }, 800);

    } else {

        feedback.textContent =
            "> INCORRECT. Think harder.";

        feedback.className =
            "quiz-feedback incorrect";

    }

}


// ========================================
// SHOW SIDEQUESTS
// ========================================

function showSidequests() {

    showScreen("sidequestScreen");

}


// ========================================
// CHOOSE SIDEQUEST
// ========================================

function chooseActivity(activity) {

    document.getElementById(
        "selectedActivity"
    ).textContent = activity;

    showScreen("resultScreen");

}
