const mysql = require('mysql2');
const { mainMenuQuery, addDeptQs, addEmployeeQs, addRoleQs, updateEmployeeQs } = require('./lib/questions');
const inquirer= require("inquirer")
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

//* ASYNC FUNCTIONS TO HANDLE SEQUENCE OF QUESTIONS AND RETURN:
const viewAllEmployees = () => {
  //view all our employees and then
  db.query("SELECT * FROM employee", (err,results)=>{
    if(err){
      throw err
    }
    console.table(results)
    init()
  })
}

const addEmployee = async() => {
  const roleChoices = getRoleChoices();
  const managerChoices = getManagerChoices();
  const answer = await inquirer.prompt(addEmployeeQs(roleChoices, managerChoices))

  // INSERT NEW EMPLOYEE INTO EMPLOYEE TABLE, THEN...
  viewAllEmployees();
}

const updateEmployee = async() => {
  const employeeChoices = getEmployeeChoices();
  const roleChoices = getRoleChoices();
  const managerChoices = getManagerChoices();
  const answer = await inquirer.prompt(updateEmployeeQs(employeeChoices, roleChoices, managerChoices));

  // UPDATE ROLE (AND THUS, DEPT, MGR) CHANGES IN THE EMPLOYEE TABLE, THEN...
  viewAllEmployees();
}

const viewAllRoles = async() => {
  db.query("Select * FROM role", (err, results) => {
    if (err) {
      throw err
    }
    console.table(results)
  init();
})
}

const addRole = async() => {
  const deptChoices = getDepartmentChoices();
  const answer = await inquirer.prompt(addRoleQs(deptChoices));

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

const addDepartment = async() => {
  const answer = await inquirer.prompt(addDeptQs);

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