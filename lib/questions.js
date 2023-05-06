const questions = [
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
    ]
  },
  {
    type: 'input',
    name: 'empFirstName',
    message: 'What is the first name of the employee?',
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
    message: 'What is the last name of the employee?',
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
    name: 'empRole',
    message: 'What is the role of the employee?',
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
    name: 'empManager',
    message: 'Who is the manager for this employee?',
    choices: [
      '`${employeeFirstName}`',
      'Add Employee',
      'Quit'
    ]
  },
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
  },
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
      'Sales',
      'Marketing',
      'Finance',
      'Human Resources',
      'IT/ Engineering'
    ]
  },
];

module.exports = questions;