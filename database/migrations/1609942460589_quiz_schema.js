"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class QuizSchema extends Schema {
  up() {
    this.create("quizzes", (table) => {
      table.increments();
      table.timestamps();
      table.string("user_id").notNullable();
      table.string("title");
      table.string("quiz_without_answers");
      table.string("quiz_with_answers");
    });
  }

  down() {
    this.drop("quizzes");
  }
}

module.exports = QuizSchema;
