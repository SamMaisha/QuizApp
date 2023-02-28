/*
 * All routes for Quizzes are defined here
 * Since this file is loaded in server.js into /quizzes,
 *   these routes are mounted onto /quizzes
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const quizQueries = require("../db/queries/quizzes");
const { pushAnswersIntoQuestionObject, calculateQuizScore } = require("../functions/helper");

// HOMEPAGE - show list of public quizzes
// NOTE - tested end to end - everything checks out
router.get("/", (req, res) => {
  //query returns an array of objects
  quizQueries
    .getQuizzes()
    .then((result) => {
      const quizzes = result;
      res.render("index", {
        quizzes: quizzes
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

// CREATE QUIZ - render page to create a new quiz
router.get("/create", (req, res) => {
  res.render("quiz_create");
});

// CREATE QUIZ - add newly created quiz to DB table
router.post("/", (req, res) => {
  //parse body for submitted quiz
  const newQuiz = req.body;
  console.log(newQuiz);
  // quizQueries.addNewQuiz(newQuiz)
  // .then(quiz => {
  //   if (!quiz) {
  //     res.send("oops something went wrong! Please try submitting again")
  //     return;
  //   }
  //   res.send("new quiz has been created!")
  // })
  // .catch(error => res.send(error));
});

// VIEW QUIZ - show single quiz for user to attempt
// NOTE: (route is interacting with DB just fine - there is an issue in the ejs file)

router.get("/:quizid", (req, res) => {
  const quizId = req.params.quizid;
  //console.log('QUIZ ID', quizId);
  quizQueries.getSelectedQuiz(quizId).
  then((resultQuestions) => {
    const quizQuestions = resultQuestions;
    //console.log('QUIZ QUESTION', quizQuestions);

    quizQueries.getAnswersForSelectedQuiz(quizId)
    .then((resultAnswers) => {
      const quizAnswers = resultAnswers;
      //console.log('QUIZ ANSWERS:', quizAnswers)
      const quizQuestionsAnswers = pushAnswersIntoQuestionObject(quizQuestions, quizAnswers);
      // console.log('QUIZZES:', quizQuestionsAnswers)
      res.render("quiz_take",
    {quizzes: quizQuestionsAnswers
    });
    })
  });
});

// VIEW QUIZ - send quiz results to DB
router.post("/:quizid", (req, res) => {
  const quizId = req.params.quizid;
  console.log("QUIZ ID:",quizId);

  // get users answers and compare it to correct answer
  const userAnswers = req.body;
  quizQueries.getCorrectAnswerForQuiz(quizId).then((result) => {
    const correctAnswers = result;
    const QuizScore = calculateQuizScore(correctAnswers, userAnswers);
    console.log(QuizScore);

  })




  // quizQueries.addQuizResult(quizId).then((quizResult) => {
  //   console.log(quizResult);
  //   if (!quizResult) {
  //     res.send("error");
  //     return;
  //   }
  // });
});

// MY QUIZZES - post route to delete a quiz {POST MVP}
router.post("/:quizid/delete", (req, res) => {});

module.exports = router;
