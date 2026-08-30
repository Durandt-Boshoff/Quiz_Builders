// PART 1: QUIZ QUESTIONS
// Stores all quiz questions and their information.
// These are temporary questions for testing the quiz logic.

const questions = [
    {
        id: 1,
        topic: "JavaScript",
        difficulty: "easy",
        question: "Which keyword is used to declare a variable that can be reassigned?",
        options: ["const", "let", "var", "static"],
        correctAnswer: "let"
    },
    {
        id: 2,
        topic: "JavaScript",
        difficulty: "medium",
        question: "Which method converts a JSON string into a JavaScript object?",
        options: [
            "JSON.stringify()",
            "JSON.parse()",
            "JSON.convert()",
            "JSON.object()"
        ],
        correctAnswer: "JSON.parse()"
    },
    {
        id: 3,
        topic: "JavaScript",
        difficulty: "hard",
        question: "Which array method creates a new array containing elements that pass a test?",
        options: [
            "forEach()",
            "filter()",
            "push()",
            "find()"
        ],
        correctAnswer: "filter()"
    },
];

// PART 2: QUIZ CLASS / OOP
// The Quiz class manages the quiz state and the behaviour.
// It keeps track of questions, score, answers and progress

class Quiz {

    constructor(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.allQuestions = questions;
        this.score = 0;
        this.selectedAnswers = [];
        this.isQuizComplete = false;

        //Timer setting for each question.
        this.timeRemaining = 30;
        this.timer = null;
    }

    // PART 3: ANSWER & SCORING LOGIC

