"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", "HomeController.index").as("home");
Route.post("/", "QuizController.initializeQuiz");
Route.get("/quiz", "QuizController.index").as("quiz");
Route.post("/quiz/end", "QuizController.endQuiz").as("quiz-end");
