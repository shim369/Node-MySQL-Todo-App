const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'todo_app'
});


/* GET home page. */
router.get('/', function(req, res, next) {
  connection.execute(
    `select * from tasks;`,
    (error, results) => {
      console.log(error);
      res.render('index', {
        title: 'Node Todo App',
        todos: results,
      });
    }
  );
});

router.post('/', function(req, res, next) {
  connection.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return
    }
    console.log('success');
  });
  const todo = req.body.add;
  connection.execute(
    `insert into tasks (user_id, content) values (1, '${todo}');`,
    (error, results) => {
      console.log(error);
      res.redirect('/');
    }
  );
});

module.exports = router;