    // Returns the question currently being displayed.
    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }


    // Stores the user's selected answer for the current question.
   selectAnswer(answer) {
   this.selectAnswer(answer); [this.currentQuestionIndex] = answer;
}

    // Checks whether the selected answer is correct.
    // The score is recalculated to prevent the same question
    // from being counted more than once.
    checkAnswer(answer) {
        this.selectedAnswers(answer);
        this.calculateScore();

        const currentQuestion = this.getCurrentQuestion();

        return answer === currentQuestion.correctAnswer;
    }


    // Calculates the total score based on all selected answers.
    calculateScore() {
        this.score = 0;

        this.questions.forEach((question, index) => {
            if (this.selectedAnswers[index] === question.correctAnswer) {
                this.score++;
            }
        });

        return this.score;
    }

    
    // Returns the user's current score.
    getScored() {
        return this.score;
    }


    // Return the number of the questions the user has answered.
    getAnsweredCount() {
        return this.selectedAnswers.filter(
            answer => answer !== undefined
        ).length;
    }


    // Calculates the user's final percentage.
    getPercentage() {
        return Math.round((this.score / this.questions.length) * 100);
    }

    // PART 4: QUIZ NAVIGATION

    // Moves to the next question.
    // If the user is on the final question, the quiz is completed.
    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;

            //Restart the timer for the new question.
           this.startTimer();
        } else {
            this.completeQuiz();
        }
    }


    // Moves back to the previous question.
    // The index cannot go below zero.
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            //Restart the timer for the new question.
            this.startTimer();
        }
    }


    // Checks whether the current question is the first question.
    isFirstQuestion() {
        return this.currentQuestionIndex === 0;
    }


    // Checks whether the current question is the last question.
    isLastQuestion() {
        return this.currentQuestionIndex === this.questions.length - 1;
    }


    // Returns the current quiz progress
    // Example: 1/10, 2/10, 3/10.
    getProgress() {
        return `${this.currentQuestionIndex + 1} / ${this.questions.length}`;
    }


    // Marks the quiz as completed and calculate the final score.
    completeQuiz() {
        // Stop the timer when quiz ends.
        this.stopTimer();

        // Calculate the final score.
        this.calculateScore();

        // Mark the quiz as completed.
        this.isQuizComplete = true;
    }


    //Reset the quiz so the user can start again.
    resetQuiz() {
        // Stop the current timer.
        this.stopTimer();

        //Reset the quiz back to the beginnig.
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswers = [];
        this.isQuizComplete = false;
        this.timeRemaining = 30;
    }

    // PART 5: PER QUESTION TIMER.
    
    // Sets the amount of time available for each question.
    startTimer() {
        // Stop any existing timer before starting a new one.
        this.stopTimer();

        // Give the user 30s for the current question.
        this.timeRemaining = 30;

        // Start the countdown.
        this.timer = setInterval(() => {
            this.timeRemaining--;

            // When the timer reaches zero, stop the timer
            // and automatically move to the next question.
            if (this.timeRemaining <= 0) {
                this.startTimer();
                this.nextQuestion();
            }
        }, 1000);
    }

    // Stops the current countdown.
    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    // Returns the amount of time remaining
    getTimeRemaining() {
        return this.timeRemaining;
    }

    // PART 6: LEADERBOARD / LOCAL STORAGE

    // Saves the user's quiz result.
    savedResult(playerName) {
        // Get existing results from local storage.
        const leaderboard = JSON.parse(
            localStorage.getItem("quizLeaderboard")
        ) || [];

        // Create an object containing the quiz result.
        const result = {
            playerName: playerName,
            score: this.getScored(),
            totalQuestions: this.questions.length,
            percentage: this.getPercentage(),
            date: new Date().toLocaleDateString()
        };

        // Add the new result to the leaderboard
        leaderboard.push(result);

        // Sort results from highest score to lowest score.
        leaderboard.sort((a, b) => b.score - a.score);

        // Save the updated leaderboard.
        localStorage.setItem(
            "quizLeaderboard",
            JSON.stringify(leaderboard)
        );
    }

    // Gets all saved leaderboard results.
    getLeaderboard() {
        return JSON.parse(
            localStorage.getItem("quizLeaderboard")
        ) || [];
    }

    // Clear all saved leaderboard results.
    clearLeaderboard() {
        localStorage.removeItem("quizLeaderboard");
    }

    // PART 7: DIFFICULTY LEVELS

    // Filter the questions based on the selected difficulty.
    filterByDifficulty(difficulty) {
        // If "all" is selected, return all original questions.
        if (difficulty === "all") {
            return this.allQuestions;
        }

        // Filter the original questions by difficulty.
        return this.allQuestions.filter(
            question => question.difficulty === difficulty
        );
    }

    //Changes the questions used by the quiz
    // based on the selected difficulty.
    setDifficulty(difficulty) {
        // Stop any existing timer.
        this.stopTimer();

        // Change the questions based on the selected difficulty.
        this.questions = this.filterByDifficulty(difficulty);

        // Reset the quiz so it starts from the first question.
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswers = [];
        this.isQuizComplete = false;
    }
}


// Create a Quiz object using questions array.
const quiz = new Quiz(questions);
// =============================================
// SCREEN / USER INTERFACE CONNECTION
// Connects the Quiz class to the HTML screens
// =============================================


// -----------------------------
// SCREEN ELEMENTS
// -----------------------------

const instructionsScreen =
    document.getElementById("instructions-screen");

const quizScreen =
    document.getElementById("quiz-screen");

const resultsScreen =
    document.getElementById("results-screen");


// -----------------------------
// BUTTONS
// -----------------------------

const startBtn =
    document.getElementById("start-btn");

const previousBtn =
    document.getElementById("previous-btn");

const nextBtn =
    document.getElementById("next-btn");

const finishBtn =
    document.getElementById("finish-btn");

const retakeBtn =
    document.getElementById("retake-btn");

const newTopicBtn =
    document.getElementById("new-topic-btn");


// -----------------------------
// QUESTION DISPLAY ELEMENTS
// -----------------------------

const questionText =
    document.getElementById("question-text");

const answerOptionsContainer =
    document.getElementById("answer-options");

const questionProgress =
    document.getElementById("question-progress");

const progressPercent =
    document.getElementById("progress-percent");

const progressFill =
    document.getElementById("progress-fill");

const currentQuestionNumber =
    document.getElementById("current-question-number");

