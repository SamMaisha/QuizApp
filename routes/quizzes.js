/*
 * All routes for Quizzes are defined here
 * Since this file is loaded in server.js into /quizzes,
 *   these routes are mounted onto /quizzes
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const quizQueries = require('../db/queries/quizzes');

// HOMEPAGE - show list of public quizzes
router.get('/', (req, res) => {
  // query returns an array of objects
  const templateVars = {
    // just pass the query result
  }
  res.render('index', templateVars);

  // quizQueries.getQuizzes()
  //   .then(users => {
  //     res.json({ users });
  //   })
  //   .catch(err => {
  //     res
  //       .status(500)
  //       .json({ error: err.message });
  //   });
});

// CREATE QUIZ - render page to create a new quiz
router.get('/create', (req, res) => {
  res.render('quiz_create');

})

// CREATE QUIZ - add newly created quiz to DB table
router.post('/',(req,res) => {
  //parse body for submitted quiz
  const newQuiz = req.body;
  console.log(newQuiz);
  quizQueries.addNewQuiz(newQuiz)
  .then(quiz => {
    if (!quiz) {
      res.send("oops something went wrong! Please try submitting again")
      return;
    }
    res.send("new quiz has been created!")
  })
  .catch(error => res.send(error));

})


// VIEW QUIZ - show single quiz for user to attempt
router.get('/:quizid', (req, res) => {
  // query should return an object
  quizQueries.getSelectedQuiz(quizId)

})

// VIEW QUIZ - send quiz results to DB
router.post('/:quizid', (req, res) => {

})

// MY QUIZZES - post route to delete a quiz {POST MVP}
router.post('/:quizid/delete', (req, res) => {

})

module.exports = router;
