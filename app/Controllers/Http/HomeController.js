"use strict";
const Quiz = use("App/Models/Quiz");
const axios = require("axios");
const { nanoid } = require("nanoid");

class HomeController {
  categories() {
    return [
      {
        id: 11,
        name: "Science and Nature",
        link:
          "https://images.unsplash.com/photo-1562445927-bdd32a655213?ixid=MXwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OHw1MTA2MjMzN3x8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=286&q=60",
      },
      {
        id: 12,
        name: "Gaming",
        link:
          "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixid=MXwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3w1MTA2MjMzN3x8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=286&q=60",
      },
      {
        id: 15,
        name: "Film",
        link:
          "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mnw1MTA2MjMzN3x8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=286&q=60",
      },
      {
        id: 17,
        name: "Music",
        link:
          "https://images.unsplash.com/photo-1487180144351-b8472da7d491?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw1MTA2MjMzN3x8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=286&q=60",
      },
      {
        id: 18,
        name: "Art",
        link:
          "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixid=MXwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NXw1MTA2MjMzN3x8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=286&q=60",
      },
      {
        id: 24,
        name: "Gadgets",
        link:
          "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixid=MXwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Nnw1MTA2MjMzN3x8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=286&q=60",
      },
      {
        id: 25,
        name: "Politics",
        link:
          "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHw1MTA2MjMzN3x8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=286&q=60",
      },
      {
        id: 30,
        name: "Computers",
        link:
          "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3w1MTA2MjMzN3x8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=286&q=60",
      },
    ];
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
  prepareOptions(options) {
    const optionLetters = ["A", "B", "C", "D"];
    return options.map((option, index) => ({
      choice: optionLetters[index],
      option,
    }));
  }
  async index({ view, request }) {
    const categories = this.categories();
    return view.render("home", { categories });
  }

  async initializeQuiz({ view, request, response }) {
    const {
      difficulty,
      "number-of-question": numberOfQuestions,
      id,
    } = request.all();

    const quizResponse = await axios.get(
      `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${id}&difficulty=${difficulty}&type=multiple&encode=url3986`
    );

    const user_id = request.cookie("user_id");

    const quizes = quizResponse.data.results.map((quiz, index) => {
      return {
        number: index + 1,
        question: quiz.question,
        answers: this.prepareOptions(
          this.shuffle([...quiz.incorrect_answers, quiz.correct_answer])
        ),
      };
    });

    if (!request.cookie("user_id")) {
      response.cookie("user_id", nanoid());
    }

    const quiz = await Quiz.create({
      title: `${quizResponse.data.results[0].category} Quiz`,
      user_id,
      quiz_with_answers: JSON.stringify(quizResponse.data.results),
      quiz_without_answers: JSON.stringify(quizes),
    });

    response.cookie("quiz_id", quiz.id);
    return response.redirect("/quiz", { quizes, decode: decodeURIComponent });
  }
}

module.exports = HomeController;