const questionNavigator =
    document.getElementById("question-navigator");

const timerDisplay =
    document.getElementById("timer");


// -----------------------------
// RESULTS ELEMENTS
// -----------------------------

const percentageDisplay =
    document.getElementById("percentage");

const finalScore =
    document.getElementById("final-score");

const totalQuestions =
    document.getElementById("total-questions");

const correctCount =
    document.getElementById("correct-count");

const incorrectCount =
    document.getElementById("incorrect-count");

const unansweredCount =
    document.getElementById("unanswered-count");

const reviewContainer =
    document.getElementById("review-container");


// =============================================
// SHOW A SPECIFIC SCREEN
// =============================================

function showScreen(screen) {

    instructionsScreen.classList.remove("active");
    quizScreen.classList.remove("active");
    resultsScreen.classList.remove("active");

    screen.classList.add("active");
}


// =============================================
// CREATE QUESTION NAVIGATOR
// =============================================

function createQuestionNavigator() {

    questionNavigator.innerHTML = "";

    quiz.questions.forEach((question, index) => {

        const button = document.createElement("button");

        button.classList.add("nav-number");

        button.textContent = index + 1;

        if (index === quiz.currentQuestionIndex) {
            button.classList.add("current");
        }

        if (quiz.selectedAnswers[index] !== undefined) {
            button.classList.add("answered");
        }

        button.addEventListener("click", function () {

            quiz.currentQuestionIndex = index;

            quiz.startTimer();

            displayQuestion();

        });

        questionNavigator.appendChild(button);
    });
}


// =============================================
// DISPLAY CURRENT QUESTION
// =============================================

function displayQuestion() {

    const currentQuestion =
        quiz.getCurrentQuestion();

    if (!currentQuestion) {
        return;
    }


    // Display question text
    questionText.textContent =
        currentQuestion.question;


    // Question number
    currentQuestionNumber.textContent =
        quiz.currentQuestionIndex + 1;


    // Question progress
    questionProgress.textContent =
        `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`;


    // Progress percentage
    const progress =
        Math.round(
            ((quiz.currentQuestionIndex + 1) /
                quiz.questions.length) * 100
        );


    progressPercent.textContent =
        `${progress}%`;


    progressFill.style.width =
        `${progress}%`;


    // Clear old answers
    answerOptionsContainer.innerHTML = "";


    // Letters for the answer buttons
    const letters = ["A", "B", "C", "D"];


    // Create answer buttons
    currentQuestion.options.forEach((option, index) => {

        const button =
            document.createElement("button");

        button.classList.add("answer-option");

        button.innerHTML = `
            <span class="option-letter">
                ${letters[index]}
            </span>

            <span>
                ${option}
            </span>
        `;


        // Show previously selected answer
        if (
            quiz.selectedAnswers[
                quiz.currentQuestionIndex
            ] === option
        ) {

            button.classList.add("selected");

        }


        button.addEventListener(
            "click",
            function () {

                selectAnswer(option);

            }
        );


        answerOptionsContainer.appendChild(button);

    });


    // Previous button
    previousBtn.disabled =
        quiz.isFirstQuestion();


    // Change Next button on last question
    if (quiz.isLastQuestion()) {

        nextBtn.style.display = "none";
        finishBtn.style.display = "inline-block";

    } else {

        nextBtn.style.display = "inline-block";
        finishBtn.style.display = "inline-block";

    }


    createQuestionNavigator();
}


// =============================================
// SELECT ANSWER
// =============================================

function selectAnswer(answer) {

    quiz.selectAnswer(answer);

    const answerButtons =
        document.querySelectorAll(".answer-option");


    answerButtons.forEach(button => {

        button.classList.remove("selected");

        const buttonAnswer =
            button.querySelector("span:last-child")
                .textContent.trim();


        if (buttonAnswer === answer) {

            button.classList.add("selected");

        }

    });


    createQuestionNavigator();
}


// =============================================
// TIMER DISPLAY
// =============================================

