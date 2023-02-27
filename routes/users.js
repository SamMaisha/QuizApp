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
  const userId = req.params.userid;
  console.log(userId);
  // query returns a list of quizzes, results and result links as an array of objects
  // pass results into templateVars
  userQueries.getQuizResultsForUser(userId)
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    console.log(err);
    res.send(err);
  })

  //res.render('user_results');
});

// MY QUIZZES - render page to show list of quizzes user has created
router.get('/:userid/quizzes', (req, res) => {
  const userId = req.params.userid
  console.log(userId);
  // query will return array of objects
  userQueries.getQuizzesCreatedByUser(userId)
  .then(quizzes => {
    const tempVar = quizzes;
    console.log(tempVar);
  })
  res.render('user_quizzes');
})

// SHOW MY QUIZ RESULT - render page for indiviudal quiz result user has taken
router.get('/:userid/quizzes/:quizid', (req, res) => {
  const userId = req.params.userid;
  const quizId = req.params.quizid;
  console.log(userId);
  console.log(quizId);
  // interact with query to fetch quiz result for user -- need to add query for this

  res.render('user_quiz_result');
})

module.exports = router;
