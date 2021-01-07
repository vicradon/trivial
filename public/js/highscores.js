/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!*****************************************!*\
  !*** ./resources/scripts/highscores.js ***!
  \*****************************************/
eval("const highScoresList = document.getElementById(\"highScoresList\");\nconst highScores = JSON.parse(localStorage.getItem(\"highScores\")) || [];\nhighScoresList.innerHTML = highScores.map(score => {\n  return `<li class=\"high-score\">${score.name} - ${score.score}</li>`;\n}).join(\"\");\n\n//# sourceURL=webpack://adonis-fullstack-app/./resources/scripts/highscores.js?");
/******/ })()
;