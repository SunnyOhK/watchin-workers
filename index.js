const mysql = require('mysql2');
const questions = require('./lib/questions');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username
    user: 'root',
    //Add MySQL password
    password: '',
    database: 'company_db'
  },
  console.log('You are now connected to the Company database.')
);

db.connect(err => {
  if (err) throw err;
  init(questions);
});

// Start command line questions
