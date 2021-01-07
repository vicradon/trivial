"use strict";

class HighScoreController {
  async index({ view, request, response }) {
    try {
      return view.render("highscores");
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = HighScoreController;
