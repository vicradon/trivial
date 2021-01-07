"use strict";
const Quiz = use("App/Models/Quiz");

class QuizController {
  async index({ view, request, response }) {
    try {
      if (!request.cookie("user_id")) {
        return response.redirect("/");
      }

      const quiz_id = request.cookie("quiz_id");
      const quizesFromDB = await Quiz.find(quiz_id);
      const { quiz_without_answers: quizes, title } = quizesFromDB.toJSON();

      return view.render("quiz", {
        quizes: JSON.parse(quizes),
        title,
        decode: decodeURIComponent,
      });
    } catch (error) {
      console.error(error);
    }
  }

  formatForReview(quiz_with_answers) {
    return quiz_with_answers.map((quiz) => {
      return {
        question: quiz.question,
        answers: this.shuffle([
          ...quiz.incorrect_answers.map((ans) => ({
            text: ans,
            isCorrect: false,
          })),
          { isCorrect: true, text: quiz.correct_answer },
        ]),
      };
    });
  }

  async endQuiz({ request, response, view }) {
    const { _csrf, ...quizResults } = request.all();
    if (!request.cookie("user_id")) {
      return response.redirect("/");
    }

    const quiz_id = request.cookie("quiz_id");
    const quizesFromDB = await Quiz.find(quiz_id);
    const { quiz_with_answers, title } = quizesFromDB.toJSON();
    const quizes = this.formatForReview(JSON.parse(quiz_with_answers));

    return view.render("quiz-end", {
      title: `Review of ${title}`,
      quizes,
      decode: decodeURIComponent,
    });
  }
  shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}

module.exports = QuizController;
