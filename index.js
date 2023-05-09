const mysql = require('mysql2');
const { mainMenuQuery, addDeptQs, addEmployeeQs, addRoleQs, updateEmpQs } = require('./lib/questions');
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

const viewAllEmployees = () => {
  //view all our employees and then
  db.query("Select * FROM employee", (err,results)=>{
    if(err){
      throw err
    }
    console.table(results)
    init()
  })
}

const addEmployee = async() => {
  const roleChoices = getRoleChoices()
  const managerChoices = getManagerChoices()
  const answer = await inquirer.prompt(addEmployeeQs(roleChoices, managerChoices))
  //after we insert the new employee,
  viewAllEmployees()
}

const init = async () => {
  var answer = await inquirer.prompt(mainMenuQuery)
  switch (answer.mainMenu) {
    case 'View All Employees':
      viewAllEmployees()
      break;
    case 'Add Employee':
      addEmployee()
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
}

// [value: id, name:]