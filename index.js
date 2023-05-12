const mysql = require('mysql2');
const { mainMenuQuery, addDeptQs, addEmployeeQs, addRoleQs, updateEmployeeQs } = require('./lib/questions');
const inquirer = require('inquirer');
const figlet = require('figlet');

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

figlet('Company CMS', function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
  init();
});

//* USE MYSQL JS QUERIES TO HANDLE SQL DATABASE RETURNS
const getEmployeeChoices = async () => {
  const [employeeRows, fields] = await db.promise().query("SELECT id, first_name, last_name FROM employee")
  return employeeRows.map((element) => {
    return { value: element.id, name: `${element.first_name} ${element.last_name}` }
  })
};

const getDeptChoices = async () => {
  const [departmentRows, fields] = await db.promise().query("SELECT * FROM department")
  return departmentRows.map(element => {
    return { value: element.id, name: element.dept_name }
  })
};

const getRoleChoices = async () => {
  const [roleRows, fields] = await db.promise().query("SELECT * FROM role")
  return roleRows.map(element => {
    return { value: element.id, name: element.title }
  })
}

const getManagerChoices = async () => {
  const [managerRows, fields] = await db.promise().query("SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL")
  return managerRows.map(element => {
    return { value: element.id, name: `${element.first_name} ${element.last_name}` }
  })
}

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
  try {
    const roleChoices = await getRoleChoices();
    const managerChoices = await getManagerChoices();
    const answers = await inquirer.prompt(addEmployeeQs(roleChoices, managerChoices));

    await db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.empFirstName}', '${answers.empLastName}', ${answers.empRole}, ${answers.empManager})`);
    console.log(`Successfully added ${answers.empFirstName} ${answers.empLastName} to the Company database.`)
    viewAllEmployees();

  } catch (error) {
    console.log(error)
  }
}

const updateEmployee = async () => {
  try {
    const employeeChoices = await getEmployeeChoices();
    const roleChoices = await getRoleChoices();
    const answers = await inquirer.prompt(updateEmployeeQs(employeeChoices, roleChoices));

    await db.promise().query(`UPDATE employee SET role_id = ${answers.updateRole} WHERE id = ${answers.updateEmployee}`);

    console.log(`Successfully updated role to ${answers.updateRole} for ${answers.empFirstName} ${answers.empLastName}  the Company database.`)
    viewAllEmployees();

  } catch (error) {
    console.log(error)
  }
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
  try {
    const departmentChoices = await getDeptChoices()
    const answers = await inquirer.prompt(addRoleQs(departmentChoices));
    await db.promise().query(`INSERT INTO role (title, salary, dept_id) VALUES ('${answers.roleName}', ${answers.roleSalary}, ${answers.deptAssign})`)
    console.log(`Successfully added ${answers.roleName} to the Company database.`)
    viewAllRoles()
  } catch (error) {
    console.log(error)
  }
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
    console.log(`Successfully added ${ deptName } to Departments.`);
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