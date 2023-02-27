# Routes

1. B

- GET /quizzes (browse all public quizzes - homepage)
- GET /users/:userid/quizzes (render myquiz page - quizzes created by user)
- GET /users/:userid/results (render results page - quizzes taken by user)

2. R

- GET /quizzes/:quizid (individual quiz - user can take a quiz)
- GET /users/:userid/quizzes/:quizid (result for individual quiz)
- GET /quizzes/create (render create quiz page)

4. A

- POST /quizzes (create new quiz)
- POST /quizzes/:quizid (submits quiz when the user attempts it)

5. D

- POST /quizzes/:quizid/delete (delete quiz)
