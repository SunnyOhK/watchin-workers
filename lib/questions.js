// const { default: inquirer } = require("inquirer");
const inquirer = require('inquirer');
const db = require('company_db');

//* CREATE VARIABLES BASED ON WHAT RETURNS FROM SQL DB B/C NEW VALUES WILL BE ADDED FREQUENTLY
// EMPLOYEES:
const employees = db.query('SELECT * FROM employee');
const employeeChoices = employees.map(employee => ({ first_name: employee.first_name, last_name: employee.last_name }));

// MANAGERS:
const mgrChoices = employees
  .filter(employee => employee.manager_id === NULL)
  .map(employee => ({ first_name: employee.first_name, last_name: employee.last_name }));

// DEPARTMENTS:
const departments = db.query('SELECT * FROM department');
const deptChoices = departments.map(department => department.dept_name);

// ROLES:
const roles = db.query('SELECT * FROM role');
const roleChoices = roles.map(role => role.title);


//* DEFINE ALL QUESTIONS SEPARATELY SO THAT EACH MAIN MENU OPTION WILL RENDER A SEPARATE SET OF QUESTIONS
//* SELECT EMPLOYEE AND CHOOSE NEW ROLE
const updateEmp = [
  {
    type: 'list',
    name: 'updateEmployee',
    message: 'Which current employee would you like to update?',
    choices: [
      ...employeeChoices
    ]
  },
  {
    type: 'list',
    name: 'updateRole',
    message: 'Please select a new role.',
    choices: [
      ...roleChoices
    ]
  }
]

//* ADD NEW EMPLOYEE
const addEmployee = [{
  type: 'input',
  name: 'empFirstName',
  message: 'What is the first name of the new employee?',
  validate: function (answer) {
    if (!answer || answer.length > 30) {
      console.log('Response required. Character limit: 30.');
      return false;
    } else {
      return true;
    }
  }
},
{
  type: 'input',
  name: 'empLastName',
  message: 'What is the last name of the new employee?',
  validate: function (answer) {
    if (!answer || answer.length > 30) {
      console.log('Response required. Character limit: 30.');
      return false;
    } else {
      return true;
    }
  }
},
{
  type: 'list',
  name: 'empRole',
  message: 'What is the role of the new employee?',
  choices: [
    ...roleChoices
  ]
},
{
  type: 'list',
  name: 'empManager',
  message: 'Who is the manager for this employee?',
  choices: [
    ...mgrChoices
  ]
}
];

//* ADD NEW DEPARTMENT
const addDept = [
  {
    type: 'input',
    name: 'deptName',
    message: 'What is the name of the department?',
    validate: function (answer) {
      if (!answer) {
        console.log('Response required.');
        return false;
      } else {
        return true;
      }
    }
  }
];

//* ADD NEW ROLE WITH SALARY & ASSIGN TO DEPARTMENT
const addRole = [
  {
    type: 'input',
    name: 'roleName',
    message: 'What is the name of the role?',
    validate: function (answer) {
      if (!answer) {
        console.log('Response required.');
        return false;
      } else {
        return true;
      }
    }
  },
  {
    type: 'number',
    name: 'roleSalary',
    message: 'What is the salary of the role?',
    validate: function (answer) {
      if (!answer) {
        console.log('Response required.');
        return false;
      } else if (typeof input !== 'number') {
        return ('Input must be a number.');
      } else {
        return true;
      }
    }
  },
  {
    type: 'list',
    name: 'deptAssign',
    message: 'To which department does this role belong?',
    choices: [
      ...deptChoices
    ]
  }
];

//* MAIN MENU WILL PROMPT FIRST AND USER INPUT WILL DETERMINE WHICH PROMPTS SHOULD FOLLOW
const mainMenuQuery = [
  {
    type: 'list',
    name: 'mainMenu',
    message: 'What would you like to do?',
    choices: [
      'View All Employees',
      'Add Employee',
      'Update Employee Role',
      'View All Roles',
      'Add Roll',
      'View All Departments',
      'Add Department',
      'Quit'
    ],
  }];

const init = () => {
inquirer.prompt(mainMenuQuery)
.then((answer) => {
  switch (answer.mainMenu) {
    case 'View All Employees':
      console.table('Viewing All Current Employees', employees);
      break;

    case 'Add Employee':
      inquirer.prompt(addEmployee)
        .then((answers) => {
          console.log(`${answers.empFirstName} ${answers.empLastName} has been added to the database.`);
        });
      break;

    case 'Update Employee Role':
      inquirer.prompt(updateEmp)
        .then((answers) => {
          console.log(`Role for ${answers.updateEmployee} has been updated to ${answers.updateRole}.`);
        });
      break;

    case 'View All Roles':
      console.table('Viewing All Company Roles', roles);
      break;

    case 'Add Role':
      inquirer.prompt(addRole)
        .then((answers) => {
          console.log(`${answers.roleName} has been added to ${answers.deptAssign} in the database.`);
        });
      break;

    case 'View All Departments':
      console.table('Viewing All Company Departments', departments);
      break;

    case 'Add Department':
      inquirer.prompt(addDept)
        .then((answer) => {
          console.log(`${answer.deptName} has been added to the database.`);
        });
      break;

    case 'Quit':
      console.log('Goodbye!');
      db.end((err) => {
        if (err) throw err;
        process.exit(0);
      });
      break;
  };

  init();
});
}

module.exports = questions;