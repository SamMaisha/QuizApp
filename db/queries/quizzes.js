const db = require('../connection');

const getQuizzes = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getQuizzes };
