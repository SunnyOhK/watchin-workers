//* CREATE VARIABLES BASED ON WHAT RETURNS FROM SQL DB B/C NEW VALUES WILL BE ADDED FREQUENTLY

const { default: inquirer } = require("inquirer");

// EMPLOYEES:
const employees = await db.query('SELECT * FROM employee');
// MANAGERS:
const mgrChoices = employees
  .filter(employee => employee.manager_id === NULL)
  .map(employee => ({ first_name: employee.first_name, last_name: employee.last_name }));

// DEPARTMENTS:
const departments = await db.query('SELECT dept_name FROM department');
const deptChoices = departments.map(department => department.dept_name);

// ROLES:
const roles = await db.query('SELECT title FROM role');
const roleChoices = roles.map(role => role.title);


//* DEFINE ALL QUESTIONS SEPARATELY SO THAT EACH MAIN MENU OPTION WILL RENDER A SEPARATE SET OF QUESTIONS
//* LIST OF ALL EXISTING EMPLOYEES FOR UPDATE
const currentEmp = [
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
    name: 'updateWhat',
    message: 'What would you like to update for this employee?',
    choices: [
      'First Name',
      'Last Name',
      'Role',
      'Department',
      'Salary',
      'Manager',
      'Employment Status'
    ]
  },
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
  },
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
      console.table(...employees);
    case 'Add Employee':
      inquirer.prompt(addEmployee)
      break;
    case 'Update Employee Role':
      inquirer.prompt
    case 'View All Roles':

    case 'Add Roll':

    case 'View All Departments':

    case 'Add Department':

    case 'Quit':
  }
});


module.exports = questions;