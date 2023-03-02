// Client facing scripts here
const quizData = [
  {
    question: "What is Gabby's real cat's name?",
    a: "Fred",
    b: "Frank",
    c: "Floyd",
    d: "Poo Poo",
    correct: "c",
  },
  {
    question: "What is MerCat's favourite type of science?",
    a: "Ocean Science",
    b: "Spa Science",
    c: "Kitty Science",
    d: "Mermaid Science",
    correct: "b",
  },
  {
    question: "How many Hamster Kitties are there?",
    a: "6",
    b: "4",
    c: "12",
    d: "none",
    correct: "a",
  },
  {
    question: "Is Pandy's black patch on his left ear or his right?",
    a: "right",
    b: "left",
    c: "both",
    d: "none",
    correct: "b",
  },
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => (answerEl.checked = false));
}

function getSelected() {
  let answer;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });

  return answer;
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }

    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `
          <h2>you answered ${score}
          /${quizData.length} questions correctly</h2>

          <button onclick="location.reload()">Reload</button>
        `;
    }
  }
});