function updateTimerDisplay() {

    timerDisplay.textContent =
        `${quiz.getTimeRemaining()}s`;
}


// Update timer text every second
setInterval(() => {

    if (
        quizScreen.classList.contains("active")
    ) {

        updateTimerDisplay();

    }

}, 1000);


// =============================================
// START QUIZ
// =============================================

startBtn.addEventListener(
    "click",
    function () {

        quiz.resetQuiz();

        showScreen(quizScreen);

        quiz.startTimer();

        displayQuestion();

    }
);


// =============================================
// NEXT QUESTION
// =============================================

nextBtn.addEventListener(
    "click",
    function () {

        quiz.nextQuestion();

        if (quiz.isQuizComplete) {

            showResults();

        } else {

            displayQuestion();

        }

    }
);


// =============================================
// PREVIOUS QUESTION
// =============================================

previousBtn.addEventListener(
    "click",
    function () {

        quiz.previousQuestion();

        displayQuestion();

    }
);


// =============================================
// FINISH QUIZ
// =============================================

finishBtn.addEventListener(
    "click",
    function () {

        quiz.completeQuiz();

        showResults();

    }
);


// =============================================
// DISPLAY RESULTS
// =============================================

function showResults() {

    quiz.completeQuiz();

    showScreen(resultsScreen);


    const score =
        quiz.getScored();

    const total =
        quiz.questions.length;

    const answered =
        quiz.getAnsweredCount();

    const incorrect =
        answered - score;

    const unanswered =
        total - answered;


    percentageDisplay.textContent =
        `${quiz.getPercentage()}%`;

    finalScore.textContent =
        score;

    totalQuestions.textContent =
        total;

    correctCount.textContent =
        score;

    incorrectCount.textContent =
        incorrect;

    unansweredCount.textContent =
        unanswered;


    createReview();
}


// =============================================
// CREATE ANSWER REVIEW
// =============================================

function createReview() {

    reviewContainer.innerHTML = "";


    quiz.questions.forEach(
        (question, index) => {

            const userAnswer =
                quiz.selectedAnswers[index];

            const isCorrect =
                userAnswer === question.correctAnswer;


            const reviewItem =
                document.createElement("div");


            reviewItem.classList.add(
                "review-item"
            );


            if (isCorrect) {

                reviewItem.classList.add(
                    "correct-review"
                );

            } else {

                reviewItem.classList.add(
                    "incorrect-review"
                );

            }


            reviewItem.innerHTML = `

                <div class="review-heading">

                    <strong>
                        Question ${index + 1}
                    </strong>

                    <span class="status ${
                        isCorrect
                            ? "correct-status"
                            : "incorrect-status"
                    }">

                        ${
                            isCorrect
                                ? "Correct"
                                : userAnswer === undefined
                                ? "Unanswered"
                                : "Incorrect"
                        }

                    </span>

                </div>


                <p>
                    ${question.question}
                </p>


                <small>

                    Your answer:

                    <strong>
                        ${
                            userAnswer === undefined
                                ? "No answer"
                                : userAnswer
                        }
                    </strong>

                </small>


                ${
                    !isCorrect
                        ? `
                        <small>
                            Correct answer:
                            <strong>
                                ${question.correctAnswer}
                            </strong>
                        </small>
                        `
                        : ""
                }

            `;


            reviewContainer.appendChild(
                reviewItem
            );

        }
    );
}


// =============================================
// RETAKE QUIZ
// =============================================

retakeBtn.addEventListener(
    "click",
    function () {

        quiz.resetQuiz();

        showScreen(quizScreen);

        quiz.startTimer();

        displayQuestion();

    }
);


// =============================================
// CHOOSE NEW TOPIC
// =============================================

newTopicBtn.addEventListener(
    "click",
    function () {

        quiz.resetQuiz();

        showScreen(instructionsScreen);

    }
);


// =============================================
// INITIAL PAGE INFORMATION
// =============================================

document.getElementById(
    "question-count"
).textContent = questions.length;


// Start on instructions screen
showScreen(instructionsScreen);