const mysql = require('mysql2');
const { mainMenuQuery, addDeptQs, addEmployeeQs, addRoleQs, updateEmployeeQs } = require('./lib/questions');
const inquirer = require("inquirer")
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
  init();
});

//* USE MYSQL JS QUERIES TO HANDLE SQL DATABASE RETURNS
const getEmployeeChoices = () => {
  db.query("SELECT CONCAT(first_name, last_name) AS employees FROM employee"), (err, results) => {
    if (err) {
      throw err
    }
    return results;
  }
}

const getManagerChoices = () => {
  db.query(" "), (err, results) => {
    if (err) {
      throw err
    }
    return ____;
  }
}

const getRoleChoices = () => {
  db.query("SELECT title AS roles FROM role"), (err, results) => {
    if (err) {
      throw err
    }
    return results.map(result => result.title);
  }
}

const getDeptChoices = () => {
  const choices = db.query("SELECT dept_name FROM department", (err, results) => {
    if (err) {
      throw err
    } 
    console.log(choices)
    {
      results.map((department) => department.dept_name);
    };
  })
};


//* ASYNC FUNCTIONS TO HANDLE SEQUENCE OF QUESTIONS AND RETURN:
const viewAllEmployees = () => {
  db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.dept_name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.dept_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id", (err, results) => {
    if (err) {
      throw err
    }
    console.table(results)
    init()
  })
}

const addEmployee = async () => {
  const roleChoices = getRoleChoices();
  const managerChoices = getManagerChoices();
  const answer = await inquirer.prompt(addEmployeeQs(roleChoices, managerChoices))

  // INSERT NEW EMPLOYEE INTO EMPLOYEE TABLE, THEN...
  viewAllEmployees();
}

const updateEmployee = async () => {
  const employeeChoices = getEmployeeChoices();
  const roleChoices = getRoleChoices();
  const managerChoices = getManagerChoices();
  const answer = await inquirer.prompt(updateEmployeeQs(employeeChoices, roleChoices, managerChoices));

  // UPDATE ROLE (AND THUS, DEPT, MGR) CHANGES IN THE EMPLOYEE TABLE, THEN...
  viewAllEmployees();
}

const viewAllRoles = async () => {
  db.query("SELECT role.id, role.title, department.dept_name AS department, role.salary FROM role LEFT JOIN department ON role.dept_id = department.id", (err, results) => {
    if (err) {
      throw err
    }
    console.table(results)
    init();
  })
}

const addRole = async () => {
  const deptChoices = getDeptChoices();
  
  const answers = await inquirer.prompt(addRoleQs);

  const { roleName, roleSalary, deptAssign } = answers;

  db.query(`INSERT INTO role (title, salary, dept_id) VALUES ('${roleName}', '${roleSalary}', '${deptAssign},) WHERE dept_id = department.id`, (err, res) => {
    if (err) {
      throw err
    }
    console.log(`Successfully added ${roleName} to the Company database.`);
  });

  // INSERT NEW ROLE INTO ROLE TABLE, THEN...
  viewAllRoles();
}

const viewAllDepartments = async () => {
  db.query("Select * FROM department", (err, results) => {
    if (err) {
      throw err
    }
    console.table(results)
    init();
  })
}

const addDepartment = async () => {
  const answer = await inquirer.prompt(addDeptQs);
  const { deptName } = answer;
  // 'answer' returned in format `{ deptName: 'Maintenance' } so I need to target the VALUE and not the COLUMN`

  db.query(`INSERT INTO department (dept_name) VALUES ('${deptName}')`, (err, res) => {
    if (err) {
      throw err
    }
    console.log(`Successfully added ${answer} to Departments.`);
  })
  // INSERT NEW DEPARTMENT INTO DEPARTMENT TABLE, THEN...
  viewAllDepartments();
}

const init = async () => {
  var answer = await inquirer.prompt(mainMenuQuery)
  switch (answer.mainMenu) {
    case 'View All Employees':
      viewAllEmployees();
      break;
    case 'Add Employee':
      addEmployee();
      break;
    case 'Update Employee Role':
      updateEmployee();
      break;
    case 'View All Roles':
      viewAllRoles();
      break;
    case 'Add Role':
      addRole();
      break;
    case 'View All Departments':
      viewAllDepartments();
      break;
    case 'Add Department':
      addDepartment();
      break;
    case 'Quit':
      console.log('Goodbye!');
      db.end((err) => {
        if (err) throw err;
        process.exit(0);
      });
      break;
  };
}

// [value: id, name:]