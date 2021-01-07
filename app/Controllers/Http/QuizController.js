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
        answers: [
          ...quiz.incorrect_answers.map((ans) => ({
            text: ans,
            isCorrect: false,
          })),
          { isCorrect: true, text: quiz.correct_answer },
        ],
      };
    });
  }

  async endQuiz({ request, response, view }) {
    const { _csrf, ...quizResults } = request.all();
    if (!request.cookie("user_id")) {
      return response.redirect("/");
    }

    console.log(quizResults);
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
}

module.exports = QuizController;
