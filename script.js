const validUsers = [
  { email: "user1@example.com", password: "Password1" },
  { email: "user2@example.com", password: "Password2" },
  { email: "user3@example.com", password: "Password3" },
];

const quizQuestions = {
  chemistry: {
    easy: [
      {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        correctAnswer: 0,
      },
      {
        question: "Which element has the symbol 'Fe'?",
        options: ["Iron", "Fluorine", "Francium", "Iodine"],
        correctAnswer: 0,
      },
      {
        question: "What is the most abundant gas in Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: 2,
      },
    ],
    medium: [
      {
        question: "What is the pH of a neutral solution?",
        options: ["0", "7", "14", "1"],
        correctAnswer: 1,
      },
      {
        question: "Which of these is not a noble gas?",
        options: ["Neon", "Argon", "Nitrogen", "Krypton"],
        correctAnswer: 2,
      },
      {
        question: "What is the chemical formula for sulfuric acid?",
        options: ["H2SO3", "H2SO4", "HSO3", "H2S2O7"],
        correctAnswer: 1,
      },
    ],
    hard: [
      {
        question: "What is the IUPAC name of CH3COOH?",
        options: [
          "Methanoic acid",
          "Ethanoic acid",
          "Propanoic acid",
          "Butanoic acid",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which of these is not an allotrope of carbon?",
        options: ["Diamond", "Graphite", "Fullerene", "Quartzite"],
        correctAnswer: 3,
      },
      {
        question: "What is the oxidation number of sulfur in H2SO4?",
        options: ["+4", "+6", "-2", "0"],
        correctAnswer: 1,
      },
    ],
  },
  physics: {
    easy: [
      {
        question: "What is the SI unit of force?",
        options: ["Joule", "Newton", "Watt", "Pascal"],
        correctAnswer: 1,
      },
      {
        question: "Which of these is a vector quantity?",
        options: ["Mass", "Time", "Velocity", "Temperature"],
        correctAnswer: 2,
      },
      {
        question: "What is the boiling point of water in Celsius?",
        options: ["0°C", "50°C", "100°C", "200°C"],
        correctAnswer: 2,
      },
    ],
    medium: [
      {
        question: "What is the speed of light in vacuum?",
        options: [
          "299,792,458 m/s",
          "300,000,000 m/s",
          "3,000,000 m/s",
          "30,000 km/s",
        ],
        correctAnswer: 0,
      },
      {
        question:
          "Which law of motion states that for every action, there is an equal and opposite reaction?",
        options: ["First law", "Second law", "Third law", "Fourth law"],
        correctAnswer: 2,
      },
      {
        question: "What is the unit of electric charge?",
        options: ["Ampere", "Volt", "Ohm", "Coulomb"],
        correctAnswer: 3,
      },
    ],
    hard: [
      {
        question: "What is the Schrödinger equation used for?",
        options: [
          "Describing classical mechanics",
          "Describing quantum mechanics",
          "Calculating relativity",
          "Modeling thermodynamics",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "What is the name of the hypothetical particle that transmits gravitational force?",
        options: ["Photon", "Gluon", "Graviton", "Boson"],
        correctAnswer: 2,
      },
      {
        question:
          "In special relativity, what happens to the mass of an object as it approaches the speed of light?",
        options: [
          "It decreases",
          "It increases",
          "It remains constant",
          "It becomes undefined",
        ],
        correctAnswer: 1,
      },
    ],
  },
};

let currentQuestion;
let currentQuestions;
let currentIndex = 0;
let score = 0;

const routes = {
  "#login": document.getElementById("loginPage"),
  "#quiz": document.getElementById("quizSetup"),
  "#question": document.getElementById("questionContainer"),
  "#quiz-end": document.getElementById("quizEnd"),
};

function navigateTo(hash) {
  Object.values(routes).forEach((el) => el.classList.add("hidden"));
  routes[hash].classList.remove("hidden");
  window.location.hash = hash;
}

window.addEventListener("hashchange", () => {
  const hash = window.location.hash || "#login";
  navigateTo(hash);
});

function login() {
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const loginError = document.getElementById("loginError");

  const user = validUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    navigateTo("#quiz");
    document.getElementById("quizPage").classList.remove("hidden");
    loginError.classList.add("hidden");
  } else {
    loginError.textContent = "Invalid email or password. Please try again.";
    loginError.classList.remove("hidden");
  }
}

function startQuiz() {
  const topic = document.getElementById("topic").value;
  const difficulty = document.getElementById("difficulty").value;
  currentQuestions = [...quizQuestions[topic][difficulty]];
  shuffleArray(currentQuestions);
  currentIndex = 0;
  score = 0;
  displayNextQuestion();

  navigateTo("#question");
  // document.getElementById("questionContainer").classList.remove("hidden");
  document.getElementById("submitBtn").classList.remove("hidden");
  document.getElementById("result").classList.add("hidden");
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayNextQuestion() {
  if (currentIndex < currentQuestions.length) {
    currentQuestion = currentQuestions[currentIndex];
    document.getElementById("question").textContent = currentQuestion.question;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "answer";
      radio.value = index;
      radio.id = `option${index}`;
      const label = document.createElement("label");
      label.htmlFor = `option${index}`;
      label.textContent = option;
      optionsContainer.appendChild(radio);
      optionsContainer.appendChild(label);
    });
    document.getElementById("submitBtn").classList.remove("hidden");
    document.getElementById("nextBtn").classList.add("hidden");
    document.getElementById("result").classList.add("hidden");
  } else {
    endQuiz();
  }
}

function submitAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (!selectedAnswer) {
    alert("Please select an answer.");
    return;
  }

  const result = document.getElementById("result");
  if (parseInt(selectedAnswer.value) === currentQuestion.correctAnswer) {
    result.textContent = "Correct!";
    result.style.color = "#2ecc71";
    score++;
  } else {
    result.textContent = "Incorrect.";
    result.style.color = "#e74c3c";
  }
  result.classList.remove("hidden");

  document.getElementById("submitBtn").classList.add("hidden");
  document.getElementById("nextBtn").classList.remove("hidden");
}

function nextQuestion() {
  currentIndex++;
  displayNextQuestion();
}

function endQuiz() {
  navigateTo("#quiz-end");
  document.getElementById(
    "finalScore"
  ).textContent = `Your final score: ${score} out of ${currentQuestions.length}`;
}

function tryAgain() {
  navigateTo("#quiz");
  document.getElementById("quizPage").classList.remove("hidden");
}

function endApp() {
  navigateTo("#login");
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("loginError").classList.add("hidden");
  resetQuizState();
}

function resetQuizState() {
  currentQuestion = null;
  currentQuestions = null;
  currentIndex = 0;
  score = 0;
}

function init() {
  navigateTo("#login");
}

window.addEventListener("load", init);
