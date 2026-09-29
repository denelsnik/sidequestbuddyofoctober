// ========================================
// SIDEQUEST BUDDY
// Interactive Invitation
// ========================================


// ========================================
// PLAYER
// ========================================

const guestName = "Alexandru";

document.getElementById("guestName").textContent = guestName;


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


// ========================================
// SCREEN HELPER
// ========================================

function showScreen(screenId) {

    const screens =
        document.querySelectorAll(".screen");

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

    trackEvent(
        "Quest",
        "DECLINE QUEST",
        "DECLINED"
    );

    showScreen("noScreen");

}


// ========================================
// TRY AGAIN
// ========================================

function resetQuest() {

    trackEvent(
        "Quest",
        "TRY AGAIN",
        "RETRY"
    );

    showScreen("mainChoices");

}


// ========================================
// START QUIZ
// ========================================

function startQuiz() {

    trackEvent(
        "Quiz",
        "BEGIN TEST",
        "STARTED"
    );

    showScreen("question1");

}


// ========================================
// QUESTION 1
// ========================================

function answerQuestion1(correct, selectedAnswer) {

    const feedback =
        document.getElementById("question1Feedback");


    trackEvent(
        "Question 1",
        selectedAnswer,
        correct ? "CORRECT" : "INCORRECT"
    );


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

function answerQuestion2(correct, selectedAnswer) {

    const feedback =
        document.getElementById("question2Feedback");


    trackEvent(
        "Question 2",
        selectedAnswer,
        correct ? "CORRECT" : "INCORRECT"
    );


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

    trackEvent(
        "Sidequests",
        "ACCESS SIDEQUESTS",
        "OPENED"
    );

    showScreen("sidequestScreen");

}


// ========================================
// CHOOSE SIDEQUEST
// ========================================

function chooseActivity(activity) {

    trackEvent(
        "Sidequest",
        activity,
        "SELECTED"
    );


    document.getElementById(
        "selectedActivity"
    ).textContent = activity;


    showScreen("resultScreen");

}
