const { default: inquirer } = require("inquirer");
const db = require('company_db');

//* CREATE VARIABLES BASED ON WHAT RETURNS FROM SQL DB B/C NEW VALUES WILL BE ADDED FREQUENTLY
// EMPLOYEES:
const employees = db.query('SELECT * FROM employee');
// MANAGERS:
const mgrChoices = employees
  .filter(employee => employee.manager_id === NULL)
  .map(employee => ({ first_name: employee.first_name, last_name: employee.last_name }));

// DEPARTMENTS:
const departments = db.query('SELECT dept_name FROM department');
const deptChoices = departments.map(department => department.dept_name);

// ROLES:
const roles = db.query('SELECT title FROM role');
const roleChoices = roles.map(role => role.title);


//* DEFINE ALL QUESTIONS SEPARATELY SO THAT EACH MAIN MENU OPTION WILL RENDER A SEPARATE SET OF QUESTIONS
//* SELECT EMPLOYEE AND CHOOSE NEW ROLE
const updateEmp = [
  {
    type: 'list',
    name: 'currentEmployees',
    message: 'Which current employee would you like to update?',
    choices: [
      ...employees
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

//* NEW EMPLOYEE SETUP
const addEmployee = [{
  type: 'input',
  name: 'empFirstName',
  message: 'What is the first name of the new employee?',
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
  type: 'input',
  name: 'empLastName',
  message: 'What is the last name of the new employee?',
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

inquirer.prompt(mainMenuQuery).then(async (answer) => {
  switch (answer.mainMenu) {
    case 'View All Employees':
      console.table(employees);
      break;
    case 'Add Employee':
      inquirer.prompt(addEmployee);
        console.log('New employee has been added to the database.');
      break;
    case 'Update Employee Role':
      inquirer.prompt(updateEmp);
        console.log('Employee has been updated.');
      break;
    case 'View All Roles':
      console.table(roles);
      break;
    case 'Add Roll':
      inquirer.prompt(addRole);
        console.log('New role has been added to the database.');
      break;
    case 'View All Departments':
      console.table(departments);
      break;
    case 'Add Department':
      inquirer.prompt(addDept);
        console.log('New department has been added to the database.');
      break;
    case 'Quit':
      console.log('Goodbye!');
      break;
  }
  if (answer.mainMenu !== 'Quit') {
    inquirer.prompt(mainMenuQuery);
  }
});


module.exports = questions;