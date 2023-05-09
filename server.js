const mysql = require('mysql2');
const inquirer = require('inquirer');
// const fs = require('fs');
const cTable = require('console.table');
const questions = require('./lib/questions');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


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
  prompt();
});

// Start command line questions
init(questions);