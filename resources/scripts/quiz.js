const alpinejs = require("alpinejs");
const endQuizForm = document.querySelector("#end-quiz-form");

window.addQuestion = (questionIndex, answerText) => {
  const input = document.createElement("input");
  input.setAttribute("name", questionIndex);
  input.setAttribute("value", answerText);
  input.setAttribute("type", "hidden");
  endQuizForm.appendChild(input);
};

window.submitAnswers = () => {
  setTimeout(endQuizForm.submit(), 3000);
};
