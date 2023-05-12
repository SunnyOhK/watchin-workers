//* DEFINE ALL QUESTIONS SEPARATELY SO THAT EACH MAIN MENU OPTION WILL RENDER A SEPARATE SET OF QUESTIONS
//* SELECT EMPLOYEE AND CHOOSE NEW ROLE
const updateEmployeeQs = (employeeChoices, roleChoices) => [
  {
    type: 'list',
    name: 'updateEmployee',
    message: 'Which current employee would you like to update?',
    choices: employeeChoices
  },
  {
    type: 'list',
    name: 'updateRole',
    message: 'Please select a new role.',
    choices: roleChoices
  }
]

//* ADD NEW EMPLOYEE
const addEmployeeQs = (roleChoices, managerChoices) => [{
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
  choices: roleChoices
},
{
  type: 'list',
  name: 'empManager',
  message: 'Who is the manager for this employee?',
  choices: [
    'None',
    managerChoices
  ]
}
];

//* ADD NEW DEPARTMENT
const addDeptQs = [
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
const addRoleQs = (deptChoices) => [
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
      } else if (typeof answer !== 'number') {
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
    choices: deptChoices
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
      'Add Role',
      'View All Departments',
      'Add Department',
      'Quit'
    ],
  }];


module.exports = { mainMenuQuery, addDeptQs, addRoleQs, addEmployeeQs, updateEmployeeQs };