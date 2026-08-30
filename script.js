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
    selectedAnswers(answer) {
        this.selectedAnswers[this.currentQuestionIndex] = answer;
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
            this.timerStart();
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
            localStorage.getItem("quizLearderboard")
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