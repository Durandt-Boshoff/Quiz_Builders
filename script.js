// PART 1: QUIZ QUESTIONS
// Real question data, 4 topics x 15 questions (5 easy, 5 medium, 5 hard each).
// Shape: { id, topic, difficulty, question, options, correctAnswer }

// --- CHANGED DURING INTEGRATION ---
// This used to be QUESTION_TIME_SECONDS (60s per question, restarting
// every time you moved to a new question). Group decided it should be
// ONE countdown for the whole quiz instead, so this is now the total
// time budget for all 15 questions combined. Change this one number
// to make the whole quiz longer or shorter.
const TOTAL_QUIZ_TIME_SECONDS = 600; // 10:00 for 15 questions

const topicData = {
  history: [
    { id: 1, topic: "History", difficulty: "easy", question: "Which civilization built the pyramids at Giza?", options: ["Ancient Greeks","Persians","Ancient Romans","Ancient Egyptians"], correctAnswer: "Ancient Egyptians" },
    { id: 2, topic: "History", difficulty: "easy", question: "Who was the first president of South Africa after apartheid?", options: ["Jacob Zuma","F. W. de Klerk","Nelson Mandela","Thabo Mbeki"], correctAnswer: "Nelson Mandela" },
    { id: 3, topic: "History", difficulty: "easy", question: "The Roman Empire was centered around which city?", options: ["Alexandria","Rome","Carthage","Athens"], correctAnswer: "Rome" },
    { id: 4, topic: "History", difficulty: "easy", question: "Which famous ship sank in 1912 after hitting an iceberg?", options: ["Mayflower","Lusitania","Titanic","Endeavour"], correctAnswer: "Titanic" },
    { id: 5, topic: "History", difficulty: "easy", question: "Who was known as the Maid of Orléans?", options: ["Eleanor of Aquitaine","Joan of Arc","Marie Curie","Catherine de Medici"], correctAnswer: "Joan of Arc" },
    { id: 6, topic: "History", difficulty: "medium", question: "Which event is commonly regarded as the beginning of the French Revolution?", options: ["Congress of Vienna","Storming of the Bastille","Reign of Terror","Battle of Waterloo"], correctAnswer: "Storming of the Bastille" },
    { id: 7, topic: "History", difficulty: "medium", question: "Which ancient city was buried by Mount Vesuvius in AD 79?", options: ["Sparta","Pompeii","Thebes","Troy"], correctAnswer: "Pompeii" },
    { id: 8, topic: "History", difficulty: "medium", question: "Which treaty formally ended World War I between Germany and the Allied Powers?", options: ["Treaty of Vienna","Treaty of Versailles","Treaty of Paris","Treaty of Utrecht"], correctAnswer: "Treaty of Versailles" },
    { id: 9, topic: "History", difficulty: "medium", question: "Who became British Prime Minister during most of World War II?", options: ["Anthony Eden","Winston Churchill","Clement Attlee","Neville Chamberlain"], correctAnswer: "Winston Churchill" },
    { id: 10, topic: "History", difficulty: "medium", question: "Which empire was ruled by Mansa Musa in the 14th century?", options: ["Ottoman Empire","Mughal Empire","Songhai Empire","Mali Empire"], correctAnswer: "Mali Empire" },
    { id: 11, topic: "History", difficulty: "hard", question: "Which Byzantine emperor ordered the construction of the Hagia Sophia in its famous 6th-century form?", options: ["Basil II","Heraclius","Justinian I","Constantine XI"], correctAnswer: "Justinian I" },
    { id: 12, topic: "History", difficulty: "hard", question: "Which battle in 1066 established Norman rule over England?", options: ["Battle of Agincourt","Battle of Bosworth Field","Battle of Tours","Battle of Hastings"], correctAnswer: "Battle of Hastings" },
    { id: 13, topic: "History", difficulty: "hard", question: "Which agreement created the political framework that divided much of the New World between Spain and Portugal?", options: ["Treaty of Alcáçovas","Treaty of Utrecht","Treaty of Tordesillas","Treaty of Zaragoza"], correctAnswer: "Treaty of Tordesillas" },
    { id: 14, topic: "History", difficulty: "hard", question: "Which ancient civilization developed the cuneiform writing system?", options: ["Sumerians","Minoans","Etruscans","Phoenicians"], correctAnswer: "Sumerians" },
    { id: 15, topic: "History", difficulty: "hard", question: "Which South African political organization was founded in 1912 as the South African Native National Congress?", options: ["United Democratic Front","Pan Africanist Congress","Inkatha Freedom Party","African National Congress"], correctAnswer: "African National Congress" },
  ],
  ai: [
    { id: 16, topic: "Artificial Intelligence", difficulty: "easy", question: "What does AI stand for?", options: ["Artificial Integration","Automated Information","Artificial Intelligence","Advanced Internet"], correctAnswer: "Artificial Intelligence" },
    { id: 17, topic: "Artificial Intelligence", difficulty: "easy", question: "Which technology allows computers to learn patterns from data?", options: ["Machine learning","Word processing","File compression","Screen rendering"], correctAnswer: "Machine learning" },
    { id: 18, topic: "Artificial Intelligence", difficulty: "easy", question: "What is a chatbot designed to do?", options: ["Increase internet speed","Interact with users through conversation","Only store files","Repair computer hardware"], correctAnswer: "Interact with users through conversation" },
    { id: 19, topic: "Artificial Intelligence", difficulty: "easy", question: "Which of these is an example of generative AI?", options: ["A calculator performing addition","A system that creates images from text","A keyboard typing letters","A monitor displaying pixels"], correctAnswer: "A system that creates images from text" },
    { id: 20, topic: "Artificial Intelligence", difficulty: "easy", question: "What type of AI can generate human-like text?", options: ["Large language model","Database server","Graphics driver","Operating system"], correctAnswer: "Large language model" },
    { id: 21, topic: "Artificial Intelligence", difficulty: "medium", question: "What is training data used for in machine learning?", options: ["Connecting devices to Wi-Fi","Encrypting a hard drive","Increasing screen resolution","Teaching a model patterns from examples"], correctAnswer: "Teaching a model patterns from examples" },
    { id: 22, topic: "Artificial Intelligence", difficulty: "medium", question: "What does NLP primarily focus on?", options: ["Managing computer networks","Designing computer processors","Understanding and processing human language","Building physical robots"], correctAnswer: "Understanding and processing human language" },
    { id: 23, topic: "Artificial Intelligence", difficulty: "medium", question: "What is a neural network loosely inspired by?", options: ["Database tables","Internet cables","The structure of biological brains","Computer keyboards"], correctAnswer: "The structure of biological brains" },
    { id: 24, topic: "Artificial Intelligence", difficulty: "medium", question: "What is computer vision mainly concerned with?", options: ["Generating electricity","Interpreting visual information","Compressing audio","Managing passwords"], correctAnswer: "Interpreting visual information" },
    { id: 25, topic: "Artificial Intelligence", difficulty: "medium", question: "What is overfitting in machine learning?", options: ["When a computer overheats","When a model has too little memory","When a model learns training data too specifically","When data is permanently deleted"], correctAnswer: "When a model learns training data too specifically" },
    { id: 26, topic: "Artificial Intelligence", difficulty: "hard", question: "What is the main purpose of a transformer architecture in modern language models?", options: ["Render computer graphics","Model relationships between tokens using attention","Encrypt network traffic","Store files permanently"], correctAnswer: "Model relationships between tokens using attention" },
    { id: 27, topic: "Artificial Intelligence", difficulty: "hard", question: "In machine learning, what does a gradient typically represent during optimization?", options: ["The size of the dataset","The number of model parameters","The number of training examples","The direction of greatest increase of a function"], correctAnswer: "The direction of greatest increase of a function" },
    { id: 28, topic: "Artificial Intelligence", difficulty: "hard", question: "What problem does reinforcement learning primarily address?", options: ["Learning actions through rewards and penalties","Detecting computer hardware failures","Compressing large datasets","Translating source code into machine code"], correctAnswer: "Learning actions through rewards and penalties" },
    { id: 29, topic: "Artificial Intelligence", difficulty: "hard", question: "What is an embedding in natural language processing?", options: ["A physical memory chip","A numerical representation of information","A network security protocol","A type of computer monitor"], correctAnswer: "A numerical representation of information" },
    { id: 30, topic: "Artificial Intelligence", difficulty: "hard", question: "Why is a validation dataset commonly used during model development?", options: ["To permanently store the training data","To increase processor clock speed","To replace the model's input layer","To evaluate and tune a model during development"], correctAnswer: "To evaluate and tune a model during development" },
  ],
  psychology: [
    { id: 31, topic: "Psychology", difficulty: "easy", question: "What is psychology primarily the study of?", options: ["Mind and behavior","Ancient languages","Weather patterns","Planetary motion"], correctAnswer: "Mind and behavior" },
    { id: 32, topic: "Psychology", difficulty: "easy", question: "Which part of the brain is strongly associated with memory formation?", options: ["Medulla","Cerebellum","Hippocampus","Occipital lobe"], correctAnswer: "Hippocampus" },
    { id: 33, topic: "Psychology", difficulty: "easy", question: "What is fear?", options: ["A type of memory storage","A sleep stage","A mathematical process","An emotional response to perceived threat"], correctAnswer: "An emotional response to perceived threat" },
    { id: 34, topic: "Psychology", difficulty: "easy", question: "What is sleep?", options: ["A permanent loss of consciousness","A type of reflex","A form of learning","A recurring state of reduced consciousness and activity"], correctAnswer: "A recurring state of reduced consciousness and activity" },
    { id: 35, topic: "Psychology", difficulty: "easy", question: "What is memory?", options: ["The ability to regulate temperature","The ability to encode, store, and retrieve information","The ability to digest food","The ability to produce hormones"], correctAnswer: "The ability to encode, store, and retrieve information" },
    { id: 36, topic: "Psychology", difficulty: "medium", question: "What is classical conditioning associated with?", options: ["Learning through associations between stimuli","Physical muscle development","Learning only through reading","Reasoning through mathematics"], correctAnswer: "Learning through associations between stimuli" },
    { id: 37, topic: "Psychology", difficulty: "medium", question: "Which psychologist is strongly associated with operant conditioning?", options: ["B. F. Skinner","Sigmund Freud","Carl Jung","Jean Piaget"], correctAnswer: "B. F. Skinner" },
    { id: 38, topic: "Psychology", difficulty: "medium", question: "What does cognitive dissonance describe?", options: ["Discomfort from conflicting beliefs or behaviors","A physical reflex","A stage of deep sleep","A complete loss of memory"], correctAnswer: "Discomfort from conflicting beliefs or behaviors" },
    { id: 39, topic: "Psychology", difficulty: "medium", question: "What is confirmation bias?", options: ["Favoring information that supports existing beliefs","Changing behavior through rewards","Learning through observation only","Forgetting all negative information"], correctAnswer: "Favoring information that supports existing beliefs" },
    { id: 40, topic: "Psychology", difficulty: "medium", question: "Which neurotransmitter is strongly involved in reward and motivation?", options: ["Adrenaline","Dopamine","Insulin","Melatonin"], correctAnswer: "Dopamine" },
    { id: 41, topic: "Psychology", difficulty: "hard", question: "Which brain structure is especially important for regulating the body's homeostasis and linking the nervous and endocrine systems?", options: ["Hypothalamus","Amygdala","Hippocampus","Corpus callosum"], correctAnswer: "Hypothalamus" },
    { id: 42, topic: "Psychology", difficulty: "hard", question: "In classical conditioning, what is a conditioned stimulus?", options: ["A previously neutral stimulus that acquires the ability to trigger a response","A behavior strengthened by punishment","A stimulus that naturally produces a response","A response that occurs without learning"], correctAnswer: "A previously neutral stimulus that acquires the ability to trigger a response" },
    { id: 43, topic: "Psychology", difficulty: "hard", question: "What does the spacing effect suggest about learning?", options: ["Memory improves only through repetition within one session","Spreading study sessions over time can improve long-term retention","Studying everything at once always produces the best memory","Sleep prevents information from being remembered"], correctAnswer: "Spreading study sessions over time can improve long-term retention" },
    { id: 44, topic: "Psychology", difficulty: "hard", question: "What is the main function of the prefrontal cortex?", options: ["Controlling basic breathing rhythms","Producing digestive enzymes","Supporting executive functions such as planning and decision-making","Processing primary visual signals"], correctAnswer: "Supporting executive functions such as planning and decision-making" },
    { id: 45, topic: "Psychology", difficulty: "hard", question: "What is the misinformation effect?", options: ["When later misleading information can alter memory for an event","When people completely lose their long-term memory","When rewards increase a learned behavior","When a person forgets information due to lack of sleep"], correctAnswer: "When later misleading information can alter memory for an event" },
  ],
  entertainment: [
    { id: 46, topic: "Entertainment", difficulty: "easy", question: "Which singer is known as the 'King of Pop'?", options: ["Bruno Mars","Elvis Presley","Michael Jackson","Prince"], correctAnswer: "Michael Jackson" },
    { id: 47, topic: "Entertainment", difficulty: "easy", question: "Which film franchise features the character Harry Potter?", options: ["Twilight","Harry Potter","The Maze Runner","The Hunger Games"], correctAnswer: "Harry Potter" },
    { id: 48, topic: "Entertainment", difficulty: "easy", question: "Which artist released the album '1989'?", options: ["Taylor Swift","Ariana Grande","Rihanna","Lady Gaga"], correctAnswer: "Taylor Swift" },
    { id: 49, topic: "Entertainment", difficulty: "easy", question: "Which superhero is also known as Bruce Wayne?", options: ["Batman","Iron Man","Spider-Man","Superman"], correctAnswer: "Batman" },
    { id: 50, topic: "Entertainment", difficulty: "easy", question: "Which South Korean group released the song 'Dynamite'?", options: ["BLACKPINK","BTS","Stray Kids","EXO"], correctAnswer: "BTS" },
    { id: 51, topic: "Entertainment", difficulty: "medium", question: "Which film won the Academy Award for Best Picture in 1998?", options: ["Titanic","The Truman Show","Saving Private Ryan","Good Will Hunting"], correctAnswer: "Titanic" },
    { id: 52, topic: "Entertainment", difficulty: "medium", question: "Who played Jack Dawson in Titanic?", options: ["Johnny Depp","Brad Pitt","Matt Damon","Leonardo DiCaprio"], correctAnswer: "Leonardo DiCaprio" },
    { id: 53, topic: "Entertainment", difficulty: "medium", question: "Which artist released the album 'Lemonade'?", options: ["Beyoncé","Nicki Minaj","Adele","Rihanna"], correctAnswer: "Beyoncé" },
    { id: 54, topic: "Entertainment", difficulty: "medium", question: "Which television series follows the Stark, Lannister, and Targaryen families?", options: ["The Witcher","The Last Kingdom","Vikings","Game of Thrones"], correctAnswer: "Game of Thrones" },
    { id: 55, topic: "Entertainment", difficulty: "medium", question: "Which actor played Iron Man in the Marvel Cinematic Universe?", options: ["Robert Downey Jr.","Chris Evans","Chris Hemsworth","Mark Ruffalo"], correctAnswer: "Robert Downey Jr." },
    { id: 56, topic: "Entertainment", difficulty: "hard", question: "Which director directed both 'Pulp Fiction' and 'Kill Bill'?", options: ["Quentin Tarantino","Christopher Nolan","David Fincher","Martin Scorsese"], correctAnswer: "Quentin Tarantino" },
    { id: 57, topic: "Entertainment", difficulty: "hard", question: "Which album became the first album by a female rapper to win the Grammy Award for Best Rap Album?", options: ["The Miseducation of Lauryn Hill","Pink Friday","Invasion of Privacy","Queen"], correctAnswer: "Invasion of Privacy" },
    { id: 58, topic: "Entertainment", difficulty: "hard", question: "Which actor portrayed multiple characters in the 2000 film 'The Nutty Professor II: The Klumps'?", options: ["Eddie Murphy","Mike Myers","Will Smith","Jim Carrey"], correctAnswer: "Eddie Murphy" },
    { id: 59, topic: "Entertainment", difficulty: "hard", question: "Which film became the first non-English-language film to win the Academy Award for Best Picture?", options: ["Life Is Beautiful","Parasite","Roma","Crouching Tiger, Hidden Dragon"], correctAnswer: "Parasite" },
    { id: 60, topic: "Entertainment", difficulty: "hard", question: "Which artist holds the record for the most Grammy Awards won by a female artist as of 2026?", options: ["Aretha Franklin","Adele","Beyoncé","Taylor Swift"], correctAnswer: "Beyoncé" },
  ],
};

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

        // --- CHANGED DURING INTEGRATION ---
        // Whole-quiz countdown instead of per-question.
        this.timeRemaining = TOTAL_QUIZ_TIME_SECONDS;
        this.timer = null;
        // Controller can set this to get notified the moment time
        // hits zero, so it can auto-submit — Quiz itself never
        // touches the DOM directly.
        this.onTimeExpires = null;
    }

    // PART 3: ANSWER & SCORING LOGIC

    // Returns the question currently being displayed.
    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }


    // Stores the user's selected answer for the current question.
   selectAnswer(answer) {
   this.selectedAnswers[this.currentQuestionIndex] = answer;
}

    // Checks whether the selected answer is correct.
    // The score is recalculated to prevent the same question
    // from being counted more than once.
    checkAnswer(answer) {
        this.selectAnswer(answer);
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


    // --- ADDED FOR INTEGRATION ---
    // Returns correct/incorrect/unanswered counts together,
    // since the results screen needs all three at once and
    // calculateScore() on its own only tracks correct answers.
    getResultsSummary() {
        let correct = 0;
        let incorrect = 0;
        let unanswered = 0;

        this.questions.forEach((question, index) => {
            const given = this.selectedAnswers[index];
            if (given === undefined) {
                unanswered++;
            } else if (given === question.correctAnswer) {
                correct++;
            } else {
                incorrect++;
            }
        });

        return {correct, incorrect, unanswered, total: this.questions.length };
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
    // --- CHANGED: no longer restarts the timer, since it now runs
    // continuously for the whole quiz instead of resetting per question. ---
    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
        } else {
            this.completeQuiz();
        }
    }


    // Moves back to the previous question.
    // The index cannot go below zero.
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
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


        // --- ADDED FOR INTEGRATION ---
    // Jumps straight to any question by index (needed so the
    // question navigator numbers can jump around, not just
    // move one at a time like nextQuestion()/previousQuestion()).
    goToQuestion(index) {
        if (index >= 0 && index < this.questions.length) {
            this.currentQuestionIndex = index;
        }
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
        this.timeRemaining = TOTAL_QUIZ_TIME_SECONDS;
    }

    // PART 5: PER QUESTION TIMER.
    
    // --- CHANGED DURING INTEGRATION ---
    // This used to reset to 30/60s and restart on every question
    // (per-question timer). It now runs once for the entire quiz.
    startTimer() {
        // Stop any existing timer before starting a new one.
        this.stopTimer();

        // Start the countdown from wherever timeRemaining currently is
        // (NOT reset here — resetting only happens in resetQuiz()).
        this.timer = setInterval(() => {
            this.timeRemaining--;

            // When the timer reaches zero, the whole quiz is over —
            // stop the timer, mark it complete, and let the controller
            // know so it can show the results screen.
            if (this.timeRemaining <= 0) {
                this.timeRemaining = 0;
                this.completeQuiz();
                if (this.onTimeExpires) this.onTimeExpires();
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


// =====================================================
// PART 8: CONTROLLER (added during integration)
// Connects the Quiz class above to the actual HTML.
// This is the only part of the code that touches the DOM —
// Quiz itself stays completely unaware of the page.
// =====================================================

const TOPIC_META = {
    history: { icon: "🏛️", name: "History", description: "How well do you know the past?" },
    ai: { icon: "🤖", name: "Artificial Intelligence", description: "Test your AI & ML knowledge" },
    psychology: { icon: "🧠", name: "Psychology", description: "Explore the mind and behavior" },
    entertainment: { icon: "🎬", name: "Entertainment", description: "Movies, music & pop culture" },
};

class QuizApp {
    constructor(topicData) {
        this,topicData = topicData;
        this.quiz = null; // created once a topic is chosen
        this.announcedLevels = new Set(); // tracks which difficulty overlays have shown this attempt

        this.el = {
            SelectionScreen: document.getElementById("selection-screen"),
            topicCards: document.getElementById("topic-cards"),

            instructionsScreen: document.getElementById("instructions-screen"),
            instructionTopic: document.getElementById("instruction-topic"),
            questionCount: document.getElementById("question-count"),
            timeLimit: document.getElementById("time-limit"),
            startBtn: document.getElementById("start-btn"),

            quizScreen: document.getElementById("quiz-screen"),
            quizTopic: document.getElementById("quiz-topic"),
            timer: document.getElementById("timer"),

            questionProgress: document.getElementById("question-progress"),
            progressPercent: document.getElementById("progress-percent"),
            progressFill: document.getElementById("progress-fill"),

            questionNavigator: document.getElementById("question-navigator"),
            currentQuestionNumber: document.getElementById("current-question-number"),
            questionText: document.getElementById("question-text"),
            answerOptions: document.getElementById("answer-options"),

            previousBtn: document.getElementById("previous-btn"),
            nextBtn: document.getElementById("next-btn"),
            finishBtn: document.getElementById("finish-btn"),

            resultsScreen: document.getElementById("results-screen"),
            resultMessage: document.getElementById("result-message"),
            percentage: document.getElementById("percentage"),
            scoreCircle: document.getElementById("score-circle"),
            finalScore: document.getElementById("final-score"),
            totalQuestions: document.getElementById("total-questions"),
            correctCount: document.getElementById("correct-count"),
            incorrectCount: document.getElementById("incorrect-count"),
            unansweredCount: document.getElementById("unanswered-count"),
            timeUsed: document.getElementById("time-used"),
            reviewContainer: document.getElementById("review-container"),
            retakeBtn: document.getElementById("retake-btn"),
            newTopicBtn: document.getElementById("new-topic-btn"),
            confettiBurst: document.getElementById("confetti-burst"),

            levelOverlay: document.getElementById("level-overlay"),
            levelText: document.getElementById("level-overlay-text"),
        };

        this.renderTopicCards();
        this.attachListeners();
    }

    showScreen(screenEl) {
        [this.el.selectionScreen, this.el.instructionsScreen, this.el.quizScreen, this.el.resultsScreen]
            .forEach((s) => s.classList.remove("active"));
        screenEl.classList.add("active");
    }

    formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }

    // ---- Screen 1: topic selection ----
    renderTopicCards() {
        this.el.topicCards.innerHTML = "";
        Object.entries(this.topicData).forEach(([key, questionList]) => {
            const meta = TOPIC_META[key];
            const card = document.createElement("div");
            card.className = "topic-card";
            card.innerHTML = `
                <span class="topic-icon">${meta.icon}</span>
                <h3>${meta.name}</h3>
                <p>${meta.description}</p>
                <span class="topic-count">${questionList.length} questions</span>
            `;
            card.addEventListener("click", () => this.openInstructions(key));
            this.el.topicCards.appendChild(card);
        });
    }

    // ---- Screen 2: instructions ----
    openInstructions(topicKey) {
        this.topicKey = topicKey;
        this.quiz = new Quiz(this.topicData[topicKey]);
        this.announcedLevels.clear();

        this.el.instructionTopic.textContent = `${TOPIC_META[topicKey].name} Quiz`;
        this.el.questionCount.textContent = this.quiz.questions.length;
        // NOTE: this shows the PER-QUESTION time (30s each), since that's
        // how Quiz is currently built. Confirm with the group whether this
        // should instead be a single whole-quiz countdown.
        this.el.timeLimit.textContent = this.formatTime(this.quiz.timeRemaining);

        this.showScreen(this.el.instructionsScreen);
    }

    // ---- Screen 3: quiz ----
    startQuiz() {
        this.showScreen(this.el.quizScreen);
        this.el.quizTopic.textContent = TOPIC_META[this.topicKey].name;
        // When the whole-quiz timer hits zero, Quiz calls this —
        // time's up means the quiz is over, no confirmation needed.
        this.quiz.onTimeExpired = () => this.finishQuiz();
        this.quiz.startTimer();
        this.updateTimerDisplay(); // show the real value immediately, don't wait for the first 1s tick
        this.renderQuestionWithLevelCheck();
    }

    renderQuestionNavigator() {
        this.el.questionNavigator.innerHTML = "";
        this.quiz.questions.forEach((_, i) => {
            const btn = document.createElement("button");
            btn.className = "nav-number";
            btn.textContent = i + 1;
            if (this.quiz.selectedAnswers[i] !== undefined) btn.classList.add("answered");
            if (i === this.quiz.currentQuestionIndex) btn.classList.add("current");
            btn.addEventListener("click", () => {
                this.quiz.goToQuestion(i);
                this.renderQuestionWithLevelCheck();
            });
            this.el.questionNavigator.appendChild(btn);
        });
    }

    // Shows a short "Level Up" overlay the first time a new
    // difficulty appears in this attempt, then renders the question.
    // Revisiting an already-seen difficulty skips the overlay.
    renderQuestionWithLevelCheck() {
        const question = this.quiz.getCurrentQuestion();
        const difficulty = question.difficulty || "easy";

        if (this.announcedLevels.has(difficulty)) {
            this.renderQuestion();
            return;
        }

        const isFirst = this.announcedLevels.size === 0;
        this.announcedLevels.add(difficulty);
        this.showLevelOverlay(difficulty, isFirst);
    }

    showLevelOverlay(difficulty, isFirst) {
        const label = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
        this.el.levelText.textContent = isFirst ? `Starting: ${label}` : `Level Up: ${label}!`;
        this.el.levelOverlay.classList.add("active");

        setTimeout(() => {
            this.el.levelOverlay.classList.remove("active");
            this.renderQuestion();
        }, 1300);
    }

    renderQuestion() {
        const quiz = this.quiz;
        const question = quiz.getCurrentQuestion();

        this.el.currentQuestionNumber.textContent = quiz.currentQuestionIndex + 1;
        this.el.questionText.textContent = question.question;

        this.el.questionProgress.textContent = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`;
        const progressPct = Math.round(((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100);
        this.el.progressPercent.textContent = `${progressPct}%`;
        this.el.progressFill.style.width = `${progressPct}%`;

        this.renderQuestionNavigator();

        const optionButtons = this.el.answerOptions.querySelectorAll(".answer-option");
        const selected = quiz.selectedAnswers[quiz.currentQuestionIndex];

        optionButtons.forEach((btn, i) => {
            const optionText = question.options[i];
            const textSpan = btn.querySelectorAll("span")[1];
            textSpan.textContent = optionText;

            btn.classList.toggle("selected", optionText === selected);

            // Clone-and-replace clears any listener from the previous question
            const freshBtn = btn.cloneNode(true);
            btn.replaceWith(freshBtn);
            freshBtn.addEventListener("click", () => {
                quiz.selectAnswer(optionText);
                this.renderQuestion();
            });
        });

        this.el.previousBtn.disabled = quiz.isFirstQuestion();
    }

    updateTimerDisplay() {
        const remaining = this.quiz.getTimeRemaining();
        this.el.timer.textContent = this.formatTime(remaining);
        // Pulse red under a minute left, so it's impossible to miss.
        const timerBox = this.el.timer.closest(".timer-box");
        if (timerBox) timerBox.classList.toggle("urgent", remaining <= 60);
    }

    // ---- Screen 4: results ----
    handleFinishClicked() {
        const unansweredCount = this.quiz.questions.length - this.quiz.getAnsweredCount();
        // No custom modal exists in the current HTML, so this uses a
        // simple browser confirm() as a lightweight stand-in. Swap this
        // for a styled modal later if the group wants to match the
        // rest of the design more closely.
        if (unansweredCount > 0) {
            const proceed = window.confirm(
                unansweredCount === 1
                    ? "You have 1 unanswered question. Submit anyway?"
                    : `You have ${unansweredCount} unanswered questions. Submit anyway?`
            );
            if (!proceed) return;
        }
        this.finishQuiz();
    }

    finishQuiz() {
        this.quiz.completeQuiz();
        this.launchConfetti();
        this.renderResults();
        this.showScreen(this.el.resultsScreen);
    }

    // Generates a burst of small falling/spinning pieces —
    // pure CSS handles the animation, JS just creates them.
    launchConfetti() {
        const container = this.el.confettiBurst;
        if (!container) return;
        container.innerHTML = "";

        const colors = ["#635bff", "#22c55e", "#eab308", "#ef4444", "#3b82f6"];
        for (let i = 0; i < 40; i++) {
            const piece = document.createElement("span");
            piece.className = "confetti-piece";
            piece.style.left = `${Math.random() * 100}%`;
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDuration = `${1.4 + Math.random() * 1.2}s`;
            piece.style.animationDelay = `${Math.random() * 0.4}s`;
            piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
            container.appendChild(piece);
        }
        setTimeout(() => { container.innerHTML = ""; }, 3000);
    }

    getPerformanceMessage(percentage) {
        if (percentage === 100) return "Perfect score!";
        if (percentage >= 80) return "Excellent work!";
        if (percentage >= 60) return "Good effort!";
        if (percentage >= 40) return "Not bad — room to improve.";
        return "Keep practising, you'll get there.";
    }

    renderResults() {
        const quiz = this.quiz;
        const summary = quiz.getResultsSummary();
        const percentage = quiz.getPercentage();

        this.el.resultMessage.textContent = this.getPerformanceMessage(percentage);
        this.el.percentage.textContent = `${percentage}%`;
        this.el.scoreCircle.style.setProperty("--pct", percentage);
        this.el.finalScore.textContent = quiz.getScore();
        this.el.totalQuestions.textContent = quiz.questions.length;

        this.el.correctCount.textContent = summary.correct;
        this.el.incorrectCount.textContent = summary.incorrect;
        this.el.unansweredCount.textContent = summary.unanswered;
        // --- FIXED DURING INTEGRATION ---
        // Now that the timer runs for the whole quiz, elapsed time is
        // just total budget minus whatever's left on the clock.
        const secondsUsed = TOTAL_QUIZ_TIME_SECONDS - quiz.timeRemaining;
        this.el.timeUsed.textContent = this.formatTime(secondsUsed);
        // --- END FIXED ---

        this.el.reviewContainer.innerHTML = "";
        quiz.questions.forEach((question, i) => {
            const given = quiz.selectedAnswers[i];
            const isCorrect = given === question.correctAnswer;
            const isUnanswered = given === undefined;

            const div = document.createElement("div");
            div.className = `review-item ${isUnanswered ? "" : isCorrect ? "correct-review" : "incorrect-review"}`;

            const statusLabel = isUnanswered ? "Unanswered" : isCorrect ? "Correct" : "Incorrect";
            const statusClass = isUnanswered ? "" : isCorrect ? "correct-status" : "incorrect-status";

            div.innerHTML = `
                <div class="review-heading">
                    <strong>Question ${i + 1}</strong>
                    <span class="status ${statusClass}">${statusLabel}</span>
                </div>
                <p>${question.question}</p>
                <small>Your answer: <strong>${given ?? "None"}</strong></small>
                ${!isCorrect ? `<small>Correct answer: <strong>${question.correctAnswer}</strong></small>` : ""}
            `;
            this.el.reviewContainer.appendChild(div);
        });
    }

    // ---- Static listeners ----
    attachListeners() {
        this.el.startBtn.addEventListener("click", () => this.startQuiz());

        this.el.previousBtn.addEventListener("click", () => {
            this.quiz.previousQuestion();
            this.renderQuestionWithLevelCheck();
        });

        this.el.nextBtn.addEventListener("click", () => {
            if (this.quiz.isLastQuestion()) {
                this.handleFinishClicked();
                return;
            }
            this.quiz.nextQuestion();
            this.renderQuestionWithLevelCheck();
        });

        this.el.finishBtn.addEventListener("click", () => this.handleFinishClicked());

        this.el.retakeBtn.addEventListener("click", () => {
            this.quiz.resetQuiz();
            this.announcedLevels.clear();
            this.startQuiz();
        });

        this.el.newTopicBtn.addEventListener("click", () => {
            this.quiz = null;
            this.showScreen(this.el.selectionScreen);
        });

        // Keeps the on-screen timer in sync every second.
        setInterval(() => {
            if (this.quiz && !this.quiz.isQuizComplete) this.updateTimerDisplay();
        }, 1000);
    }
}

// =====================================================
// BOOT
// =====================================================
const app = new QuizApp(topicData);
