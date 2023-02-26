/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

// QUIZ RESULTS - render page for list of quizzes and results user has taken
router.get('/:userid/results', (req, res) => {
  // query returns a list of quizzes, results and result links as an array of objects
  // pass results into templateVars
  userQueries.getQuizResultsForUser()
  .then()
  .catch()

  res.render('user_results');
});

// MY QUIZZES - render page to show list of quizzes user has created
router.get('/:userid/quizzes', (req, res) => {
  res.render('user_quizzes');
})


// SHOW MY QUIZ RESULT - render page for indiviudal quiz result user has taken
router.get('/:userid/quizzes/:quizid', (req, res) => {
  res.render('user_quiz_result');
})




module.exports = router;
